const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Address = require("../models/address")
const Product = require("../models/products")
const Loyalty = require("../models/loyalty")
const Carousel = require("../models/carousel")
const CartItem = require("../models/cartItem")
const Code = require("../models/code")
const Order = require("../models/order")
const Comment = require("../models/comment")
const Settings = require("../models/settings")
const Payment = require("../models/payment")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const resetPwdHash = require("jwt-simple")
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
const Paysera = require('paysera-nodejs');
// import { ResetPswEmail } from '../utils/resetPasswordEmail.js';

const { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } = require("../authenticate")

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + `-${file.originalname.replace(/\\|\//g,'')}`);
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 104857600},
}) // .single("image");

const deleteFile = (fileUrl) => {
  try {
    if (fs.existsSync(`./public/uploads/${fileUrl}`)) {
      fs.unlink(`./public/uploads/${fileUrl}`, (err) => {
        if (err) {
          return false;
        } else {
         return true;
        }
      })
    }
  } catch (error) {
    return false;
  }
};

const roundTwoDec = (num) => { 
  const result = Math.round(Number((Math.abs(num) * 100).toPrecision(15))) / 100 * Math.sign(num);
  return result;
};

const getCartItemPrice = async (cartItem) => {
  const product = await Product.findById(cartItem.productID).exec();
  var min = product.amountDiscount;
  min.sort(function (a, b) {
    return a.amount - b.amount
  });
  var unitPrice = 0;
  var unitDiscount = 0;
  // var gamybosPabrangimas = 1;
  for (const x of min) {
    if (cartItem.quantity >= x.amount) {
      unitPrice = roundTwoDec(x.price);
      unitDiscount = x.discount;
    } else {
      break;
    }
  };
  for (const opt of cartItem.options) {
    for (const productOpt of product.options) {
      if (opt.name === productOpt.name && opt.type === productOpt.type) {
        if (opt.type === 0) {
          for (const menuItem of productOpt.menuOptions) {
            if (menuItem.variantName === opt.value) {
              unitPrice = unitPrice + roundTwoDec(menuItem.priceAdd);
            }
          }
        } else if (opt.type === 1) {
          var firstTotalPrice = ((opt.firstValue - productOpt.fistItemMinValue) / productOpt.fiststItemUnit) * productOpt.firstItemAdditionalPrice;
          var secondTotalPrice = ((opt.secondValue - productOpt.secondItemMinValue) / productOpt.secondItemUnit) * productOpt.secondItemAdditionalPrice;
          unitPrice = unitPrice + roundTwoDec(firstTotalPrice) + roundTwoDec(secondTotalPrice);
        } else if (opt.type === 2) {
          for (const menuItem of productOpt.menuOptions) {
            if (menuItem.variantName === opt.value) {
              unitPrice = unitPrice + roundTwoDec(menuItem.priceAdd);
            }
          }
        } else if (opt.type === 3) {
          var firstTotalPrice2 = ((opt.firstValue - productOpt.fistItemMinValue) / productOpt.fiststItemUnit) * productOpt.firstItemAdditionalPrice;
          unitPrice = unitPrice + roundTwoDec(firstTotalPrice2);
        }
      }
    };
  };

  const roundedUnitPrice = roundTwoDec(unitPrice);  // * gamybosPabrangimas
  const roundedTotalPrice = roundTwoDec(roundedUnitPrice * cartItem.quantity);
  const roundedTotalDiscountedPrice = roundTwoDec(roundedUnitPrice * cartItem.quantity * (1 - (unitDiscount / 100)));

  return [roundedTotalPrice, roundedTotalDiscountedPrice, roundedUnitPrice, unitDiscount];
};

const sendThanksEmail = (email) => {
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
  const message = {
    from: process.env.EMAIL_FROM,
    to: `${email}`,
    subject: "Užsakymas gautas.",
    html: ThanksEmail(),
  };
  transporter.sendMail(message);
};

var payseraOptions = {
  projectid: '227564',
  sign_password: '5bcd64be156de0ead98f17c3e8738885',
  accepturl: 'https://www.treklama.lt/order',
  cancelurl: 'https://www.treklama.lt/apmokejimoklaida',
  callbackurl: 'https://www.treklama.lt/users/handlePayment',
  test: 1,
};
const paysera = new Paysera(payseraOptions);

