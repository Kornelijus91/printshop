const path = require('path');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const Product = require("./models/products");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fs = require("fs");

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

const app = express();

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

app.use('/euploads', express.static('private/uploads'))

app.get('/', (req, res, next) => {
    const indexPath  = path.resolve(__dirname, '../client/build', 'index.html')
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        Product.find({}, 'name', function (err, product) {
            if (!err && product.length > 0) {
                var keywords = [process.env.PROJECTTITLE];
                for (const item of product) {
                    keywords.push(item.name);
                }
                data = data.replace(
                    "<title>__TITLE__</title>",
                    `<title>${process.env.PROJECTTITLE}</title>`
                )
                .replace(/__META_OG_TITLE__/, `${process.env.PROJECTTITLE}`)
                .replace(/__META_OG_DESCRIPTION__/, `${process.env.PROJECTDESC}`)
                .replace(/__META_DESCRIPTION__/, `${process.env.PROJECTDESC}`)
                .replace(/__META_OG_IMAGE__/, `${process.env.PROJECTIMAGE}`)
                .replace(/__META_KEYWORDS__/, `${keywords.join(", ")}`)
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
            } else {
                res.send(data);
            }
        });
    });
});

app.get('/products', (req, res, next) => {
    const indexPath  = path.resolve(__dirname, '../client/build', 'index.html')
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        Product.find({}, 'name', function (err, product) {
            if (!err && product.length > 0) {
                var keywords = [process.env.PROJECTTITLE];
                for (const item of product) {
                    keywords.push(item.name);
                }
                data = data.replace(
                    "<title>__TITLE__</title>",
                    `<title>Produktai | ${process.env.PROJECTTITLE}</title>`
                )
                .replace(/__META_OG_TITLE__/, `Produktai | ${process.env.PROJECTTITLE}`)
                .replace(/__META_OG_DESCRIPTION__/, `${process.env.PROJECTDESC}`)
                .replace(/__META_DESCRIPTION__/, `${process.env.PROJECTDESC}`)
                .replace(/__META_OG_IMAGE__/, `${process.env.PROJECTIMAGE}`)
                .replace(/__META_KEYWORDS__/, `${keywords.join(", ")}`)
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
            } else {
                res.send(data);
            }
        });
    });
});

app.get('/products/*', (req, res, next) => {
    const indexPath  = path.resolve(__dirname, '../client/build', 'index.html')
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        Product.find({ name: req.params[0]}, 'name description image', function (err, product) {
            if (!err && product.length > 0) {
                data = data.replace(
                    "<title>__TITLE__</title>",
                    `<title>${product[0].name} | ${process.env.PROJECTTITLE}</title>`
                )
                .replace(/__META_OG_TITLE__/, `${product[0].name} | ${process.env.PROJECTTITLE}`)
                .replace(/__META_OG_DESCRIPTION__/, product[0].description)
                .replace(/__META_DESCRIPTION__/, product[0].description)
                .replace(/__META_OG_IMAGE__/, product[0].image)
                .replace(/__META_KEYWORDS__/, `${process.env.PROJECTTITLE}, ${product[0].name}`)
                .replace(/__META_URL__/, process.env.MAIN_URL)
                .replace(
                    '<script type="application/ld+json">__JSON_META_TAGS__</script>',
                    `<script type="application/ld+json">
                    {
                      "@context": "https://schema.org/",
                      "@type": "Product",
                      "name": "${product[0].name}",
                      "image": [
                        "${product[0].image}" 
                       ],
                      "description": "${product[0].description}",
                    }
                    </script>`
                )
                res.send(data);
            } else {
                res.send(data);
            }
        });
    });
});

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(path.resolve(__dirname, '../admin/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});