import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { BrowserRouter  as Router, Switch, Route, Link } from 'react-router-dom'; // Link
import { Snackbar, Button, Fade, Box, CircularProgress } from '@material-ui/core';
import LoginRegisterModal from './components/loginModal/LoginRegisterModal.jsx';
import Navigation from './components/header/Navigation.jsx';
import Homepage from './components/pages/homepage/Homepage';
import ResetPassword from './components/loginModal/ResetPassword';
import Products from './components/pages/products/Products';
import ProductPage from './components/pages/products/ProductPage';
import Footer from './components/footer/Footer';
import Orders from './components/pages/orders/Orders.jsx';
import SearchPage from './components/pages/searchpage/SearchPage';
import CartPage from './components/pages/cart/CartPage';
import Order from './components/pages/orders/Order.jsx';
import ReactGA from 'react-ga';
import Profile from './components/pages/profile/Profile.jsx';
import Addresses from './components/pages/addresses/Addresses.jsx';
import Trklubas from './components/pages/trklubas/Trklubas.jsx';
import Chat from './components/pages/customerchat/Chat';
import Wrapper from './components/pages/utils/Wrapper.jsx';
// import ComingSoon from './components/ComingSoon'
// import { io } from "socket.io-client";
import {SocketContext, socket} from './socket.js';

const BuyRules = React.lazy(() => import('./components/pages/terms/BuyRules.jsx'));
const PrivacyPolicy = React.lazy(() => import('./components/pages/privacy/PrivacyPolicy'));
const PageNotFound = React.lazy(() => import('./components/pages/pageNotFound/PageNotFound'));
const TermsOfService = React.lazy(() => import('./components/pages/terms/TermsOfService'));
const Contact = React.lazy(() => import('./components/pages/contact/Contact'));
const Pristatymas = React.lazy(() => import('./components/pages/terms/Pristatymas.jsx'));
const Grazinimas = React.lazy(() => import('./components/pages/terms/Grazinimas.jsx'));
const Apmokejimas = React.lazy(() => import('./components/pages/terms/Apmokejimas.jsx'));
const PaymentFailed = React.lazy(() => import('./components/pages/nepavykesmokejimas/PaymentFailed.jsx'));

const useStyles = makeStyles((theme) => ({
  cookieWarningSnackbar: {
    color: theme.myTheme.sriftoSpalva,
    fontFamily: theme.myTheme.sriftas,
    backgroundColor: theme.myTheme.trecia,
    maxWidth: '18em',
    overflowWrap: 'break-word',
    '& p' :{
      margin: 0,
      padding: 0
    },
    [theme.breakpoints.up('xxl')]: {
      fontSize: '1.2rem',
      maxWidth: '24.5em',
    },
    [theme.breakpoints.up('xxxl')]: {
      fontSize: '1.8rem',
      // maxWidth: '36em',
      borderRadius: '9px',
    },
  },
  closeicon: {
    [theme.breakpoints.up('xxl')]: {
      transform: 'scale(1.35)'
    },
    [theme.breakpoints.up('xxxl')]: {
      transform: 'scale(2)'
    },
  },
  closeiconButton: {
    backgroundColor: 'transparent',
    color: '#4075bf',
    [theme.breakpoints.up('xxl')]: {
      padding: '.5em',
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('xxxl')]: {
      padding: '1em',
      fontSize: '1.8rem',
    },
  },
  lazyFallback: {
    backgroundColor: theme.myTheme.trecia,
    width: '100%',
    minHeight: '85vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lazyFallbackIcon: {
    color: theme.myTheme.sriftoSpalva,
    [theme.breakpoints.up('xxl')]: {
      transform: 'scale(1.35)'
    },
    [theme.breakpoints.up('xxxl')]: {
      transform: 'scale(2)'
    },
  },
}));