router.get("/handlePayment", async (req, res, next) => {
  const request = {
    data: req.query.data, 
    ss1: req.query.ss1,
    ss2: req.query.ss2,
  };
  const isValid = paysera.checkCallback(request);
  console.log('IS VALID ???? => ', isValid );
  if (isValid) {

    const payseraResponse = paysera.decode(req.query.data);
    console.log('//===================== PAYSERA ORDER CONFIRMATION INFO ==================//');
    console.log(payseraResponse);
    console.log('//========================================================================//');

    try {
      if (payseraResponse.status === 1) {
        let dscCode = '';
        Order.findOne({ uzsakymoNr: payseraResponse.orderid }, function (err, order) {
          if (!err && order.status !== 'Apmokėtas') {
            order.status = 'Apmokėtas';
            for (const cartItm of order.cartItems) {
              if (cartItm.discount.code !== '') {
                dscCode = cartItm.discount.code;
              }
            }
            order.save();
          } else if (err) {
            console.log(err);
          }
        });
        if (dscCode !== '') {
          Code.findOne({ code: dscCode }, function (err, selectedCode) {
            if (!err) {
              selectedCode.used = selectedCode.used + 1;
              selectedCode.save();
            }
          });
        }
        const paymentObject = new Payment({ 
          clientUsername: payseraResponse.p_email,
          orderNr: payseraResponse.orderid,
          amount: payseraResponse.amount / 100,
          currency: payseraResponse.currency,
          payment: payseraResponse.payment,
          firstName: payseraResponse.p_firstname,
          lastName: payseraResponse.p_lastname,
          city: payseraResponse.p_city,
          address: payseraResponse.p_street,
          zip: payseraResponse.p_zip,
        });
        paymentObject.save();
        req.app.io.of("/valdovas").emit('newOrder', false);
        res.send("OK");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('PAYSERA REQUEST NOT VALID!!!');
  }
});

router.post("/sendComment", async (req, res, next) => {
  try {
    const commentObject = new Comment({ 
      productName: req.body.product,
      name: req.body.name,
      comment: req.body.comment,
      rating: req.body.rating,
    });
    commentObject.save(function (err, comment) {
      if (err) {
        res.send({ 
          success: false, 
          error: "Klaida! Pabandykite vėliau ."
        })
      } else {
        res.send({ 
          success: true, 
          comment: comment,
          error: ""
        })
      }
    });
  } catch (error) {
    res.send({ 
      success: false, 
      error: error
    })
  }
});

router.post("/getComments", async (req, res, next) => {
  try {
    var totalRating = 0;
    const allComments = await Comment.find({productName: req.body.product}, 'rating').exec();
    for (const item of allComments) {
      totalRating = totalRating + item.rating;
    }
    Comment.paginate({productName: req.body.product}, {
      page: req.body.page,
      limit: 3,
      sort: { 
        rating: -1,
        createdAt: -1 
      },
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
                totalRating: totalRating,
            })
        } else {
            console.log(err);
            res.send({ 
                success: false, 
                error: "Klaida! Pabandykite vėliau."
            })
        }
      });
  } catch (error) {
    res.send({ 
      success: false, 
      error: "Klaida! Pabandykite vėliau."
    })
  }
});

router.post("/deleteComment", verifyUser, async (req, res, next) => {
  if (req.user.administracija) {
    try {
      Comment.deleteOne({ _id: req.body.commentID }, function (err) {
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
    } catch (error) {
      res.send({ 
        success: false, 
        error: ''
      })
    }
  } else {
    res.send({ 
      success: false, 
      error: 'Nesate administratorius.'
    })
  }
});

router.post("/getCartItem", async (req, res, next) => {
  try {
    CartItem.findById(req.body.cartItemID, function (err, item){
      if (err) {
        res.send({ 
          success: false, 
          error: err
        })
      } else {
        res.send({ 
          success: true, 
          data: item
        })
      }
    });
  } catch (error) {
    res.send({ 
      success: false, 
      error: error
    })
  }
});

router.post("/getMyOrders", verifyUser, async (req, res, next) => {
  try {
    Order.paginate({clientID: req.user._id}, {
      page: req.body.page,
      limit: 5,
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
                error: "Klaida! Pabandykite vėliau."
            })
        }
      });
  } catch (error) {
    res.send({ 
      success: false, 
      error: "Klaida! Pabandykite vėliau."
    })
  }
});

