const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require("path");
const User = require("../models/user")
const Address = require("../models/address")
const Product = require("../models/products")
const Carousel = require("../models/carousel")
const Template = require("../models/emailtemplate")
const Loyalty = require("../models/loyalty")
const Code = require("../models/code")
const Order = require("../models/order")
const Comment = require("../models/comment")
const Settings = require("../models/settings")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const resetPwdHash = require("jwt-simple")
const nodemailer = require('nodemailer');
const fs = require('fs')
var _ = require('lodash');
var moment = require('moment');

const { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } = require("../authenticate")

const ADMIN_UPLOADS = './euploads/';

const roundTwoDec = (num) => { 
    const result = Math.round(Number((Math.abs(num) * 100).toPrecision(15))) / 100 * Math.sign(num);
    return result;
  };

const storage = multer.diskStorage({
    destination: "./private/uploads/",
    filename: function(req, file, cb){
        cb(null,"IMAGE-" + Date.now() + `-${file.originalname.replace(/\\|\//g,'')}`);
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    onError : function(err, next) {
        console.log('MULTER ERROR => ', err);
        next(err);
    }
})  //.single("myImage");

const sendConfirmEmail = (email) => {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
    //   secure: true, 
    //   secureConnection: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls:{
        // rejectUnauthorized: false,
        // ciphers:'SSLv3',
        // secureProtocol: "TLSv1_method"
      },
    });
    const message = {
      from: process.env.EMAIL_FROM,
      to: `${email}`,
      subject: "Užsakymas įvykdytas.",
      html: ConfirmEmail(),
    };
    transporter.sendMail(message);
  };

  router.post("/saveSettings", verifyUser, async (req, res, next) => {
    if (req.user.administracija) {
        try {
            const settings = await Settings.findOne({}).exec();
            if (settings) {
                settings.maketavimoKaina = req.body.maketavimoKaina;
                settings.save(function (err) {
                    if (err) {
                        return;
                    } else {
                        res.send({ 
                            success: true, 
                            error: ''
                        })
                    }
                });
            } else {
                const newSettings = new Settings({ maketavimoKaina: req.body.maketavimoKaina });
                newSettings.save(function (err) {
                    if (err) {
                        return;
                    } else {
                        res.send({ 
                            success: true, 
                            error: ''
                        })
                    }
                });
            }
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

router.post("/markOrderDone", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Order.findByIdAndUpdate(req.body.id, { status: 'Įvykdytas' }, function (err, result) {
                if (!err) {
                    sendConfirmEmail(result.delivery.email);
                    res.send({ 
                        success: true, 
                        error: '',
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
});

router.post("/makeNotNew", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Order.findByIdAndUpdate(req.body.id, { new: false }, function (err, result) {
                if (!err) {
                    res.send({ 
                        success: true, 
                        error: '',
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
});

router.post("/getUserOrders", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Order.paginate({clientID: req.body.userId}, {
                page: req.body.page,
                limit: 7,
                sort: { createdAt: -1 },
            }, function (err, result) {
                if (!err) {
                    res.send({ 
                        success: true, 
                        items: result.docs,
                        totalItems: result.totalDocs,
                        itemLimit: result.limit,
                        currentPage: result.page,
                        totalPages: result.totalPages,
                        hasNextPage: result.hasNextPage,
                        nextPage: result.nextPage,
                        hasPrevPage: result.hasPrevPage,
                        prevPage: result.prevPage,
                        pagingCounter: result.pagingCounter,
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
              });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
});

router.post("/getOrders", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            const newCount = await Order.countDocuments({ new: true });
            Order.paginate(
                req.body.filter === 'Apmokėti' ? 
                    {status: 'Apmokėtas'} 
                : req.body.filter === 'Įvykdyti' ?
                    {status: 'Įvykdytas'}
                : req.body.filter === 'Pateikti' ?
                    {status: 'Pateiktas'}
                : req.body.filter === 'Atšaukti' ?
                    {status: 'Atšauktas'}
                : req.body.filter === 'Visi' &&
                    {}
                ,
            {
                page: req.body.page,
                limit: 10,
                sort: { createdAt: -1 },
            }, function (err, result) {
                if (!err) {
                    res.send({ 
                        success: true, 
                        items: result.docs,
                        totalItems: result.totalDocs,
                        itemLimit: result.limit,
                        currentPage: result.page,
                        totalPages: result.totalPages,
                        hasNextPage: result.hasNextPage,
                        nextPage: result.nextPage,
                        hasPrevPage: result.hasPrevPage,
                        prevPage: result.prevPage,
                        pagingCounter: result.pagingCounter,
                        newOrders: newCount
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
              });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
});

router.post("/getProducts", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Product.paginate({}, {
                page: req.body.page,
                limit: 12,
                sort: { createdAt: -1 },
            }, function (err, result) {
                if (!err) {
                    res.send({ 
                        success: true, 
                        items: result.docs,
                        totalItems: result.totalDocs,
                        itemLimit: result.limit,
                        currentPage: result.page,
                        totalPages: result.totalPages,
                        hasNextPage: result.hasNextPage,
                        nextPage: result.nextPage,
                        hasPrevPage: result.hasPrevPage,
                        prevPage: result.prevPage,
                        pagingCounter: result.pagingCounter
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
              });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
});

router.get("/getProductsIDs", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Product.find({}, 'name link', function (err, docs) {
                if (!err) {
                    res.send({ 
                        success: true, 
                        error: '',
                        data: docs
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
})

router.post("/homepageproduct", verifyUser, async (req, res, next) => {
    if (req.user.administracija) {
        try {
            Product.findById(req.body.productID, async function (err, product) {
                if (!err) {
                    if (product.homepage) {
                        product.homepage = false;
                        product.save(function (err) {
                            if (err) {
                                res.send({ 
                                    success: false, 
                                    error: err
                                })
                            } else {
                                res.send({ 
                                    success: true, 
                                    error: '',
                                    message: `${product.name} išimtas iš pagrindinio puslapio.`
                                })
                            }
                        });
                    } else {
                        Product.countDocuments({homepage: true}, function(err, c) {
                            if (!err){
                                if (c >= 6) {
                                    res.send({ 
                                        success: false, 
                                        error: 'Maks. 6 produktai pagrindiniame puslapyje.'
                                    })
                                } else {
                                    product.homepage = true;
                                    product.save(function (err) {
                                        if (err) {
                                            res.send({ 
                                                success: false, 
                                                error: err
                                            })
                                        } else {
                                            res.send({ 
                                                success: true, 
                                                error: '',
                                                message: `${product.name} pridėtas prie pagrindinio puslapio.`
                                            })
                                        }
                                    });
                                }
                            } else {
                                res.send({ 
                                    success: false, 
                                    error: err
                                })
                            }
                        });
                    } 
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administracijos narys.'
        })
    }
})

router.post("/deleteProduct",  verifyUser, async (req, res, next) => {
    if (req.user.administracija) {
        try {
            Product.findById(req.body.productID, function (err, product) {
                if (!err) {
                    try{
                        if (fs.existsSync(`./private/uploads/${product.image.substring(product.image.lastIndexOf('/') + 1)}`)) {   
                            fs.unlink(`./private/uploads/${product.image.substring(product.image.lastIndexOf('/') + 1)}`, (err) => {
                                if (err) {
                                    res.send({ 
                                        success: false, 
                                        error: err
                                    })
                                } else {
                                    for (const item of product.options) {
                                        for (const menuitem of item.menuOptions) {
                                            if (menuitem.fileURL) {
                                                try{
                                                    if (fs.existsSync(`./private/uploads/${menuitem.fileURL.substring(menuitem.fileURL.lastIndexOf('/') + 1)}`)) {
                                                        fs.unlink(`./private/uploads/${menuitem.fileURL.substring(menuitem.fileURL.lastIndexOf('/') + 1)}`, (err) => {
                                                            if (err) {
                                                                console.log(err);
                                                                res.send({ 
                                                                    success: false, 
                                                                    error: err
                                                                })
                                                            }
                                                        })
                                                    }
                                                } catch (err) {
                                                    console.log(err);
                                                    res.send({ 
                                                        success: false, 
                                                        error: err
                                                    })
                                                    return
                                                }
                                            } 
                                        }
                                    }
                                }
                            })
                        } 
                        try {
                            Comment.deleteMany({productName: product.name}).exec();
                            // product.remove(function (err) {
                            //     if (err) {
                            //         res.send({ 
                            //             success: false, 
                            //             error: "Klaida! Pabandykite vėliau ."
                            //         })
                            //     } else {
                            //         res.send({ 
                            //             success: true, 
                            //             error: ""
                            //         })
                            //     }
                            // });
                            Product.deleteOne({ _id: req.body.productID }, function (err) {
                                if (err) {
                                    res.send({ 
                                        success: false, 
                                        error: err
                                    })
                                } else {
                                    
                                    res.send({ 
                                        success: true, 
                                        error: ''
                                    })
                                }
                            });
                        }  catch (error) {
                            res.send({ 
                                success: false, 
                                error: error
                            })
                            return
                        }
                    } catch (err) {
                        res.send({ 
                            success: false, 
                            error: err
                        })
                        return
                    }
                } else {
                    console.log(err);
                }
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
            return
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

router.post("/createUpdateCarouselItem", verifyUser, upload.single("image"), (req, res, next) => {
    if (req.user.administracija) {
        if (req.body.carouselItemId) {
            try {
                Carousel.findById(req.body.carouselItemId, function (err, carousel) {
                    if (!err) {
                        // const url = req.protocol + '://' + req.get('host');
                        const url = process.env.MAIN_URL;
                        var mainImageX = '';
                        if (carousel.imageURL.substring(carousel.imageURL.lastIndexOf('/') + 1) === req.body.imageURL.substring(req.body.imageURL.lastIndexOf('/') + 1)) {
                            mainImageX = url + '/euploads/' + carousel.imageURL.substring(carousel.imageURL.lastIndexOf('/') + 1);
                        } else {
                            try{
                                if (fs.existsSync(`./private/uploads/${carousel.imageURL.substring(carousel.imageURL.lastIndexOf('/') + 1)}`)) {
                                    fs.unlink(`./private/uploads/${carousel.imageURL.substring(carousel.imageURL.lastIndexOf('/') + 1)}`, (err) => {
                                        if (err) {
                                            res.send({ 
                                                success: false, 
                                                error: err
                                            })
                                        }
                                    });
                                }
                            } catch (err) {
                                res.send({ 
                                    success: false, 
                                    error: err
                                })
                                return
                            }
                            mainImageX = url + '/euploads/' + req.file.filename;
                        }

                        carousel.title = req.body.title;
                        carousel.bluetext = req.body.bluetext;
                        carousel.redtext = req.body.redtext;
                        carousel.productLink = req.body.productLink;
                        carousel.borderRadius = req.body.borderRadius;
                        carousel.size = req.body.size;
                        carousel.animation = req.body.animation;
                        carousel.imageURL = mainImageX;
                        carousel.position = req.body.position;
                        console.log(req.file);
                        carousel.save(function (err) {
                            if (err) {
                                res.send({ 
                                    success: false, 
                                    error: err
                                })
                            } else {
                                res.send({ 
                                    success: true, 
                                    error: '',
                                    message: 'Karuselės elementas atnaujintas.'
                                })
                            }
                        });
                    } else {
                        res.send({ 
                            success: false, 
                            error: error
                        })
                    }
                });
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: error
                })
            }
        } else {
            const url = process.env.MAIN_URL;
            try {
                var carouselObj = {
                    title: req.body.title,
                    bluetext: req.body.bluetext,
                    redtext: req.body.redtext,
                    productLink: req.body.productLink,
                    borderRadius: req.body.borderRadius,
                    size: req.body.size,
                    animation: req.body.animation,
                    position: req.body.position,
                    imageURL: url + '/euploads/' + req.file.filename,
                }
                const newCarousel = new Carousel(carouselObj);
                newCarousel.save(function (err) {
                    if (err) {
                        res.send({ 
                            success: false, 
                            error: 'error'
                        })
                    } else {
                        res.send({ 
                            success: true, 
                            error: '',
                            message: 'Karuselės elementas pridėtas.'
                        })
                    }
                });
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: 'error'
                })
            }
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

router.get("/getCarouselItems", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Carousel.find({}).sort({position: 1}).exec(function(err, docs) {
                if (!err) {
                    res.send({ 
                        success: true, 
                        error: '',
                        data: docs
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
});

router.post("/positionCarouselItems", verifyUser, async (req, res, next) => {
    if (req.user.administracija) {
        try {
            for (const item of req.body.data) {
                Carousel.findById(item.id, function (err, carousel) {
                    if (!err) {
                        carousel.position = item.position
                        carousel.save();
                    } else {
                        res.send({ 
                            success: false, 
                            error: err
                        })
                    }
                });
            }
            res.send({ 
                success: true, 
                error: ''
            })
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Tik administratorius gali keisti karuselės elementų poziciją.'
        })
    }
});

router.post("/deleteCarouselItem",  verifyUser, async (req, res, next) => {
    if (req.user.administracija) {
        try {
            Carousel.findById(req.body.carouselID, function (err, carousel) {
                if (!err) {
                    try{
                        if (fs.existsSync(`./private/uploads/${carousel.imageURL.substring(carousel.imageURL.lastIndexOf('/') + 1)}`)) {   
                            fs.unlink(`./private/uploads/${carousel.imageURL.substring(carousel.imageURL.lastIndexOf('/') + 1)}`, (err) => {
                                if (err) {
                                    res.send({ 
                                        success: false, 
                                        error: err
                                    })
                                    return
                                } 
                            })
                        } 
                        try {
                            Carousel.deleteOne({ _id: req.body.carouselID }, function (err) {
                                if (err) {
                                    res.send({ 
                                        success: false, 
                                        error: err
                                    })
                                    return
                                } else {
                                    res.send({ 
                                        success: true, 
                                        error: ''
                                    })
                                }
                            });
                        }  catch (error) {
                            res.send({ 
                                success: false, 
                                error: error
                            })
                            return
                        }
                    } catch (err) {
                        res.send({ 
                            success: false, 
                            error: err
                        })
                        return
                    }
                } 
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
            return
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

router.post("/createProduct", verifyUser, upload.array("images"), (req, res, next) => {
    if (req.user.administracija) {
        if (!req.body.id) {
            const url = process.env.MAIN_URL;
            const variantoptions = JSON.parse(req.body.options);
            let optionsConstructor = []

            for (const item of variantoptions) {

                let optionsConstructorItem = {}
                optionsConstructorItem.type = item.type;
                optionsConstructorItem.name = item.name;
                optionsConstructorItem.info = item.info;
                optionsConstructorItem.firstItemName = item.firstItemName;
                optionsConstructorItem.secondItemName = item.secondItemName;
                optionsConstructorItem.fistItemMinValue = Math.round(Number((Math.abs(item.fistItemMinValue) * 100).toPrecision(15))) / 100 * Math.sign(item.fistItemMinValue); 
                optionsConstructorItem.firstItemMaxValue = Math.round(Number((Math.abs(item.firstItemMaxValue) * 100).toPrecision(15))) / 100 * Math.sign(item.firstItemMaxValue); 
                optionsConstructorItem.secondItemMinValue = Math.round(Number((Math.abs(item.secondItemMinValue) * 100).toPrecision(15))) / 100 * Math.sign(item.secondItemMinValue); 
                optionsConstructorItem.secondItemMaxValue = Math.round(Number((Math.abs(item.secondItemMaxValue) * 100).toPrecision(15))) / 100 * Math.sign(item.secondItemMaxValue); 
                optionsConstructorItem.fiststItemUnit = Math.round(Number((Math.abs(item.fiststItemUnit) * 100).toPrecision(15))) / 100 * Math.sign(item.fiststItemUnit); 
                optionsConstructorItem.secondItemUnit = Math.round(Number((Math.abs(item.secondItemUnit) * 100).toPrecision(15))) / 100 * Math.sign(item.secondItemUnit); 
                optionsConstructorItem.firstItemAdditionalPrice = Math.round(Number((Math.abs(item.firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign(item.firstItemAdditionalPrice); 
                optionsConstructorItem.secondItemAdditionalPrice = Math.round(Number((Math.abs(item.secondItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign(item.secondItemAdditionalPrice); 
                optionsConstructorItem.additionalPrice = Math.round(Number((Math.abs(item.additionalPrice) * 100).toPrecision(15))) / 100 * Math.sign(item.additionalPrice); 
                optionsConstructorItem.menuOptions = [];
                optionsConstructorItem.summon = item.summon;

                for (const menuitem of item.menuOptions) {

                    let optionsConstructorMenuitem = {}

                    optionsConstructorMenuitem.variantName = menuitem.variantName
                    optionsConstructorMenuitem.variantDesc = menuitem.variantDesc
                    optionsConstructorMenuitem.priceAdd = Math.round(Number((Math.abs(menuitem.priceAdd) * 100).toPrecision(15))) / 100 * Math.sign(menuitem.priceAdd); 
                    optionsConstructorMenuitem.summonID = menuitem.summonID

                    if (req.files.length > 0) {
                        for (const menuItemImage of req.files) {
                            if (menuitem.fileOriginalName === menuItemImage.originalname) {
                                optionsConstructorMenuitem.fileURL = url + '/euploads/' + menuItemImage.filename;
                            } 
                        }
                    }
                    
                    optionsConstructorItem.menuOptions.push(optionsConstructorMenuitem);

                }

                optionsConstructor.push(optionsConstructorItem);

            }

            const amountDiscountArray = JSON.parse(req.body.amountDiscount);
            let amountDiscountConstructor = []

            for (const item of amountDiscountArray) {
                let amountDiscountConstructorItem = {}
                amountDiscountConstructorItem.amount = Number(item.amount);
                amountDiscountConstructorItem.price = Math.round(Number((Math.abs(item.price) * 100).toPrecision(15))) / 100 * Math.sign(item.price);
                amountDiscountConstructorItem.discount = Number(item.discount);
                amountDiscountConstructor.push(amountDiscountConstructorItem);
            }
            try {
                var productObj = {
                    name: req.body.name,
                    link: req.body.link,
                    description: req.body.description,
                    image: url + '/euploads/' + req.files[0].filename,
                    price: req.body.price,
                    amountDiscount: amountDiscountConstructor,
                    options: optionsConstructor,
                }
                if (req.body.discountPrice === null || req.body.discountPrice === 0) {
                    productObj.discount = 0;
                } else {
                    productObj.discount = req.body.discountPrice;
                }
                if (req.body.minOrderAmount !== null) {
                    productObj.minOrderAmount = req.body.minOrderAmount;
                }
                if (req.body.oneDayLimit !== null) {
                    productObj.oneDayLimit = req.body.oneDayLimit;
                } else {
                    productObj.oneDayLimit = 1;
                }
                if (req.body.twoDayLimit !== null) {
                    productObj.twoDayLimit = req.body.twoDayLimit;
                } else {
                    productObj.twoDayLimit = 1;
                }

                // console.log('ONE DAY ->',req.body.twoDayPriceIncreace);
                if (req.body.oneDayPriceIncreace !== null) {
                    productObj.oneDayPriceIncreace = req.body.oneDayPriceIncreace;
                } else {
                    productObj.oneDayPriceIncreace = 0;
                }
                if (req.body.twoDayPriceIncreace !== null) {
                    productObj.twoDayPriceIncreace = req.body.twoDayPriceIncreace;
                } else {
                    productObj.oneDayPriceIncreace = 0;
                }
                // productObj.pictureAmount = req.body.pictureAmount;
                const newProduct = new Product(productObj);
                newProduct.save(function (err) {
                    if (err) {
                        console.log('ERROR', err);
                        res.send({ 
                            success: false, 
                            error: err
                        })
                    } else {
                        res.send({ 
                            success: true, 
                            error: '',
                            message: 'Produktas pridėtas.'
                        })
                    }
                });
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: error
                })
            }
        } else {
            try {
                Product.findById(req.body.id, function (err, product) {
                    if (!err) {
                        // console.log(req.body);
                        const url = process.env.MAIN_URL;
                        const variantoptions = JSON.parse(req.body.options);
                        var optionsConstructor = [];
                        var productImageList = []; //product.image.substring(product.image.lastIndexOf('/') + 1)
                        var reqImageList = []; //req.body.mainImage.substring(req.body.mainImage.lastIndexOf('/') + 1)

                        for (const item of variantoptions) {
                            for (const menuitem of item.menuOptions) {
                                if (menuitem.fileURL) {
                                    reqImageList.push(menuitem.fileURL.substring(menuitem.fileURL.lastIndexOf('/') + 1));
                                } 
                            }
                        }

                        for (const item of product.options) {
                            for (const menuitem of item.menuOptions) {
                                if (menuitem.fileURL) {
                                    productImageList.push(menuitem.fileURL.substring(menuitem.fileURL.lastIndexOf('/') + 1));
                                } 
                            }
                        }

                        for (const item of productImageList) {
                            if (!reqImageList.includes(item)){
                                try {
                                    if (fs.existsSync(`./private/uploads/${item}`)) {
                                        fs.unlink(`./private/uploads/${item}`, (err) => {
                                            if (err) {
                                                res.send({ 
                                                    success: false, 
                                                    error: err
                                                })
                                            }
                                        })
                                    }
                                } catch (err) {
                                    res.send({ 
                                        success: false, 
                                        error: err
                                    })
                                    return
                                }
                            }
                        }

                        for (const item of variantoptions) {

                            let optionsConstructorItem = {}
                            optionsConstructorItem.type = item.type
                            optionsConstructorItem.name = item.name
                            optionsConstructorItem.info = item.info
                            optionsConstructorItem.firstItemName = item.firstItemName;
                            optionsConstructorItem.secondItemName = item.secondItemName;
                            optionsConstructorItem.fistItemMinValue = Math.round(Number((Math.abs(item.fistItemMinValue) * 100).toPrecision(15))) / 100 * Math.sign(item.fistItemMinValue); 
                            optionsConstructorItem.firstItemMaxValue = Math.round(Number((Math.abs(item.firstItemMaxValue) * 100).toPrecision(15))) / 100 * Math.sign(item.firstItemMaxValue); 
                            optionsConstructorItem.secondItemMinValue = Math.round(Number((Math.abs(item.secondItemMinValue) * 100).toPrecision(15))) / 100 * Math.sign(item.secondItemMinValue); 
                            optionsConstructorItem.secondItemMaxValue = Math.round(Number((Math.abs(item.secondItemMaxValue) * 100).toPrecision(15))) / 100 * Math.sign(item.secondItemMaxValue); 
                            optionsConstructorItem.fiststItemUnit = Math.round(Number((Math.abs(item.fiststItemUnit) * 100).toPrecision(15))) / 100 * Math.sign(item.fiststItemUnit); 
                            optionsConstructorItem.secondItemUnit = Math.round(Number((Math.abs(item.secondItemUnit) * 100).toPrecision(15))) / 100 * Math.sign(item.secondItemUnit); 
                            optionsConstructorItem.firstItemAdditionalPrice = Math.round(Number((Math.abs(item.firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign(item.firstItemAdditionalPrice); 
                            optionsConstructorItem.secondItemAdditionalPrice = Math.round(Number((Math.abs(item.secondItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign(item.secondItemAdditionalPrice);
                            optionsConstructorItem.additionalPrice = Math.round(Number((Math.abs(item.additionalPrice) * 100).toPrecision(15))) / 100 * Math.sign(item.additionalPrice); 
                            optionsConstructorItem.menuOptions = [];
                            optionsConstructorItem.summon = item.summon;

                            for (const menuitem of item.menuOptions) {

                                let optionsConstructorMenuitem = {}

                                optionsConstructorMenuitem.variantName = menuitem.variantName
                                optionsConstructorMenuitem.variantDesc = menuitem.variantDesc
                                optionsConstructorMenuitem.priceAdd = Math.round(Number((Math.abs(menuitem.priceAdd) * 100).toPrecision(15))) / 100 * Math.sign(menuitem.priceAdd); 
                                optionsConstructorMenuitem.summonID = menuitem.summonID
                                
                                if (menuitem.fileOriginalName) {
                                    if (req.files.length > 0) {
                                        for (const menuItemImage of req.files) {
                                            if (menuitem.fileOriginalName === menuItemImage.originalname) {
                                                optionsConstructorMenuitem.fileURL = url + '/euploads/' + menuItemImage.filename;
                                            } 
                                        }
                                    }
                                } else {
                                    optionsConstructorMenuitem.fileURL = menuitem.fileURL;
                                }
                                optionsConstructorItem.menuOptions.push(optionsConstructorMenuitem);

                            }

                            optionsConstructor.push(optionsConstructorItem);

                        }

                        const amountDiscountArray = JSON.parse(req.body.amountDiscount);
                        let amountDiscountConstructor = []

                        for (const item of amountDiscountArray) {
                            let amountDiscountConstructorItem = {}
                            amountDiscountConstructorItem.amount = Number(item.amount);
                            amountDiscountConstructorItem.price = Math.round(Number((Math.abs(item.price) * 100).toPrecision(15))) / 100 * Math.sign(item.price);
                            amountDiscountConstructorItem.discount = Number(item.discount);
                            amountDiscountConstructor.push(amountDiscountConstructorItem);
                        }

                        var mainImageX = '';

                        if (product.image.substring(product.image.lastIndexOf('/') + 1) === req.body.mainImage.substring(req.body.mainImage.lastIndexOf('/') + 1)) {
                            mainImageX = url + '/euploads/' + product.image.substring(product.image.lastIndexOf('/') + 1);
                        } else {
                            try{
                                if (fs.existsSync(`./private/uploads/${product.image.substring(product.image.lastIndexOf('/') + 1)}`)) {
                                    fs.unlink(`./private/uploads/${product.image.substring(product.image.lastIndexOf('/') + 1)}`, (err) => {
                                        if (err) {
                                            res.send({ 
                                                success: false, 
                                                error: err
                                            })
                                        }
                                    });
                                }
                            } catch (err) {
                                res.send({ 
                                    success: false, 
                                    error: err
                                })
                                return
                            }
                            mainImageX = url + '/euploads/' + req.files[0].filename;
                        }

                        product.name = req.body.name;
                        product.link = req.body.link;
                        product.description = req.body.description;
                        product.image = mainImageX;
                        product.price = req.body.price;
                        product.amountDiscount = amountDiscountConstructor;
                        product.options = optionsConstructor;
                        
                        if (req.body.discountPrice === null || req.body.discountPrice === 0) {
                            product.discount = 0;
                        } else {
                            product.discount = req.body.discountPrice;
                        }
                        if (req.body.minOrderAmount !== null) {
                            product.minOrderAmount = req.body.minOrderAmount;
                        }
                        if (req.body.oneDayLimit !== null) {
                            product.oneDayLimit = req.body.oneDayLimit;
                        } else {
                            product.oneDayLimit = 1;
                        }
                        if (req.body.twoDayLimit !== null) {
                            product.twoDayLimit = req.body.twoDayLimit;
                        } else {
                            product.twoDayLimit = 1;
                        }
                        // const test = parseInt(req.body.oneDayPriceIncreace)
                        // console.log('ONE DAY ->', typeof test);
                        if (req.body.oneDayPriceIncreace !== null) {
                            product.oneDayPriceIncreace = req.body.oneDayPriceIncreace;
                        } else {
                            product.oneDayPriceIncreace = 0;
                        }
                        if (req.body.twoDayPriceIncreace !== null) {
                            product.twoDayPriceIncreace = req.body.twoDayPriceIncreace;
                        } else {
                            product.oneDayPriceIncreace = 0;
                        }
                        // product.pictureAmount = req.body.pictureAmount;
                        
                        product.save(function (err) {
                            if (err) {
                                res.send({ 
                                    success: false, 
                                    error: err
                                })
                            } else {
                                res.send({ 
                                    success: true, 
                                    error: '',
                                    message: 'Produktas atnaujintas.'
                                })
                            }
                        });

                    } else {
                        res.send({ 
                            success: false, 
                            error: error
                        })
                    }
                });
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: error
                })
            }
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
})

router.post("/searchOrders", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Order.find({$or: [
                {uzsakymoNr: isNaN(req.body.searchValue) ? null : req.body.searchValue }, 
                {clientUsername: { "$regex": `${req.body.searchValue}`, '$options': 'i' }},  
                {'delivery.firstName': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
                {'delivery.lastName': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
                {'delivery.phone': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
                {'delivery.city': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
                {'delivery.address': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
                {'delivery.zipcode': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
                {'delivery.companyName': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
                {'delivery.companyCode': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
                {'delivery.companyAddress': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
                {'delivery.companyPVM': { "$regex": `${req.body.searchValue}`, '$options' : 'i' }}, 
            ]}, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    res.send({ 
                        success: true, 
                        result: result
                    })
                }
            }).sort('-createdAt').limit(7);
        } catch (error) {
            console.log(error);
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
})

router.post("/getStats", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            const orders = await Order.find({ createdAt: { $gte: req.body.nuo, $lte: req.body.iki }, status: 'Įvykdytas' }).sort('createdAt').exec();

            const datename = item => moment(item.createdAt, 'YYYY-MM-DD').format('YYYY-MM-DD');
            const result = _.groupBy(orders, datename);

            var data = [];

            for (const item in result) {
                var totalPrice = 0;
                var totalDiscountedPrice = 0;
                var totalOrders = 0;
                var totalSanaudos = 0;
                for (const inner of result[item]) {
                    totalPrice = totalPrice + inner.price;
                    totalDiscountedPrice = totalDiscountedPrice + inner.discountPrice;
                    totalOrders = totalOrders + 1;
                    totalSanaudos = totalSanaudos + inner.sanaudos;
                }
                data.push({
                    date: item,
                    totalPrice: roundTwoDec(totalPrice),
                    totalDiscountedPrice: roundTwoDec(totalDiscountedPrice),
                    totalSanaudos: roundTwoDec(totalSanaudos),
                    totalOrders: totalOrders,
                });
            }

            res.send({ 
                success: true, 
                data: data,
                error: ''
            })
        } catch (error) {
            console.log(error);
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
})

router.post("/updateSanaudas", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Order.findById(req.body.orderID, function (err, itm) {
                if (err){
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    itm.sanaudos = req.body.san;
                    itm.save();
                    res.send({ 
                        success: true, 
                        error: ''
                    })
                }
            });
        } catch (error) {
            console.log(error);
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
})

router.post("/searchAccounts", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            User.find({$or: [
                {username: { "$regex": `${req.body.searchValue}`.replace(/[^a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ]/g, ""), '$options' : 'i' }}, 
                {firstName: { "$regex": `${req.body.searchValue}`.replace(/[^a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ]/g, ""), '$options' : 'i' }}, 
                {lastName: { "$regex": `${req.body.searchValue}`.replace(/[^a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ]/g, ""), '$options' : 'i' }}, 
                {phoneNumber: { "$regex": `${req.body.searchValue}`.replace(/[^a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ]/g, ""), '$options' : 'i' }}
            ]}, function (err, result) {
                if (err) {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    res.send({ 
                        success: true, 
                        result: result
                    })
                }
            }).sort('-createdAt').limit(7);
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
})

router.post("/updateStatus", verifyUser, async (req, res, next) => {
    if (req.user.administracija) {
        try {
            User.findById(req.body.id, function (err, user) {
                if (err) {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    user.personalas = req.body.personalas;
                    user.administracija = req.body.administracija;
                    user.save();
                    res.send({ 
                        success: true, 
                        error: ''
                    })
                }
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
})

router.post("/getUserAddresses", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Address.find({userId: req.body.id}, function (err, result) {
                if (err) {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    res.send({ 
                        success: true, 
                        result: result
                    })
                }
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
})

router.post("/getUserAccounts", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            User.paginate({}, {
                page: req.body.page,
                limit: 11,
                sort: { createdAt: -1 },
            }, function (err, result) {
                if (!err) {
                    res.send({ 
                        success: true, 
                        items: result.docs,
                        totalItems: result.totalDocs,
                        itemLimit: result.limit,
                        currentPage: result.page,
                        totalPages: result.totalPages,
                        hasNextPage: result.hasNextPage,
                        nextPage: result.nextPage,
                        hasPrevPage: result.hasPrevPage,
                        prevPage: result.prevPage,
                        pagingCounter: result.pagingCounter
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
            });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
})

router.post("/getEmailAddress", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            User.find({$or: [
                {username: { "$regex": `${req.body.searchValue}`.replace(/[^a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ]/g, ""), '$options' : 'i' }}, 
                {firstName: { "$regex": `${req.body.searchValue}`.replace(/[^a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ]/g, ""), '$options' : 'i' }}, 
                {lastName: { "$regex": `${req.body.searchValue}`.replace(/[^a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ]/g, ""), '$options' : 'i' }}
            ]}, function (err, result) {
                if (err) {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    res.send({ 
                        success: true, 
                        result: result
                    })
                }
            }).sort('-createdAt').limit(7);
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
})

router.get("/getAllEmailAddresses", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            User.find({personalas: false, administracija: false}, 'username', function (err, result) {
                if (err) {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    res.send({ 
                        success: true, 
                        result: result
                    })
                }
            }).sort('-createdAt')
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
});

router.post("/saveEmailTemplate", verifyUser, (req, res, next) => {
    if (req.user.administracija) {
        if (req.body.letterID) {
            try {
                Template.findById(req.body.letterID, function (err, template) {
                    if (!err) {
                        template.name = req.body.letterName;
                        template.html = req.body.letterHTML;
                        template.json = req.body.letterJSON;
                        template.save(function (err) {
                            if (err) {
                                res.send({ 
                                    success: false, 
                                    error: `${err}`
                                })
                            } else {
                                res.send({ 
                                    success: true, 
                                    error: '',
                                    message: 'Šablonas atnaujintas.'
                                })
                            }
                        });
                    } else {
                        res.send({ 
                            success: false, 
                            error: error
                        })
                    }
                });
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: error
                })
            }
        } else {
            try {
                const templateObj = {
                    name: req.body.letterName,
                    html: req.body.letterHTML,
                    json: req.body.letterJSON,  
                }
                const newTemplate = new Template(templateObj);
                newTemplate.save(function (err) {
                    if (err) {
                        res.send({ 
                            success: false, 
                            error: `${err}`
                        })
                    } else {
                        res.send({ 
                            success: true, 
                            error: '',
                            message: 'Šablonas išsaugotas.'
                        })
                    }
                });
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: `${error}`
                })
            }
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

router.post("/getTemplates", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Template.paginate({}, {
                page: req.body.page,
                limit: 7,
                sort: { createdAt: -1 },
            }, function (err, result) {
                if (!err) {
                    res.send({ 
                        success: true, 
                        items: result.docs,
                        totalItems: result.totalDocs,
                        itemLimit: result.limit,
                        currentPage: result.page,
                        totalPages: result.totalPages,
                        hasNextPage: result.hasNextPage,
                        nextPage: result.nextPage,
                        hasPrevPage: result.hasPrevPage,
                        prevPage: result.prevPage,
                        pagingCounter: result.pagingCounter
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
              });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
});

router.post("/deleteTemplate",  verifyUser, async (req, res, next) => {
    if (req.user.administracija) {
        try {
            Template.deleteOne({ _id: req.body.templateID }, function (err) {
                if (err) {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    res.send({ 
                        success: true, 
                        error: ''
                    })
                }
            });
        }  catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

router.post("/sendEmail", verifyUser, (req, res, next) => {
    if (req.user.administracija) {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            // secure: true, 
            // secureConnection: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls:{
                // rejectUnauthorized: false,
                // ciphers:'SSLv3',
                // secureProtocol: "TLSv1_method"
            },
        });
        for (const address of req.body.adress) {
            try {
                const message = {
                    from: process.env.EMAIL_FROM,
                    to: address,
                    subject: req.body.subject,
                    html: req.body.letter
                };
                transporter.sendMail(message, function(err) {
                    if(err) {
                        res.send({ 
                            success: false, 
                            error: err
                        })
                        return
                    } 
                })
            }  catch (error) {
                res.send({ 
                    success: false, 
                    error: error
                })
                return
            }
        };
        res.send({ 
            success: true, 
            error: ''
        });
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }  
});

router.post("/addEditLoyalty", verifyUser, (req, res, next) => {
    if (req.user.administracija) {
        if (req.body.id) {
            try {
                Loyalty.findById(req.body.id, function (err, loyalty) {
                    if (!err) {
                        loyalty.money = req.body.money;
                        loyalty.discount = req.body.discount;
                        loyalty.save(function (err) {
                            if (err) {
                                res.send({ 
                                    success: false, 
                                    error: `${err}`
                                })
                            } else {
                                res.send({ 
                                    success: true, 
                                    error: '',
                                    message: 'Lojalumo lygis atnaujintas.'
                                })
                            }
                        });
                    } else {
                        res.send({ 
                            success: false, 
                            error: error
                        })
                    }
                });
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: error
                })
            }
        } else {
            try {
                const loyaltyObj = {
                    money: req.body.money,
                    discount: req.body.discount,
                }
                const newLoyalty = new Loyalty(loyaltyObj);
                newLoyalty.save(function (err) {
                    if (err) {
                        res.send({ 
                            success: false, 
                            error: `${err}`
                        })
                    } else {
                        res.send({ 
                            success: true, 
                            error: '',
                            message: 'Lojalumo lygis išsaugotas.'
                        })
                    }
                });
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: `${error}`
                })
            }
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

router.post("/deleteLoyaltyItem",  verifyUser, async (req, res, next) => {
    if (req.user.administracija) {
        try {
            Loyalty.deleteOne({ _id: req.body.id }, function (err) {
                if (err) {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    res.send({ 
                        success: true, 
                        error: ''
                    })
                }
            });
        }  catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

router.post("/addEditDiscountCode", verifyUser, (req, res, next) => {
    if (req.user.administracija) {
        if (req.body.id) {
            try {
                Code.findById(req.body.id, function (err, code) {
                    if (!err) {
                        code.code = req.body.code;
                        code.discount = req.body.discount;
                        code.oneuse = req.body.oneuse;
                        code.valid = req.body.valid;
                        code.modifiedAt = new Date();
                        code.save(function (err) {
                            if (err) {
                                res.send({ 
                                    success: false, 
                                    error: `${err}`
                                })
                            } else {
                                res.send({ 
                                    success: true, 
                                    error: '',
                                    message: 'Nuolaidos kodas atnaujintas.'
                                })
                            }
                        });
                    } else {
                        res.send({ 
                            success: false, 
                            error: error
                        })
                    }
                });
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: error
                })
            }
        } else {
            
            try {
                Code.countDocuments({code: req.body.code}, function (err, count){ 
                    if(count>0){
                        res.send({ 
                            success: false, 
                            error: 'Toks kodas jau egzistuoja'
                        })
                    } else {
                        const codeObj = {
                            code: req.body.code,
                            discount: req.body.discount,
                            oneuse: req.body.oneuse,
                            valid: req.body.valid,
                            modifiedAt: new Date(),
                        }
                        const newCode = new Code(codeObj);
                        newCode.save(function (err) {
                            if (err) {
                                res.send({ 
                                    success: false, 
                                    error: `${err}`
                                })
                            } else {
                                res.send({ 
                                    success: true, 
                                    error: '',
                                    message: 'Nuolaidos kodas išsaugotas.'
                                })
                            }
                        });
                    }
                }); 
            } catch (error) {
                res.send({ 
                    success: false, 
                    error: `${error}`
                })
            }
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

router.post("/getAllCodes", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Code.paginate({}, {
                page: req.body.page,
                limit: 15,
                sort: { modifiedAt: -1 },
            }, function (err, result) {
                if (!err) {
                    res.send({ 
                        success: true, 
                        items: result.docs,
                        totalItems: result.totalDocs,
                        itemLimit: result.limit,
                        currentPage: result.page,
                        totalPages: result.totalPages,
                        hasNextPage: result.hasNextPage,
                        nextPage: result.nextPage,
                        hasPrevPage: result.hasPrevPage,
                        prevPage: result.prevPage,
                        pagingCounter: result.pagingCounter
                    })
                } else {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                }
              });
        } catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate personalo narys.'
        })
    }
});

router.post("/deleteCode",  verifyUser, async (req, res, next) => {
    if (req.user.administracija) {
        try {
            Code.deleteOne({ _id: req.body.id }, function (err) {
                if (err) {
                    res.send({ 
                        success: false, 
                        error: err
                    })
                } else {
                    res.send({ 
                        success: true, 
                        error: ''
                    })
                }
            });
        }  catch (error) {
            res.send({ 
                success: false, 
                error: error
            })
        }
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        })
    }
});

const ConfirmEmail = () => {
    var html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; }
    @media only screen and (min-width: 520px) {
      .u-row {
        width: 500px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-100 {
        width: 500px !important;
      }
    
    }
    
    @media (max-width: 520px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: calc(100% - 40px) !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    </style>
      
      
    
    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F1FAEE;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F1FAEE;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F1FAEE;"><![endif]-->
        
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #e63946;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
      <div style="background-color: #e63946;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:17px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="left">
          <a href="https://www.treklama.lt" target="_blank">
          <img align="left" border="0" src="https://unroll-images-production.s3.amazonaws.com/projects/2/1638101352390-Treklama-01.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 57%;max-width: 265.62px;" width="265.62"/>
          </a>
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
      <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="color: #1d3557; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Cabin, sans-serif; font-size: 18px; line-height: 25.2px;">Sveiki,</span></p>
    <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
    <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Cabin, sans-serif; font-size: 18px; line-height: 25.2px;">Jūsų užsakymas paruo&scaron;tas ir perduotas kurjeriui. Ačiū, kad naudojatės mūsų paslaugomis! </span></p>
    <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
    <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Cabin, sans-serif; font-size: 18px; line-height: 25.2px;">Tavo Reklama.</span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>
    `;
    return html;
};

module.exports = router