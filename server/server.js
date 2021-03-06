const path = require('path');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const passport = require('passport');
const Product = require("./models/products");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fs = require("fs");
var cron = require('node-cron');
const CartItem = require("./models/cartItem")
const Order = require("./models/order")
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const { Readable } = require('stream')

let sitemap 
let sitemapAge = new Date();

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
require("./utils/databaseConnect")

require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./strategies/GoogleStrategy")
require("./strategies/FacebookStrategy")
require("./strategies/LinkedInStrategy")
require("./authenticate")
const userRouter = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRoutes")
const socketEvents = require("./routes/socketEvents");
const socketAdminEvents = require("./routes/socketAdminEvents");

const PORT = process.env.PORT || 3000;

process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----')
    console.log(error)
    console.log('----- Exception origin -----')
    console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----')
    console.log(promise)
    console.log('----- Reason -----')
    console.log(reason)
})



// ====== SOCKET ====== //

// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.MAIN_URL,
        methods: ["GET", "POST"]
    },
    // transports: ["websocket"]
});

// ==================== //

const onConnection = (socket) => {
    socketEvents(io, socket);
};

const onAdminConnection = (socket) => {
    socketAdminEvents(io, socket);
};

const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        return false;
    }
    return compression.filter(req, res);
};

app.io = io;
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.use(compression({
    filter: shouldCompress,
    threshold: 0
}));

const corsOptions = {
    origin: process.env.WHITELISTED_DOMAINS,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use("/users", userRouter)
app.use("/administracija", adminRouter)

app.get('/personalas', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../admin/build', 'index.html'));
});

// app.use('/euploads', express.static('private/uploads'));
// app.use('/uploads', express.static('public/uploads'));
app.use('/saskaitos', express.static('saskaitos'));

cron.schedule('0 0 4 * * *', async () => {
    var expiryDate = new Date();
    var pastDate = expiryDate.getDate() - 14;
    expiryDate.setDate(pastDate);
    const cartItems = await CartItem.find({ modifiedAt: { $lte: expiryDate } }).exec();
    for (const citm of cartItems) {
        try{
            Order.find({'cartItems._id': citm._id }, async function (err, orders){
                if (!err) {
                    if (orders.length > 0){
                        for (const oitm of orders) {
                            if (oitm.status === 'Apmok??tas') {
                                break;
                            }
                            const cartItemsNotExpired = await CartItem.find({ modifiedAt: { $gte: expiryDate }, image: citm.image }).exec();
                            try {
                                if (cartItemsNotExpired.length <= 0 && oitm.status !== 'Apmok??tas' && fs.existsSync(`./public/uploads/${citm.image.substring(citm.image.lastIndexOf('/') + 1)}`)) {
                                    fs.unlink(`./public/uploads/${citm.image.substring(citm.image.lastIndexOf('/') + 1)}`, (err) => {
                                        if (!err) {
                                            return true;
                                        } 
                                    })
                                    if (fs.existsSync(`./saskaitos/${oitm.isankstineSaskaita.substring(oitm.isankstineSaskaita.lastIndexOf('/') + 1)}`)) {
                                        fs.unlink(`./saskaitos/${oitm.isankstineSaskaita.substring(oitm.isankstineSaskaita.lastIndexOf('/') + 1)}`, (err) => {
                                            if (!err) {
                                                return true;
                                            } 
                                        })
                                    }
                                    if (fs.existsSync(`./saskaitos/${oitm.PVMSaskaitaFaktura.substring(oitm.PVMSaskaitaFaktura.lastIndexOf('/') + 1)}`)) {
                                        fs.unlink(`./saskaitos/${oitm.PVMSaskaitaFaktura.substring(oitm.PVMSaskaitaFaktura.lastIndexOf('/') + 1)}`, (err) => {
                                            if (!err) {
                                                return true;
                                            } 
                                        })
                                    }
                                }
                            } catch (error) {
                                console.log(error);
                            }

                            if (oitm.status !== '??vykdytas' && oitm.status !== 'Apmok??tas' && oitm.status !== 'At??auktas') {
                                oitm.status = 'At??auktas';
                            }

                            Order.updateMany({'cartItems._id': citm._id, 'cartItems.projectId': ''}, {'$set': {
                                'cartItems.$.image': '',
                            }}).exec();
                            citm.deleteOne();
                            oitm.save();
                        }
                    } else {
                        const cartItemsNotExpired = await CartItem.find({ modifiedAt: { $gte: expiryDate }, image: citm.image }).exec();
                        try {
                            if (cartItemsNotExpired.length <= 0 && fs.existsSync(`./public/uploads/${citm.image.substring(citm.image.lastIndexOf('/') + 1)}`)) {
                                fs.unlink(`./public/uploads/${citm.image.substring(citm.image.lastIndexOf('/') + 1)}`, (err) => {
                                    if (!err) {
                                        return true;
                                    } 
                                })
                            }
                        } catch (error) {
                            console.log(error);
                        }
                        citm.deleteOne();
                    }
                } else {
                    console.log(err);
                }
            });
            
        } catch (error) {
          console.log(error);
        };
        
    }
}, {
    scheduled: true,
    timezone: "Europe/Vilnius"
});