router.post("/createOrderLoggedIn", verifyUser, async (req, res, next) => {
  var cartItemsIDS = [];
  var cart = [];
  var loyaltyDiscount = 0;
  var codeDiscount = 0;
  var prc = 0;
  var dscPrc = 0;
  var discountUsed = {
    name: '',
    discount: 0,
    code: ''
  }
  try {
    try{
      User.findById(req.user._id, function (err, user){
        if (!err) {
          if (user.firstName === '') {
            user.firstName = req.body.delivery.firstName;
          }
          if (user.lastName === '') {
            user.lastName = req.body.delivery.lastName;
          }
          if (user.phoneNumber === '') {
            user.phoneNumber = req.body.delivery.phone;
          }
          user.save();
        } else {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
    }

    const address = await Address.find({ userId: req.user._id, zipCode: req.body.delivery.zipcode }).exec();
    if (address.length <= 0) {
      const newaddress = new Address({ 
        userId: req.user._id,
        asmuo: req.body.delivery.juridinis ? "Juridinis asmuo" : "Fizinis asmuo",
        city: req.body.delivery.city,
        address: req.body.delivery.address,
        zipCode: req.body.delivery.zipcode,
        companyName: req.body.delivery.juridinis ? req.body.delivery.companyName : '',
        companyCode: req.body.delivery.juridinis ? req.body.delivery.companyCode : '',
        companyAddress: req.body.delivery.juridinis ? req.body.delivery.companyAddress : '',
        companyPVM: req.body.delivery.juridinis ? req.body.delivery.companyPVMCode : '',
      });
      newaddress.save();
    };

    const loyalty = await Loyalty.find({}).sort({ money: 'asc'});
    for (const loyaltyItem of loyalty) {
      if (loyaltyItem.money <= req.user.moneySpent) {
        loyaltyDiscount = loyaltyItem.discount;
      } else {
        break;
      }
    };
    
    if (req.body.kodoNuolaida.kodas !== '') {
      const discountCode = await Code.findOne({ code: req.body.kodoNuolaida.kodas }).exec();
      codeDiscount = discountCode.discount;
    };

    for (const cartItem of req.body.cart) {
      cartItemsIDS.push(cartItem._id);
    };
    const docs = await CartItem.find().where('_id').in(cartItemsIDS).exec();
    
    for (const item of docs) {
      const itemPrices = await getCartItemPrice(item);

      const maxDiscount = Math.max(codeDiscount, itemPrices[3], loyaltyDiscount);
      if (maxDiscount === codeDiscount && req.body.kodoNuolaida.kodas !== '') {
        discountUsed = {
          name: `Nuolaida su kodu ${req.body.kodoNuolaida.kodas}`,
          discount: maxDiscount,
          code: req.body.kodoNuolaida.kodas,
        }
      } else if (maxDiscount === loyaltyDiscount) {
        discountUsed = {
          name: 'Tavo Reklama klubo nuolaida',
          discount: maxDiscount,
          code: '',
        }
      } else if (maxDiscount === itemPrices[3]) {
        discountUsed = {
          name: 'Nuolaida',
          discount: maxDiscount,
          code: '',
        }
      } else {
        discountUsed = {
          name: '',
          discount: 0,
          code: '',
        }
      }

      var productionCost = 1;
      if (req.body.production === '1-2 darbo dienos.') {
        productionCost = 1 + (item.twoDayPriceIncreace / 100);
      } else if (req.body.production === 'Iki 24H.') {
        productionCost = 1 + (item.oneDayPriceIncreace / 100);
      } 

      const cartItemWithPrices = {
        name: item.name,
        productID: item.productID,
        productLink: item.productLink,
        options: item.options,
        pastaba: item.pastaba,
        image: item.image,
        quantity: item.quantity,
        // gamybosLaikas: item.gamybosLaikas,
        oneDayLimit: item.oneDayLimit,
        twoDayLimit: item.twoDayLimit,
        oneDayPriceIncreace: item.oneDayPriceIncreace,
        twoDayPriceIncreace: item.twoDayPriceIncreace,
        maketavimoKaina: item.maketavimoKaina,
        _id: item._id,
        modifiedAt: item.modifiedAt,
        createdAt: item.createdAt,
        // price: itemPrices[0],
        // discountedPrice: itemPrices[1],
        price: roundTwoDec(roundTwoDec(itemPrices[2] * item.quantity) * productionCost + item.maketavimoKaina),
        discountedPrice: roundTwoDec(roundTwoDec(itemPrices[2] * item.quantity) * productionCost * (1 - (maxDiscount / 100)) + item.maketavimoKaina),
        unitPrice: itemPrices[2],
        discount: discountUsed,
        // panaudotaNuolaida: discountUsed.name,
      };
      cart.push(cartItemWithPrices);
    };

    for (const item of cart) {
      prc = prc + item.price;
      dscPrc = dscPrc + item.discountedPrice;
    };

    if (req.body.priceSum.sum === roundTwoDec(prc) && req.body.priceSum.dscSum === roundTwoDec(dscPrc)) {
      const orderObject = new Order({ 
        clientID: req.user._id,
        clientUsername: req.user.username,
        cartItems: cart,
        delivery: req.body.delivery,
        price: prc,
        discountPrice: dscPrc,
        gamybosLaikas: req.body.production,
      });
      orderObject.save(function (err, neworder) {
        if (err) {
          console.log(err);
          res.send({ 
            success: false, 
            error: "Klaida! Pabandykite vėliau ."
          })
        } else {
          sendThanksEmail(req.body.delivery.email);
          req.app.io.of("/valdovas").emit('newOrder', true);
          var params = {
            orderid: neworder.uzsakymoNr,
            p_firstname: neworder.delivery.firstName,
            p_lastname: neworder.delivery.lastName,
            p_email: neworder.delivery.email,
            p_street: neworder.delivery.address,
            p_city: neworder.delivery.city,
            p_zip: neworder.delivery.zipcode,
            amount: neworder.discountPrice * 100,
            currency: 'EUR',
            lang: 'LIT',
            version: 1.6,
            payment: req.body.selectedPaymentMethod,
            country: 'LT',
            paytext: `Užsakymo ${neworder.uzsakymoNr} apmokėjimas [site_name].`,
          };
          var urlToGo = paysera.buildRequestUrl(params);
          // console.log(urlToGo);
          res.send({ 
            success: true, 
            paymentURL: urlToGo,
            error: ""
          })
        }
      });
    } else {
      res.send({ 
        success: false, 
        error: "Klaida! Pabandykite vėliau."
      })
    };

  } catch (error) {
    console.log(error);
    res.send({ 
      success: false, 
      error: "Klaida! Pabandykite vėliau."
    })
  }
});

router.post("/createOrder", async (req, res, next) => {
  var cartItemsIDS = [];
  var cart = [];
  var codeDiscount = 0;
  var prc = 0;
  var dscPrc = 0;
  var clientID = '';
  var discountUsed = {
    name: '',
    discount: 0,
    code: '',
  }
  try {
    const ooser = await User.find({ username: req.body.delivery.email }).exec();
    if (ooser.length <= 0) {
      const newOoser = new User({ 
        username: req.body.delivery.email,
        firstName: req.body.delivery.firstName,
        lastName: req.body.delivery.lastName,
        phoneNumber: req.body.delivery.phone,
      });
      newOoser.save(async (err, user) => {
        if (!err) {
          clientID = user._id;
          const address = await Address.find({ userId: user._id, zipCode: req.body.delivery.zipcode }).exec();
          if (address.length <= 0) {
            try{
              const newaddress = new Address({ 
                userId: user._id,
                asmuo: req.body.delivery.juridinis ? "Juridinis asmuo" : "Fizinis asmuo",
                city: req.body.delivery.city,
                address: req.body.delivery.address,
                zipCode: req.body.delivery.zipcode,
                companyName: req.body.delivery.juridinis ? req.body.delivery.companyName : '',
                companyCode: req.body.delivery.juridinis ? req.body.delivery.companyCode : '',
                companyAddress: req.body.delivery.juridinis ? req.body.delivery.companyAddress : '',
                companyPVM: req.body.delivery.juridinis ? req.body.delivery.companyPVMCode : '',
              });
              newaddress.save();
            } catch (error) {
              console.log(error)
            }
          }
        } else {
          console.log(err)
        }
      });
    } else {
      try {
        User.findOne({ username: req.body.delivery.email }, function (err, user) {
          if (!err) {
            clientID = user._id;
            if (user.firstName === '') {
              user.firstName = req.body.delivery.firstName;
            }
            if (user.lastName === '') {
              user.lastName = req.body.delivery.lastName;
            }
            if (user.phoneNumber === '') {
              user.phoneNumber = req.body.delivery.phone;
            }
            user.save();
          } 
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (req.body.kodoNuolaida.kodas !== '') {
      const discountCode = await Code.findOne({ code: req.body.kodoNuolaida.kodas }).exec();
      codeDiscount = discountCode.discount;
    };

    for (const cartItem of req.body.cart) {
      cartItemsIDS.push(cartItem._id);
    };
    const docs = await CartItem.find().where('_id').in(cartItemsIDS).exec();
    
    for (const item of docs) {
      const itemPrices = await getCartItemPrice(item);

      const maxDiscount = Math.max(codeDiscount, itemPrices[3]);
      if (maxDiscount === codeDiscount && req.body.kodoNuolaida.kodas !== '') {
        discountUsed = {
          name: `Nuolaida su kodu ${req.body.kodoNuolaida.kodas}`,
          discount: maxDiscount,
          code: req.body.kodoNuolaida.kodas,
        }
      }  else if (maxDiscount === itemPrices[3]) {
        discountUsed = {
          name: 'Nuolaida',
          discount: maxDiscount,
          code: '',
        }
      } else {
        discountUsed = {
          name: '',
          discount: 0,
          code: '',
        }
      }

      var productionCost = 1;
      if (req.body.production === '1-2 darbo dienos.') {
        productionCost = 1 + (item.twoDayPriceIncreace / 100);
      } else if (req.body.production === 'Iki 24H.') {
        productionCost = 1 + (item.oneDayPriceIncreace / 100);
      } 

      const cartItemWithPrices = {
        name: item.name,
        productID: item.productID,
        productLink: item.productLink,
        options: item.options,
        pastaba: item.pastaba,
        image: item.image,
        quantity: item.quantity,
        // gamybosLaikas: item.gamybosLaikas,
        oneDayLimit: item.oneDayLimit,
        twoDayLimit: item.twoDayLimit,
        oneDayPriceIncreace: item.oneDayPriceIncreace,
        twoDayPriceIncreace: item.twoDayPriceIncreace,
        maketavimoKaina: item.maketavimoKaina,
        _id: item._id,
        modifiedAt: item.modifiedAt,
        createdAt: item.createdAt,
        // price: itemPrices[0],
        // discountedPrice: itemPrices[1],
        price: roundTwoDec(roundTwoDec(itemPrices[2] * item.quantity) * productionCost + item.maketavimoKaina),
        discountedPrice: roundTwoDec(roundTwoDec(itemPrices[2] * item.quantity) * productionCost * (1 - (maxDiscount / 100)) + item.maketavimoKaina),
        unitPrice: itemPrices[2],
        discount: discountUsed,
        // panaudotaNuolaida: discountUsed.name,
      };
      cart.push(cartItemWithPrices);
    };

    for (const item of cart) {
      prc = prc + item.price;
      dscPrc = dscPrc + item.discountedPrice;
    };

    if (req.body.priceSum.sum === roundTwoDec(prc) && req.body.priceSum.dscSum === roundTwoDec(dscPrc)) {
      const orderObject = new Order({ 
        clientID: clientID,
        clientUsername: req.body.delivery.email,
        cartItems: cart,
        delivery: req.body.delivery,
        price: prc,
        discountPrice: dscPrc,
        gamybosLaikas: req.body.production,
      });
      orderObject.save(function (err, neworder) {
        if (err) {
          console.log(err);
          res.send({ 
            success: false, 
            error: "Klaida! Pabandykite vėliau."
          })
        } else {
          sendThanksEmail(req.body.delivery.email);
          req.app.io.of("/valdovas").emit('newOrder', true);
          var params = {
            orderid: neworder.uzsakymoNr,
            p_firstname: neworder.delivery.firstName,
            p_lastname: neworder.delivery.lastName,
            p_email: neworder.delivery.email,
            p_street: neworder.delivery.address,
            p_city: neworder.delivery.city,
            p_zip: neworder.delivery.zipcode,
            amount: neworder.discountPrice * 100,
            currency: 'EUR',
            lang: 'LIT',
            version: 1.6,
            payment: req.body.selectedPaymentMethod,
            country: 'LT',
            paytext: `Užsakymo ${neworder.uzsakymoNr} apmokėjimas [site_name].`,
          };
          var urlToGo = paysera.buildRequestUrl(params);
          // console.log(urlToGo);
          res.send({ 
            success: true, 
            paymentURL: urlToGo,
            error: ""
          })
        }
      });
    } else {
      res.send({ 
        success: false, 
        error: "Klaida! Pabandykite vėliau."
      })
    };

  } catch (error) {
    console.log(error);
    res.send({ 
      success: false, 
      error: "Klaida! Pabandykite vėliau."
    })
  }
});

router.post("/applyDiscountCode", async (req, res, next) => {
  try {
    Code.findOne({ code: req.body.code }, function (err, code) {
      if (!err) {
        if (code === null) {
          res.send({ 
            success: true, 
            error: "Tokio nuolaidos kodo nėra."
          });
        } else if (new Date(code.valid) <= new Date()) {
          res.send({ 
            success: true, 
            error: "Nuolaidos kodas nebegalioja."
          });
        } else {
          res.send({ 
            success: true, 
            code: code.code,
            discount: code.discount,
            valid: true,
            error: '',
          });
        }
      } else {
        res.send({ 
          success: false, 
          error: "Klaida! Pabandykite vėliau."
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ 
      success: false, 
      error: "Klaida! Pabandykite vėliau."
    });
  }
});

router.post("/getCart", async (req, res, next) => {
  try {
    const docs = await CartItem.find().where('_id').in(req.body.cartItemIDS).exec();
    var updatedCart = [];
    for (const item of docs) {
      const itemPrices = await getCartItemPrice(item);
      const cartItemWithPrices = {
        name: item.name,
        productID: item.productID,
        options: item.options,
        pastaba: item.pastaba,
        image: item.image,
        quantity: item.quantity,
        oneDayLimit: item.oneDayLimit,
        twoDayLimit: item.twoDayLimit,
        oneDayPriceIncreace: item.oneDayPriceIncreace,
        twoDayPriceIncreace: item.twoDayPriceIncreace,
        maketavimoKaina: item.maketavimoKaina,
        _id: item._id,
        modifiedAt: item.modifiedAt,
        createdAt: item.createdAt,
        price: itemPrices[0],
        discountedPrice: itemPrices[1],
        unitPrice: itemPrices[2],
        discount: itemPrices[3],
      };
      updatedCart.push(cartItemWithPrices);
    }
    res.send({ 
      success: true, 
      data: updatedCart
    })
  } catch (error) {
    res.send({ 
      success: false, 
      error: error
    })
  }
});

router.post("/deleteCartItem", async (req, res, next) => {
  try {
    CartItem.findById(req.body.cartItemID, function (err, item){
      if (err) {
        res.send({ 
          success: false, 
          error: err
        })
      } else {
        deleteFile(item.image.substring(item.image.lastIndexOf('/') + 1));
        item.deleteOne();
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
});

router.post("/addToCart", upload.single("image"), async (req, res, next) => {
    const url = process.env.MAIN_URL;
    try {
        const OptionsArray = JSON.parse(req.body.options);
        let OptionsConstructor = []
        
        for (const item of OptionsArray) {
            if (item.type === 0) {
              let OptionsConstructorItem = {}
              OptionsConstructorItem.name = item.name
              OptionsConstructorItem.value = item.value
              OptionsConstructorItem.price = Number(item.price);
              OptionsConstructorItem.summon = item.summon;
              OptionsConstructorItem.summonID = item.summonID;
              OptionsConstructorItem.type = Number(item.type);
              OptionsConstructor.push(OptionsConstructorItem);
            } else if (item.type === 1) {
              let OptionsConstructorItem = {}
              OptionsConstructorItem.name = item.name
              OptionsConstructorItem.firstName = item.firstName
              OptionsConstructorItem.firstValue = Number(item.firstValue);
              OptionsConstructorItem.firstPrice = Number(item.firstPrice);
              OptionsConstructorItem.secondName = item.secondName;
              OptionsConstructorItem.secondValue = Number(item.secondValue);
              OptionsConstructorItem.secondPrice = Number(item.secondPrice);
              OptionsConstructorItem.summon = item.summon;
              OptionsConstructorItem.summonID = item.summonID;
              OptionsConstructorItem.type = Number(item.type);
              OptionsConstructor.push(OptionsConstructorItem);
            } else if (item.type === 2) {
              let OptionsConstructorItem = {}
              OptionsConstructorItem.name = item.name
              OptionsConstructorItem.value = item.value
              OptionsConstructorItem.price = Number(item.price);
              OptionsConstructorItem.summon = item.summon;
              OptionsConstructorItem.summonID = item.summonID;
              OptionsConstructorItem.type = Number(item.type);
              OptionsConstructor.push(OptionsConstructorItem);
            } else if (item.type === 3) {
              let OptionsConstructorItem = {}
              OptionsConstructorItem.name = item.name
              OptionsConstructorItem.firstName = item.firstName
              OptionsConstructorItem.firstValue = Number(item.firstValue);
              OptionsConstructorItem.firstPrice = Number(item.firstPrice);
              OptionsConstructorItem.summon = item.summon;
              OptionsConstructorItem.summonID = item.summonID;
              OptionsConstructorItem.type = Number(item.type);
              OptionsConstructor.push(OptionsConstructorItem);
            }
        }
        
        var maketavimoKaina = 0;
        if (req.body.maketavimoKaina > 0) {
          const settings = await Settings.findOne({}).exec();
          if (settings) {
            maketavimoKaina = settings.maketavimoKaina;
          }
        }

        Product.findById(req.body.productID, function (err, product) {
          if (!err) {
            for (const outter of OptionsArray) {

              var optionsNames = [];
              var menuOptionsNames = [];

              for (const inner of product.options)  {
                optionsNames.push(inner.name);
                if (inner.type === 0) {
                  for (const menuItem of inner.menuOptions) {
                    menuOptionsNames.push(menuItem.variantName);
                  }
                } else if (inner.type === 1) {
                  menuOptionsNames.push(inner.firstItemName);
                  menuOptionsNames.push(inner.secondItemName);
                } else if (inner.type === 2) {
                  for (const menuItem of inner.menuOptions) {
                    menuOptionsNames.push(menuItem.variantName);
                  }
                } else if (inner.type === 3) {
                  menuOptionsNames.push(inner.firstItemName);
                }
              }
              if (!optionsNames.includes(outter.name)) {
                res.send({ 
                  success: false, 
                  error: 'Neatitinka pasirinkimo pavadinimas'
                });
                deleteFile(req.file.filename);
                return;
              }
              if (outter.type === 0 || outter.type === 2) {
                if (!menuOptionsNames.includes(outter.value)) {
                  res.send({ 
                    success: false, 
                    error: 'Neatitinka pasirinkimo varianto pavadinimas'
                  });
                  deleteFile(req.file.filename);
                  return;
                }
              } else if (outter.type === 1) {
                if (!menuOptionsNames.includes(outter.firstName) && !menuOptionsNames.includes(outter.secondName)) {
                  res.send({ 
                    success: false, 
                    error: 'Neatitinka pasirinkimo varianto pavadinimas'
                  });
                  deleteFile(req.file.filename);
                  return;
                }
              } else if (outter.type === 3) {
                if (!menuOptionsNames.includes(outter.firstName)) {
                  res.send({ 
                    success: false, 
                    error: 'Neatitinka pasirinkimo varianto pavadinimas'
                  });
                  deleteFile(req.file.filename);
                  return;
                }
              }
            }
            
            var min = product.amountDiscount;
            min.sort(function (a, b) {
              return a.amount - b.amount
            });

            if (min[0].amount > Number(req.body.quantity)) {
              res.send({ 
                success: false, 
                error: 'Neatitinka kiekis.'
              });
              deleteFile(req.file.filename);
              return;
            };

            if (req.body.id === '') {
              var cartItemObj = {
                  name: product.name,
                  productID: product._id,
                  productLink: product.link,
                  options: OptionsConstructor,
                  pastaba: req.body.pastaba,
                  quantity: Number(req.body.quantity),
                  oneDayLimit: product.oneDayLimit,
                  twoDayLimit: product.twoDayLimit,
                  oneDayPriceIncreace: product.oneDayPriceIncreace,
                  twoDayPriceIncreace: product.twoDayPriceIncreace,
                  image: req.file ? url + '/uploads/' + req.file.filename : req.body.imageURL || '',
                  maketavimoKaina: maketavimoKaina,
              }
              CartItem.create(cartItemObj, function (err, item) {
                if (err) {
                  deleteFile(req.file.filename);
                  res.send({ 
                    success: false, 
                    error: 'Klaida! Pabandykite vėliau.'
                  });
                } else {
                    res.send({ 
                        success: true, 
                        error: '',
                        message: 'Produktas pridėtas į krepšelį.',
                        item: item,
                    })
                }
              });
            } else {
              CartItem.findById(req.body.id, function (err, item) {
                if (!err){
                  var image = '';
                  if (req.file) {
                    deleteFile(item.image.substring(item.image.lastIndexOf('/') + 1));
                    image = url + '/uploads/' + req.file.filename;
                  } else {
                    image = item.image;
                  }
                  item.options = OptionsConstructor;
                  item.pastaba = req.body.pastaba;
                  item.quantity = Number(req.body.quantity);
                  // item.gamybosLaikas = req.body.gamybosLaikas;
                  item.image = image;
                  item.maketavimoKaina = maketavimoKaina;
                  item.save();
                  res.send({ 
                    success: true, 
                    error: '',
                    message: 'Produktas atnaujintas.',
                    item: item,
                  });
                } else {
                  res.send({ 
                    success: false, 
                    error: 'Klaida! Pabandykite vėliau.'
                  });
                }
              });
            }
          } else {
            deleteFile(req.file.filename);
            res.send({ 
              success: false, 
              error: 'Klaida! Pabandykite vėliau.'
            });
          }
        });
    } catch (error) {
      deleteFile(req.file.filename);
      res.send({ 
        success: false, 
        error: 'Klaida! Pabandykite vėliau.'
      });
    }
});

router.post("/signup", (req, res, next) => {

  if (!req.body.username && req.body.password) {
    res.statusCode = 500
    res.send({
      name: "RegisterError",
      message: "Atsiuskite tinkamus duomenis.",
    })
  } else {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      async (err, user) => {
        if (err) {
          var strategy = '';
          var message = '';
          User.findOne({ 'username': `${req.body.username}`}, 'authStrategy', function (err, person) {
            if (err) return handleError(err);
            strategy = person.authStrategy;
            if (strategy === "google") {
              message = "google"; //"Klaida! Vartotojas jau registruotas su Google.";
            } else if (strategy === 'facebook') {
              message = "facebook"; // "Klaida! Vartotojas jau registruotas su Facebook.";
            } else if (strategy === 'linkedIn') {
              message = "linkedIn"; // "Klaida! Vartotojas jau registruotas su LinkedIn.";
            }else {
              message = "local" // "Klaida! Toks El. Pašto adresas jau užregistruotas.";
            }
            res.statusCode = 405
            res.statusMessage = message;
            res.send();
          });
        } else {
          user.firstName = req.body.firstName || ""
          user.lastName = req.body.lastName || ""
          const token = getToken({ _id: user._id })
          const refreshToken = getRefreshToken({ _id: user._id })
          user.refreshToken.push({ refreshToken })
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500
              res.send(err)
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
              res.send({
                success: true, 
                personalas: user.personalas || user.administracija ? true : false, 
                username: user.username,
                moneySpent: user.moneySpent,
                token 
              })
            }
          })
        }
      }
    )
  }
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id })
  const refreshToken = getRefreshToken({ _id: req.user._id })
  User.findById(req.user._id).then(
    user => {
      user.refreshToken.push({ refreshToken })
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          res.send({ 
            success: true, 
            personalas: user.personalas || user.administracija ? true : false, 
            administracija: user.administracija,
            username: user.username,
            moneySpent: user.moneySpent,
            token 
          })
        }
      })
    },
    err => next(err)
  )
});

router.post("/refreshToken", (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id
      User.findOne({ _id: userId }).then(
        user => {
          if (user) {
            const tokenIndex = user.refreshToken.findIndex(
              item => item.refreshToken === refreshToken
            )
            if (tokenIndex === -1) {
              res.statusCode = 401
              res.send("Unauthorized")
            } else {
              const token = getToken({ _id: userId })
              const newRefreshToken = getRefreshToken({ _id: userId })
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500
                  res.send(err)
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                  res.send({ 
                    success: true, 
                    personalas: user.personalas, 
                    administracija: user.administracija,
                    username: user.username,
                    firstName: user.firstName,
                    moneySpent: user.moneySpent,
                    token 
                  })
                }
              })
            }
          } else {
            res.statusCode = 401
            res.send("Unauthorized")
          }
        },
        err => next(err)
      )
    } catch (err) {
      res.statusCode = 401
      res.send("Unauthorized")
    }
  } else {
    res.statusCode = 401
    res.send("Unauthorized")
  }
});

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user)
});

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  User.findById(req.user._id).then(
    user => {
      const tokenIndex = user.refreshToken.findIndex(
        item => item.refreshToken === refreshToken
      )
      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS)
          res.send({ success: true })
        }
      })
    },
    err => next(err)
  )
});

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })
    User.findById(req.user._id).then(
      user => {
        user.refreshToken.push({ refreshToken })
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500
            res.send(err)
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            res.send("Logged In!")
          }
        })
      },
      err => next(err)
    )
  // res.redirect('/');
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })
    User.findById(req.user._id).then(
      user => {
        user.refreshToken.push({ refreshToken })
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500
            res.send(err)
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            res.send("Logged In!")
          }
        })
      },
      err => next(err)
    )
  // res.redirect('/');
  }
);

