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
const Payment = require("../models/payment")
const Comment = require("../models/comment")
const Settings = require("../models/settings")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const resetPwdHash = require("jwt-simple")
const nodemailer = require('nodemailer');
const fs = require('fs')
var _ = require('lodash');
var moment = require('moment');
const ConfirmEmail = require("../utils/ConfirmEmail");

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
        rejectUnauthorized: false,
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

router.post("/getUserPayments", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Payment.paginate({clientUsername: req.body.username}, {
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

router.post("/getPayments", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Payment.paginate({}, {
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
                    })
                } else {
                    console.log('ERROR => ', err);
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
                        for (const galeryImage of product.galerija) {
                            if (fs.existsSync(`./private/uploads/${galeryImage.substring(galeryImage.lastIndexOf('/') + 1)}`)) {
                                fs.unlink(`./private/uploads/${galeryImage.substring(galeryImage.lastIndexOf('/') + 1)}`, (err) => {
                                    if (err) {
                                        console.log(err);
                                        // res.send({ 
                                        //     success: false, 
                                        //     error: err
                                        // })
                                    }
                                })
                            }
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

router.post("/galeryUpload", verifyUser, upload.array("images"), (req, res, next) => {
    if (req.user.administracija) {
        const url = process.env.MAIN_URL;
        Product.findById(req.body.productID, function (err, product) {
            if (!err) {

                var addToGalery = [];
                if (req.files.length > 0) {
                    for (const image of req.files) {
                        addToGalery.push(url + '/euploads/' + image.filename); 
                    }
                }
                const finalGalery = product.galerija.concat(addToGalery);
                product.galerija = finalGalery;
                product.save(function( err, result){
                    if (err) {
                        res.send({ 
                            success: false, 
                            error: err
                        });
                    } else {
                        res.send({ 
                            success: true, 
                            error: '',
                            galery: result.galerija
                        });
                    }
                });
            } else {
                res.send({ 
                    success: false, 
                    error: err
                });
            }
        });
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        });
    }
});

router.post("/deleteGaleryItem", verifyUser, (req, res, next) => {
    if (req.user.administracija) {
        Product.findById(req.body.productID, function (err, product) {
            if (!err) {
                if (fs.existsSync(`./private/uploads/${req.body.image.substring(req.body.image.lastIndexOf('/') + 1)}`)) {
                    fs.unlink(`./private/uploads/${req.body.image.substring(req.body.image.lastIndexOf('/') + 1)}`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
                var newGalery = product.galerija.filter(function(value, index, arr){ 
                    return value !== req.body.image;
                });
                product.galerija = newGalery;
                product.save(function( err, result){
                    if (err) {
                        res.send({ 
                            success: false, 
                            error: err
                        });
                    } else {
                        res.send({ 
                            success: true, 
                            error: '',
                            galery: result.galerija
                        });
                    }
                });
            } else {
                res.send({ 
                    success: false, 
                    error: err
                });
            }
        });
    } else {
        res.send({ 
            success: false, 
            error: 'Nesate administratorius.'
        });
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
        });
    }
});

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
});

router.post("/searchpayments", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            Payment.find({$or: [
                {orderNr: isNaN(req.body.searchValue) ? null : req.body.searchValue }, 
                {clientUsername: { "$regex": `${req.body.searchValue}`, '$options': 'i' }}, 
                {firstName: { "$regex": `${req.body.searchValue}`, '$options': 'i' }},  
                {lastName: { "$regex": `${req.body.searchValue}`, '$options': 'i' }},  
                {city: { "$regex": `${req.body.searchValue}`, '$options': 'i' }},  
                {address: { "$regex": `${req.body.searchValue}`, '$options': 'i' }},  
                {zip: { "$regex": `${req.body.searchValue}`, '$options': 'i' }},   
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
});

router.post("/getStats", verifyUser, async (req, res, next) => {
    if (req.user.personalas || req.user.administracija) {
        try {
            const orders = await Order.find({ createdAt: { $gte: req.body.nuo, $lte: req.body.iki }, status: 'Įvykdytas' }).sort('createdAt').exec();

            var dataGroupedByProduct = [];

            for (const lll of orders) {
                for (const nnn of lll.cartItems) {
                    if (dataGroupedByProduct.filter(e => e.name === nnn.name).length > 0) {
                        const index = dataGroupedByProduct.findIndex( (element) => element.name === nnn.name);
                        dataGroupedByProduct[index].value = roundTwoDec(dataGroupedByProduct[index].value + nnn.discountedPrice);
                    } else {
                        dataGroupedByProduct.push({
                            name: nnn.name,
                            value: roundTwoDec(nnn.discountedPrice)
                        });
                    }
                }
            }

            const datename = item => moment(item.createdAt, 'YYYY-MM-DD').format('YYYY-MM-DD');
            const result = _.groupBy(orders, datename);

            var data = [];

            for (const item in result) {
                
                var totalPrice = 0;
                var totalDiscountedPrice = 0;
                var totalOrders = 0;
                var totalSanaudos = 0;
                for (const inner of result[item]) {
                    // console.log(inner);
                    totalPrice = totalPrice + inner.price;
                    totalDiscountedPrice = totalDiscountedPrice + inner.discountPrice;
                    // totalDiscountedPrice = totalDiscountedPrice + (inner.price * ((100 - inner.discount) / 100)) + inner.maketavimoKaina
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
                groupedProducts: dataGroupedByProduct,
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
                rejectUnauthorized: false,
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

module.exports = router