var keywords = '';
var prodinfo = [];

Product.find({}, 'name description image', function (err, product) {
    if (!err && product.length > 0) {

        var tempkeywords = [process.env.PROJECTTITLE];
        var tempprodArray = [];
        for (const item of product) {
            tempkeywords.push(item.name);
            tempprodArray.push({
                name: item.name,
                description: item.description,
                image: item.image,
            });
        }
        keywords = tempkeywords.join(", ");
        prodinfo = tempprodArray;
    }
});
    
cron.schedule('0 0 */2 * * *', async () => {
    Product.find({}, 'name description image', function (err, product) {
        if (!err && product.length > 0) {
            var tempkeywords2 = [process.env.PROJECTTITLE];
            var tempprodArray2 = [];
            for (const item of product) {
                tempkeywords2.push(item.name);
                tempprodArray2.push({
                    name: item.name,
                    description: item.description,
                    image: item.image,
                });
            }
            keywords = tempkeywords2.join(", ");
            prodinfo = tempprodArray2;
        }
    });
}, {
    scheduled: true,
    timezone: "Europe/Vilnius"
});      

app.get('/', (req, res, next) => {
    const indexPath  = path.resolve(__dirname, '../client/build', 'index.html')
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        data = data.replace(
            "<title>__TITLE__</title>",
            `<title>${process.env.PROJECTTITLE}</title>`
        )
        .replace(/__META_OG_TITLE__/, `${process.env.PROJECTTITLE}`)
        // .replace(/__META_OG_DESCRIPTION__/, `${process.env.PROJECTDESC}`)
        .replace(/__META_OG_DESCRIPTION__/, 'Elektronin?? spaustuv?? J??s?? namuose. Pristatymas visoje Lietuvoje per 24h. Greita, pigu, patogu. Ma???? ir vidutini?? tira???? spaustuv??. Nemokamai sukurk savo ar ??kelkite fail?? ir spausdinkite!')
        // .replace(/__META_DESCRIPTION__/, `${process.env.PROJECTDESC}`)
        .replace(/__META_DESCRIPTION__/, 'Elektronin?? spaustuv?? J??s?? namuose. Pristatymas visoje Lietuvoje per 24h. Greita, pigu, patogu. Ma???? ir vidutini?? tira???? spaustuv??. Nemokamai sukurk savo ar ??kelkite fail?? ir spausdinkite!')
        // .replace(/__META_OG_IMAGE__/, `https://s3.amazonaws.com/unroll-images-production/projects%2F0%2F1639660549207-TreklamaOGIMAGE.png`)
        .replace(/__META_OG_IMAGE__/, `${process.env.PROJECTIMAGE}`)
        .replace(/__META_KEYWORDS__/, `${keywords}`)
        .replace(/__META_URL__/, process.env.MAIN_URL)
        .replace(
            '<script type="application/ld+json">__JSON_META_TAGS__</script>',
            `<script type="application/ld+json">
            {         
                "@context": "https://schema.org/",         
                "@type": "WebSite",         
                "@id": "#WebSite",         
                "url": "${process.env.MAIN_URL}",          
                "name": "${process.env.PROJECTTITLE}"
            } 
            </script>`
        )
        res.send(data);
    });
});