router.get('/auth/linkedin', passport.authenticate('linkedin', { state: true }));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureFlash: 'PRAVALLL!!!!' }), 
  function(req, res) {
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })
    User.findById(req.user._id).then(
      user => {
        user.refreshToken.push({ refreshToken })
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500
            res.send(err)
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            res.send("Logged In!")
          }
        })
      },
      err => next(err)
    )
  // res.redirect('/');
  }
);

router.post("/sendhelp", (req, res, next) => {
  User.findOne({ 'username': `${req.body.email}`}, 'authStrategy', function (err, person) {
    if (!person) {
      res.json({error: true, message: 'Paskyra neegzistuoja.'});
    } else if (person.authStrategy !== 'local') {
      res.json({error: true, message: `${person.authStrategy}`});
    } else {
      const today = new Date().getTime();
      
      const payload = { 
        email: person.username,
        id: person._id,
        date: today
      };
      
      const secret = process.env.PASSWORD_RECOVERY_TOKEN_SECRET;

      const token = resetPwdHash.encode(payload, secret);

      const name = '';
      if (person.firstName) {
        name = person.firstName;
      } 
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
      const message = {
        from: process.env.EMAIL_FROM,
        to: `${req.body.email}`,
        subject: "Slaptažožio keitimo nuoroda.",
        html: ResetPswEmail(`${process.env.MAIN_URL}/resetpassword/${token}`),
      };
      transporter.sendMail(message, function(err) {
        if(!err) {
          res.json({error: false, message: 'success'});
        } else {
          res.json({error: true, message: 'error'});
        }
      })
    }
    err => next(err)
  });
});

