const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Address = require("../models/address")
const Product = require("../models/products")
const Loyalty = require("../models/loyalty")
const Carousel = require("../models/carousel")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const resetPwdHash = require("jwt-simple")
const nodemailer = require('nodemailer');
const multer = require('multer');

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
})  //.single("myImage");

router.post("/addToCart", verifyUser, upload.single("image"), (req, res, next) => {
  console.log('UER => ', req.user);
  res.send(req.user)
  // const url = req.protocol + '://' + req.get('host');
  // try {
  //     var carouselObj = {
  //         title: req.body.title,
  //         bluetext: req.body.bluetext,
  //         redtext: req.body.redtext,
  //         productLink: req.body.productLink,
  //         borderRadius: req.body.borderRadius,
  //         size: req.body.size,
  //         animation: req.body.animation,
  //         position: req.body.position,
  //         imageURL: url + '/uploads/' + req.file.filename,
  //     }
  //     const newCarousel = new Carousel(carouselObj);
  //     newCarousel.save(function (err) {
  //         if (err) {
  //             res.send({ 
  //                 success: false, 
  //                 error: 'error'
  //             })
  //         } else {
  //             res.send({ 
  //                 success: true, 
  //                 error: '',
  //                 message: 'Karuselės elementas pridėtas.'
  //             })
  //         }
  //     });
  // } catch (error) {
  //     res.send({ 
  //         success: false, 
  //         error: 'error'
  //     })
  // }
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
})

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
})

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
                    personalas: user.personalas || user.administracija ? true : false, 
                    administracija: user.administracija,
                    username: user.username,
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
})

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user)
})

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  User.findById(req.user._id).then(
    user => {
      const tokenIndex = user.refreshToken.findIndex(
        item => item.refreshToken === refreshToken
      )
      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
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
})

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
        secure: false, 
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const message = {
        from: process.env.EMAIL_FROM,
        to: `${req.body.email}`,
        subject: "Slaptažožio keitimo nuoroda.",
        // 
        html: `<p>Labas, ${name}</p>
              <p>Atsiuntėme tavo slaptažodžio keitimo nuorodą. Kad pakeistum slaptažodį spausk <a href=${process.env.MAIN_URL}/resetpassword/${token}>čia.</a></p>
              <p>Nuoroda galioja 20 minučių.</p>
              <p>Artis spausdin komanda :D</p>`
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
})

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
})

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
})

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
})

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
})

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
})

module.exports = router