app.get('/products', (req, res, next) => {
    const indexPath  = path.resolve(__dirname, '../client/build', 'index.html')
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        data = data.replace(
            "<title>__TITLE__</title>",
            `<title>Produktai | ${process.env.PROJECTTITLE}</title>`
        )
        .replace(/__META_OG_TITLE__/, `Produktai | ${process.env.PROJECTTITLE}`)
        // .replace(/__META_OG_DESCRIPTION__/, `${process.env.PROJECTDESC}`)
        // .replace(/__META_DESCRIPTION__/, `${process.env.PROJECTDESC}`)
        .replace(/__META_OG_DESCRIPTION__/, 'Elektronin?? spaustuv?? J??s?? namuose. Pristatymas visoje Lietuvoje per 24h. Greita, pigu, patogu. Ma???? ir vidutini?? tira???? spaustuv??. Nemokamai sukurk savo ar ??kelkite fail?? ir spausdinkite!')
        .replace(/__META_DESCRIPTION__/, 'Elektronin?? spaustuv?? J??s?? namuose. Pristatymas visoje Lietuvoje per 24h. Greita, pigu, patogu. Ma???? ir vidutini?? tira???? spaustuv??. Nemokamai sukurk savo ar ??kelkite fail?? ir spausdinkite!')
        .replace(/__META_OG_IMAGE__/, `${process.env.PROJECTIMAGE}`)
        // .replace(/__META_OG_IMAGE__/, `https://s3.amazonaws.com/unroll-images-production/projects%2F0%2F1639660549207-TreklamaOGIMAGE.png`) //https://s3.amazonaws.com/unroll-images-production/projects%2F0%2F1639660549207-TreklamaOGIMAGE.png
        .replace(/__META_KEYWORDS__/, `${keywords}`)
        .replace(/__META_URL__/, process.env.MAIN_URL)
        .replace(
            '<script type="application/ld+json">__JSON_META_TAGS__</script>',
            `<script type="application/ld+json">
            {         
                "@context": "https://schema.org/",         
                "@type": "WebSite",         
                "@id": "#WebSite",         
                "url": "${process.env.MAIN_URL}",          
                "name": "${process.env.PROJECTTITLE}"
            } 
            </script>`
        )
        res.send(data);
    });
});

app.get('/products/:productName', (req, res, next) => {
    const indexPath  = path.resolve(__dirname, '../client/build', 'index.html')
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        const pos = prodinfo.map(function(e) { return e.name; }).indexOf(req.params.productName);
        
        data = data.replace(
            "<title>__TITLE__</title>",
            `<title>${prodinfo[pos].name} | ${process.env.PROJECTTITLE}</title>`
        )
        .replace(/__META_OG_TITLE__/, `${prodinfo[pos].name} | ${process.env.PROJECTTITLE}`)
        .replace(/__META_OG_DESCRIPTION__/, prodinfo[pos].description)
        .replace(/__META_DESCRIPTION__/, prodinfo[pos].description)
        .replace(/__META_OG_IMAGE__/, prodinfo[pos].image)
        .replace(/__META_KEYWORDS__/, `${process.env.PROJECTTITLE}, ${prodinfo[pos].name}`)
        .replace(/__META_URL__/, process.env.MAIN_URL)
        .replace(
            '<script type="application/ld+json">__JSON_META_TAGS__</script>',
            `<script type="application/ld+json">
            {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "${prodinfo[pos].name}",
                "image": [
                "${prodinfo[pos].image}" 
                ],
                "description": "${prodinfo[pos].description}",
            }
            </script>`
        )
        res.send(data);
    });
});