router.post("/resetpassword", (req, res, next) => {
  if (!req.body.token && !req.body.password) {
    res.json({message: 'error'});
  }else {
    const data = jwt.decode(req.body.token, process.env.PASSWORD_RECOVERY_TOKEN_SECRET);
    if(!data){
      res.json({message: 'error'});
    } else if (!data.date || !data.id) {
      res.json({message: 'error'});
    } else {
      const date = new Date().getTime();
      if (date - data.date > 1000 * 60 * 20) {
        res.json( {message: 'expired'});
      } else {
        User.findById(data.id).then(
          user => {
            user.setPassword(req.body.password, function(err) {
              if (err) {
                res.json({message: 'error'});
              } else {
                user.save((err, user) => {
                  if (!err) {
                    res.json({message: 'success'});
                  } else {
                    res.json({message: 'error'});
                  }
                })
              }
            })
          },
          err => next(err)
        )
      }
    }
  }
});

router.post("/updateprofile", verifyUser, async (req, res, next) => {
  try {
    const user = await User.findOne({'username': `${req.body.username}`});
    if (req.body.firstName !== ""){
      user.firstName = req.body.firstName;
    } 
    if (req.body.lastName !== ""){
      user.lastName = req.body.lastName;
    } 
    if (req.body.phoneNumber !== ""){
      user.phoneNumber = req.body.phoneNumber;
    }
    await user.save();
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
});

router.post("/changepassword", verifyUser, async (req, res, next) => {
  try {
    const user = await User.findOne({'username': `${req.body.username}`});
    user.setPassword(req.body.password, function(err) {
      if (err) {
        res.json({
          success: false, 
          error: err
        });
      } else {
        user.save((err, user) => {
          if (!err) {
            res.json({
              success: true, 
              error: ''
            });
          } else {
            res.json({
              success: false, 
              error: err
            });
          }
        })
      }
    })
  } catch (error) {
    res.send({ 
      success: false, 
      error: error
    })
  }
});

router.post("/addaddress", verifyUser, async (req, res, next) => {
  try {
    if (req.body.id) {
      Address.findById(req.body.id, function (err, item) {
        if (err) {
          res.send({ 
            success: false, 
            error: err
          })
        } else {
          item.userId = req.user._id
          item.asmuo = req.body.asmuo
          item.city = req.body.city
          item.address = req.body.address
          item.zipCode = req.body.zipCode
          if (req.body.asmuo === 'Fizinis asmuo') {
            item.companyName = ''
            item.companyAddress = ''
            item.companyPVMCode = ''
            item.companyCode = ''
            item.budgetCompany = false
          } else {
            item.companyName = req.body.companyName
            item.companyAddress = req.body.companyAddress
            item.companyPVMCode = req.body.companyPVMCode
            item.companyCode = req.body.companyCode
            item.budgetCompany = req.body.budgetCompany
          }
          item.save(function (err) {
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
        }
      });
    } else {
      const address = new Address({ 
        userId: req.user._id,
        asmuo: req.body.asmuo,
        city: req.body.city,
        address: req.body.address,
        zipCode: req.body.zipCode,
        companyName: req.body.companyName,
        companyCode: req.body.companyCode,
        companyAddress: req.body.companyAddress,
        companyPVMCode: req.body.companyPVMCode,
        budgetCompany: req.body.budgetCompany,
      });
      address.save(function (err) {
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
    }
  } catch (error) {
    res.send({ 
      success: false, 
      error: error
    })
  }
});

router.get("/myAddresses", verifyUser, async (req, res, next) => {
  try {
    const addresses = await Address.find({userId: req.user._id});
    res.send({ 
      success: true, 
      addresses: addresses
    })
  } catch (error) {
    res.send({ 
      success: false, 
      error: error
    })
  }
});

router.post("/deleteAddress", verifyUser, async (req, res, next) => {
  try {
    Address.deleteOne({ userId: req.user._id, _id: req.body.addressId}, function (err) {
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
  } catch (error) {
    res.send({ 
      success: false, 
      error: error
    })
  }
});

router.get("/getLoyalty", async (req, res, next) => {
    try {
        const loyalty = await Loyalty.find({}).sort({ money: 'asc'});
        res.send({ 
          success: true, 
          data: loyalty
        })
    } catch (error) {
        res.send({ 
          success: false, 
          error: error
        })
    }
});

router.get("/getSettings", async (req, res, next) => {
  try {
      const settings = await Settings.findOne({}).exec();
      res.send({ 
        success: true, 
        maketavimoKaina: settings.maketavimoKaina
      })
  } catch (error) {
      res.send({ 
        success: false, 
        error: error
      })
  }
});

router.get("/getCarouselItems", async (req, res, next) => {
  try {
      const carousel = await Carousel.find({}).sort({ position: 'asc'});
      res.send({ 
        success: true, 
        data: carousel
      })
  } catch (error) {
      res.send({ 
        success: false, 
        error: error
      })
  }
});

router.get("/getProducts", async (req, res, next) => {
  try {
      const products = await Product.find({});
      res.send({ 
        success: true, 
        data: products
      })
  } catch (error) {
      res.send({ 
        success: false, 
        error: error
      })
  }
});

const ResetPswEmail = (link) => {
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
          <td style="overflow-wrap:break-word;word-break:break-word;padding:13px;font-family:arial,helvetica,sans-serif;" align="left">
              
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
          <td style="padding-right: 0px;padding-left: 0px;" align="left">
          <a href="https://www.treklama.lt" target="_blank">
          <img align="left" border="0" src="https://unroll-images-production.s3.amazonaws.com/projects/2/1637859766317-Treklama-01.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 55%;max-width: 260.7px;" width="260.7"/>
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
              
      <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Cabin, sans-serif; font-size: 18px; line-height: 25.2px;">Sveiki,</span></p>
      <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
      <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Cabin, sans-serif; font-size: 18px; line-height: 25.2px;">Atsiuntėme jūsų slaptažodžio keitimo nuorodą. Kad pakeistumėte slaptažodį spauskite <a href=${link}>čia.</a></span></p>
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

const ThanksEmail = () => {
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
          <td style="overflow-wrap:break-word;word-break:break-word;padding:13px;font-family:arial,helvetica,sans-serif;" align="left">
              
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
          <td style="padding-right: 0px;padding-left: 0px;" align="left">
          <a href="https://www.treklama.lt" target="_blank">
          <img align="left" border="0" src="https://unroll-images-production.s3.amazonaws.com/projects/2/1637859766317-Treklama-01.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 55%;max-width: 260.7px;" width="260.7"/>
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
              
      <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Cabin, sans-serif; font-size: 18px; line-height: 25.2px;">Sveiki,</span></p>
      <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
      <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Cabin, sans-serif; font-size: 18px; line-height: 25.2px;"><span style="line-height: 25.2px; font-size: 18px;">Ačiū, kad naudojatės mūsų paslaugomis! Gavome jūsų užsakymą ir pradėsime jį ruo&scaron;ti i&scaron; karto kai gausime apmokėjimą. </span></span></p>
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