const App = () => {

  const classes = useStyles();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [personalas, setPersonalas] = useState({
    personalas: false,
    administracija: false
  });
  const [loyalty, setLoyalty] = useState([]);
  const [maketavimoKaina, setMaketavimoKaina] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [moneySpent, setMoneySpent] = useState(0);
  const [oAuthWindow, setOAuthWindow] = useState(false);
  const [modalView, setmodalView] = useState("Prisijungti");
  const [products, setProducts] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [cart, setCart] = useState([]);
  const [loyaltydiscount, setLoyaltydiscount] = useState(0);
  const [loyaltydiscountLevel, setLoyaltydiscountLevel] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [priceSum, setPriceSum] = useState({
    sum: 0,
    dscSum: 0
  });
  const [kodoNuolaida, setKodoNuolaida] = useState({
    kodas: '',
    nuolaida: 0
  });
  const [delivery, setDelivery] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    zipcode: '',
    juridinis: false,
    companyName: '',
    companyCode: '',
    companyAddress: '',
    companyPVM: '',
    // budget: false,
    pastabaKurjeriui: '',
  });
  const [cookieWarningOpen, setCookieWarningOpen] = useState(false);
  const [gamybosLaikas, setGamybosLaikas] = useState({
    fivedays: false,
    twodays: false,
    oneday: false,
  });
  const [pasirinktasGamybosLaikas, setPasirinktasGamybosLaikas] = useState('3-5 darbo dienos.');
  const [pasirinktasPristatymoBudas, setPasirinktasPristatymoBudas] = useState('Kurjeriu, nurodytu adresu.');

  // const socket = io('/');

  const lazyFallback = <Box classes={{root: classes.lazyFallback}}><CircularProgress size={30} className={classes.lazyFallbackIcon} /></Box>;

  const roundTwoDec = (num) => { 
    const result = Math.round(Number((Math.abs(num) * 100).toPrecision(15))) / 100 * Math.sign(num);
    return result;
  };

  const getCart = async () => {
    var items = JSON.parse(localStorage.getItem("cartArray"));
    if (items !== null && items.length > 0) {
      var cartItemIdArray = [];
      for (const itm of items) {
        cartItemIdArray.push(itm._id);
      }
      try {
        const res = await fetch("/users/getCart/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // "authorization": `JWT ${user.token}`,
            },
            body: JSON.stringify({
                cartItemIDS: cartItemIdArray,
            }),
        });
        const response = await res.json();
        if (response.data.length > 0) {
          setCart(response.data);
        } else {
          localStorage.removeItem("cartArray");;
        }
      } catch (error) {
        
      }
    }
    // console.log('GET CART FUNC ITEMS => ', items);
  };

  const handlesearchValueChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== '') {
      var tempSearchResultArray = [];
      for (const item of products) {
        if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          tempSearchResultArray.push(item);
        };
      };
      setSearchResult(tempSearchResultArray);
    } else {
      setSearchResult([]);
    }
  };

  // const classes = useStyles();

  const getProducts = async () => {
    try {
        const res = await fetch("/users/getProducts/", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // "authorization": `JWT ${user.token}`,
            },
        });
        const response = await res.json();
        if (response.success) {
          setProducts(response.data);   
        } 
    } catch (error) {
        // console.log('Klaida gaunant produktus!');
    }
  };

  const getLoyalty = async () => {
    try {
        const res = await fetch("/users/getLoyalty/", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // "authorization": `JWT ${user.token}`,
            },
        });
        const response = await res.json();
        if (response.success) {
          setLoyalty(response.data);   
        } 
    } catch (error) {
        // console.log('Klaida gaunant Tavo reklama klubo lygius!');
    }
  };

  const getSettings = async () => {
    try {
        const getSettingsRequest = await fetch("/users/getSettings/", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const getSettingsResponse= await getSettingsRequest.json();
        if (getSettingsResponse.success) {
            setMaketavimoKaina(getSettingsResponse.maketavimoKaina);
        } 
    } catch (error) {
        
    }
  };

  const getAddresses = async () => {
    if (loggedIn) {
      try{
          const addressesFetch = await fetch("/users/myAddresses/", {
              credentials: "include",
              headers: {
                  "Content-Type": "application/json",
                  "authorization": `JWT ${token}`,
              },
          });
          const addressesResponse = await addressesFetch.json();
          setAddresses(addressesResponse.addresses);
      } catch (error) {

      } 
    };
  };

  const verifyUser = useCallback(() => {
    fetch("/users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setToken(data.token);
        setUserid(data.userid);
        setUsername(data.username);
        setFirstName(data.firstName);
        setMoneySpent(data.moneySpent);
        setLoggedIn(true);
        setPersonalas({
          personalas: data.personalas,
          administracija: data.administracija,
        });
        // const timer = setTimeout(() => {
        //   verifyUser();
        // }, 5 * 60 * 1000);
        // return () => {
        //   clearTimeout(timer);
        // };
      } else {
        setToken(null);
        setLoggedIn(false);
      }
    })
  },[]);

  const handleCookieWarningClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    window.localStorage.setItem("cookieConsent", true)
    setCookieWarningOpen(false);
  };

  const findMaxDiscount = (unitDscnt) => {
    const maxDiscount = Math.max(kodoNuolaida.nuolaida, unitDscnt, loyaltydiscount);
    if (maxDiscount === kodoNuolaida.nuolaida) {
        return [`Nuolaida su kodu ${kodoNuolaida.kodas}`, kodoNuolaida.nuolaida];
    } else if (maxDiscount === loyaltydiscount) {
        return ['Tavo Reklama klubo nuolaida', loyaltydiscount];
    } else if (maxDiscount === unitDscnt) {
        return ['Nuolaida', unitDscnt];
    } else {
        return ['', 0];
    }
  };

  const getItemProductionCost = (onedayProdCost, twodayProdCost) => {
    var productionCost = 1;
    if (pasirinktasGamybosLaikas === '1-2 darbo dienos.') {
      productionCost = 1 + (twodayProdCost / 100);
    } else if (pasirinktasGamybosLaikas === 'Iki 24H.') {
      productionCost = 1 + (onedayProdCost / 100);
    } 
    return productionCost;
  };


  useEffect(() => {
      verifyUser();
      // eslint-disable-next-line
  }, [oAuthWindow])  //verifyUser, 

  useEffect(() => {
      const cookieConsent = JSON.parse(localStorage.getItem("cookieConsent"));
      if (cookieConsent === null || cookieConsent === false) {
        setCookieWarningOpen(true);
      }
      if(products.length <= 0) {
        getProducts();
      }
      getLoyalty();
      getCart();
      getSettings();
      ReactGA.initialize('UA-215960228-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
      // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (loyalty.length > 0 && moneySpent > 0) {
        var lvl = 0;
        for (const item of loyalty) {
            if (item.money <= moneySpent) {
                setLoyaltydiscount(item.discount);
                lvl = lvl + 1;
            } else {
                break;
            }
        }
        setLoyaltydiscountLevel(lvl);
    } else {
        setLoyaltydiscount(0);
        setLoyaltydiscountLevel(0);
    }
    // eslint-disable-next-line
  }, [loyalty, moneySpent]);

  useEffect(() => {
    var prc = 0;
    var dscPrc = 0;
    for (const item of cart) {
      var productionCost = 1;
      if (pasirinktasGamybosLaikas === '1-2 darbo dienos.') {
        productionCost = 1 + (item.twoDayPriceIncreace / 100);
      } else if (pasirinktasGamybosLaikas === 'Iki 24H.') {
        productionCost = 1 + (item.oneDayPriceIncreace / 100);
      } 
      prc = prc + roundTwoDec(item.price * productionCost + item.maketavimoKaina);
      dscPrc = dscPrc + roundTwoDec((item.price * productionCost * (1 - (findMaxDiscount(item.discount)[1] / 100))) + item.maketavimoKaina);
    };
    setPriceSum({
      sum: roundTwoDec(prc),
      dscSum: roundTwoDec(dscPrc)
    });
    // eslint-disable-next-line
  }, [cart, loyaltydiscount, kodoNuolaida, pasirinktasGamybosLaikas]);

  useEffect(() => {
    if (cart.length <= 0) {
      setKodoNuolaida({
          kodas: '',
          nuolaida: 0
      });
    }
    // eslint-disable-next-line
  }, [cart]);

  return (
    <div style={{
      width: '100%',
      maxWidth: '3840px',
      margin: '0 auto',
      backgroundColor: '#dddfd4',
    }}>
      <Router>
        <LoginRegisterModal 
          value={modalView}
          setValue={setmodalView}
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          setToken={setToken} 
          setLoggedIn={setLoggedIn} 
          setOAuthWindow={setOAuthWindow} 
          oAuthWindow={oAuthWindow}
          setUsername={setUsername}
          setMoneySpent={setMoneySpent}
        />
        {/* <ComingSoon/> */}
        <Navigation 
          setModalOpen={setModalOpen} 
          loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn} 
          token={token} 
          setToken={setToken} 
          username={username} 
          firstName={firstName}
          setMoneySpent={setMoneySpent}
          searchValue={searchValue}
          handlesearchValueChange={handlesearchValueChange}
          searchResult={searchResult}
          setSearchValue={setSearchValue}
          setSearchResult={setSearchResult}
          personalas={personalas}
          setPersonalas={setPersonalas}
          priceSum={priceSum}
          // loyaltydiscountLevel={loyaltydiscountLevel}
        />
        <SocketContext.Provider value={socket}>
          <Chat 
            // socket={socket}
            username={username} 
            firstName={firstName}
          />
        </SocketContext.Provider>
        
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          ContentProps={{
            className: classes.cookieWarningSnackbar
          }}
          open={cookieWarningOpen}
          onClose={handleCookieWarningClose}
          action={
            <Button size="small" aria-label="close" color="inherit" onClick={handleCookieWarningClose} classes={{root: classes.closeiconButton}}>
              Supratau
            </Button>
          }
          message={
            <p>
              Sklandžiam svetainės veikimui, jūsų naršymo patirties gerinimui ir rinkodarai treklama.lt naudoja slapukus. 
              Naršydami toliau, sutinkate su mūsų <Link to="/privatumopolitika" onClick={() => window.scrollTo({top: 0, left: 0})}>privatumo politika.</Link>
            </p>
          }
          TransitionComponent={Fade}
        />
          
        <Switch>
          <Route exact path="/">
            <Homepage products={products} carousel={carousel} setCarousel={setCarousel}/>
          </Route>
          <Route exact path="/products">
            <Wrapper>
              <Products products={products} loyaltydiscount={loyaltydiscount}/>
            </Wrapper>
          </Route>
          <Route path="/products/:link/:cartItemID?">
            <Wrapper>
              <ProductPage 
                products={products} 
                getCart={getCart}
                loyaltydiscount={loyaltydiscount}
                cart={cart}
                roundTwoDec={roundTwoDec}
                maketavimoKaina={maketavimoKaina}
                firstName={firstName}
                personalas={personalas}
                token={token}
                kodoNuolaida={kodoNuolaida}
                findMaxDiscount={findMaxDiscount}
                userid={userid}
              />
            </Wrapper>
          </Route>
          <Route exact path="/kontaktai">
            <Suspense fallback={lazyFallback}>
              <Contact />
            </Suspense>
          </Route>
          <Route path='/resetpassword/:token'>
            <ResetPassword />
          </Route>
          <Route exact path="/termsofservice">
            <Suspense fallback={lazyFallback}>
              <TermsOfService />
            </Suspense>
          </Route>
          <Route exact path="/pristatymas">
            <Suspense fallback={lazyFallback}>
              <Pristatymas />
            </Suspense>
          </Route>
          <Route exact path="/grazinimas">
            <Suspense fallback={lazyFallback}>
              <Grazinimas />
            </Suspense>
          </Route>
          <Route exact path="/pirkimotaisykles">
            <Suspense fallback={lazyFallback}>
              <BuyRules />
            </Suspense>
          </Route>
          <Route exact path="/privatumopolitika">
            <Suspense fallback={lazyFallback}>
              <PrivacyPolicy />
            </Suspense>
          </Route>
          <Route exact path="/klubas">
            <Trklubas loyalty={loyalty} loyaltydiscount={loyaltydiscount}/>
          </Route>
          <Route exact path="/profile">
            <Profile token={token} username={username} loggedIn={loggedIn} loyaltydiscount={loyaltydiscount} loyaltydiscountLevel={loyaltydiscountLevel}/>
          </Route>
          <Route exact path="/addresses">
            <Addresses token={token} loggedIn={loggedIn} getAddresses={getAddresses} addresses={addresses}/>
          </Route>
          <Route exact path="/orders">
            <Orders token={token} loggedIn={loggedIn}/>
          </Route>
          <Route exact path="/mokejimobudai">
            <Suspense fallback={lazyFallback}>
              <Apmokejimas />
            </Suspense>
          </Route>
          <Route exact path="/apmokejimoklaida">
            <Suspense fallback={lazyFallback}>
              <PaymentFailed />
            </Suspense>
          </Route>
          <Route exact path="/order">
            <Order 
              delivery={delivery} 
              setDelivery={setDelivery} 
              loggedIn={loggedIn} 
              token={token} 
              getAddresses={getAddresses} 
              addresses={addresses}
              cart={cart}
              kodoNuolaida={kodoNuolaida}
              priceSum={priceSum}
              setCart={setCart}
              setKodoNuolaida={setKodoNuolaida}
              pasirinktasGamybosLaikas={pasirinktasGamybosLaikas}
              findMaxDiscount={findMaxDiscount}
              getItemProductionCost={getItemProductionCost}
              roundTwoDec={roundTwoDec}
              pasirinktasPristatymoBudas={pasirinktasPristatymoBudas}
              setPasirinktasPristatymoBudas={setPasirinktasPristatymoBudas}
            />
          </Route>
          <Route exact path="/searchpage">
            <SearchPage 
              searchValue={searchValue} 
              handlesearchValueChange={handlesearchValueChange} 
              searchResult={searchResult} 
              setSearchValue={setSearchValue}
              setSearchResult={setSearchResult}
            />
          </Route>
          <Route exact path="/cart">
            <CartPage
              cart={cart} 
              getCart={getCart} 
              // loyaltydiscount={loyaltydiscount} 
              setCart={setCart} 
              priceSum={priceSum}
              kodoNuolaida={kodoNuolaida}
              setKodoNuolaida={setKodoNuolaida}
              findMaxDiscount={findMaxDiscount}
              gamybosLaikas={gamybosLaikas}
              setGamybosLaikas={setGamybosLaikas}
              pasirinktasGamybosLaikas={pasirinktasGamybosLaikas}
              setPasirinktasGamybosLaikas={setPasirinktasGamybosLaikas}
              roundTwoDec={roundTwoDec}
              getItemProductionCost={getItemProductionCost}
              pasirinktasPristatymoBudas={pasirinktasPristatymoBudas}
              setPasirinktasPristatymoBudas={setPasirinktasPristatymoBudas}
            />
          </Route>
          <Route path='*'>
            <Suspense fallback={lazyFallback}>
              <PageNotFound />
            </Suspense>
          </Route>
        </Switch>
        <Footer setmodalView={setmodalView} setModalOpen={setModalOpen} loggedIn={loggedIn} />
        {/* <Link to="/">Home</Link><br />
        <Link to="/resetpassword">Reset Password</Link><br /> */}
      </Router>
    </div>
  )
}

export default App