app.get('/products/:productName/*', (req, res, next) => {
    const indexPath  = path.resolve(__dirname, '../client/build', 'index.html')
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        const pos = prodinfo.map(function(e) { return e.name; }).indexOf(req.params.productName);
        
        data = data.replace(
            "<title>__TITLE__</title>",
            `<title>${prodinfo[pos].name} | ${process.env.PROJECTTITLE}</title>`
        )
        .replace(/__META_OG_TITLE__/, `${prodinfo[pos].name} | ${process.env.PROJECTTITLE}`)
        .replace(/__META_OG_DESCRIPTION__/, prodinfo[pos].description)
        .replace(/__META_DESCRIPTION__/, prodinfo[pos].description)
        .replace(/__META_OG_IMAGE__/, prodinfo[pos].image)
        .replace(/__META_KEYWORDS__/, `${process.env.PROJECTTITLE}, ${prodinfo[pos].name}`)
        .replace(/__META_URL__/, process.env.MAIN_URL)
        .replace(
            '<script type="application/ld+json">__JSON_META_TAGS__</script>',
            `<script type="application/ld+json">
            {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "${prodinfo[pos].name}",
                "image": [
                "${prodinfo[pos].image}" 
                ],
                "description": "${prodinfo[pos].description}",
            }
            </script>`
        )
        res.send(data);
    });
});

app.get('/sitemap.xml', function(req, res) {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    // if we have a cached entry send it
    if (sitemap && sitemapAge < new Date().getTime() + (24 * 60 * 60 * 1000)) {
        res.send(sitemap)
        return
    }
    sitemapAge = new Date();

    try {
        const smStream = new SitemapStream({ hostname: process.env.MAIN_URL })
        const pipeline = smStream.pipe(createGzip())

        smStream.write({ 
            url: process.env.MAIN_URL,  
            changefreq: 'weekly', 
            priority: 1,
            img: {
                url: process.env.PROJECTIMAGE,
                title: process.env.PROJECTTITLE,
                caption: 'Elektronin?? spaustuv?? J??s?? namuose. Pristatymas visoje Lietuvoje per 24h. Greita, pigu, patogu. Ma???? ir vidutini?? tira???? spaustuv??. Nemokamai sukurk savo ar ??kelkite fail?? ir spausdinkite!',
            } 
        })

        smStream.write({ 
            url: `${process.env.MAIN_URL}/products`,
            changefreq: 'weekly', 
            priority: 0.8,
            img: {
                url: process.env.PROJECTIMAGE,
                title: process.env.PROJECTTITLE,
                caption: 'Elektronin?? spaustuv?? J??s?? namuose. Pristatymas visoje Lietuvoje per 24h. Greita, pigu, patogu. Ma???? ir vidutini?? tira???? spaustuv??. Nemokamai sukurk savo ar ??kelkite fail?? ir spausdinkite!',
            } 
        })

        for (const product of prodinfo) {
            // console.log(product);
            smStream.write({ 
                url: `${process.env.MAIN_URL}/products/${encodeURIComponent(product.name)}`,  
                changefreq: 'weekly', 
                priority: 0.9,
                img: {
                    url: product.image,
                    title: product.name,
                    caption: product.description,
                } 
            })
        }

        streamToPromise(pipeline).then(sm => sitemap = sm)
        smStream.end()
        pipeline.pipe(res).on('error', (e) => {throw e})
    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
})

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(path.resolve(__dirname, '../admin/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

io.of("/").on('connection', onConnection);
io.of("/valdovas").on('connection', onAdminConnection);

httpServer.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening on ${PORT}`);
});