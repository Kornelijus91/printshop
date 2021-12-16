import { makeStyles } from '@material-ui/core/styles';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter  as Router, Switch, Route, Link } from 'react-router-dom'; // Link
import { Snackbar, IconButton, Fade } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LoginRegisterModal from './components/loginModal/LoginRegisterModal.jsx';
import Navigation from './components/header/Navigation.jsx';
import Homepage from './components/pages/homepage/Homepage';
import PageNotFound from './components/pages/pageNotFound/PageNotFound';
import ResetPassword from './components/loginModal/ResetPassword';
import TermsOfService from './components/pages/terms/TermsOfService';
import PrivacyPolicy from './components/pages/privacy/PrivacyPolicy';
import Products from './components/pages/products/Products';
import ProductPage from './components/pages/products/ProductPage';
import Contact from './components/pages/contact/Contact';
import Footer from './components/footer/Footer';
import Profile from './components/pages/profile/Profile.jsx';
import Addresses from './components/pages/addresses/Addresses.jsx';
import Orders from './components/pages/orders/Orders.jsx';
import SearchPage from './components/pages/searchpage/SearchPage';
import CartPage from './components/pages/cart/CartPage';
import BuyRules from './components/pages/terms/BuyRules.jsx';
import Pristatymas from './components/pages/terms/Pristatymas.jsx';
import Grazinimas from './components/pages/terms/Grazinimas.jsx';
import Order from './components/pages/orders/Order.jsx';
import ReactGA from 'react-ga';

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
    [theme.breakpoints.up('xxl')]: {
      padding: '.5em'
    },
    [theme.breakpoints.up('xxxl')]: {
      padding: '1em'
    },
  },
}));

const App = () => {

  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState("");
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

  ReactGA.initialize('UA-209699426-1');
  ReactGA.pageview(window.location.pathname + window.location.search);

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
        setUsername(data.username);
        setFirstName(data.firstName);
        setMoneySpent(data.moneySpent);
        setLoggedIn(true);
        setPersonalas({
          personalas: data.personalas,
          administracija: data.administracija,
        });
        const timer = setTimeout(() => {
          verifyUser();
        }, 5 * 60 * 1000);
        return () => {
          clearTimeout(timer);
        };
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

  useEffect(() => {
      verifyUser();
  }, [verifyUser, oAuthWindow])

  useEffect(() => {
      if(products.length <= 0) {
        getProducts();
      }
      getLoyalty();
      getCart();
      getSettings();
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
    if (loyaltydiscount <= 0) {
        for (const item of cart) {
            prc = prc + item.price + item.maketavimoKaina;
            dscPrc = dscPrc + item.discountedPrice + item.maketavimoKaina;
        };
        setPriceSum({
          sum: roundTwoDec(prc),
          dscSum: roundTwoDec(dscPrc * ((100 - kodoNuolaida.nuolaida) / 100))
        });
    } else {
        for (const item of cart) {
            dscPrc = dscPrc + (item.price * ((100 - loyaltydiscount - item.discount) / 100)) + item.maketavimoKaina;
            prc = prc + item.price + item.maketavimoKaina;
        };
        setPriceSum({
          sum: roundTwoDec(prc),
          dscSum: roundTwoDec(dscPrc * ((100 - kodoNuolaida.nuolaida) / 100))
        });
    }
    // eslint-disable-next-line
  }, [cart, loyaltydiscount, kodoNuolaida]);

  useEffect(() => {
    const cookieConsent = JSON.parse(localStorage.getItem("cookieConsent"));
    if (cookieConsent === null || cookieConsent === false) {
      setCookieWarningOpen(true);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div style={{width: '100%'}}>
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
          loyaltydiscountLevel={loyaltydiscountLevel}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          // classes={{root: classes.cookieSnackbar}}
          ContentProps={{
            className: classes.cookieWarningSnackbar
          }}
          open={cookieWarningOpen}
          onClose={handleCookieWarningClose}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCookieWarningClose} classes={{root: classes.closeiconButton}}>
              <CloseIcon fontSize="small" className={classes.closeicon}/>
            </IconButton>
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
            <Homepage products={products} carousel={carousel} setCarousel={setCarousel} loyaltydiscount={loyaltydiscount}/>
          </Route>
          <Route exact path="/products">
            <Products products={products} loyaltydiscount={loyaltydiscount}/>
          </Route>
          <Route path="/products/:link/:cartItemID?">
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
            />
          </Route>
          <Route exact path="/contact">
            <Contact username={username}/>
          </Route>
          <Route path='/resetpassword/:token'>
            <ResetPassword />
          </Route>
          <Route exact path="/termsofservice">
            <TermsOfService />
          </Route>
          <Route exact path="/pristatymas">
            <Pristatymas />
          </Route>
          <Route exact path="/grazinimas">
            <Grazinimas />
          </Route>
          <Route exact path="/pirkimotaisykles">
            <BuyRules />
          </Route>
          <Route exact path="/privatumopolitika">
            <PrivacyPolicy />
          </Route>
          <Route exact path="/profile">
            <Profile token={token} username={username} loggedIn={loggedIn}/>
          </Route>
          <Route exact path="/addresses">
            <Addresses token={token} loggedIn={loggedIn} getAddresses={getAddresses} addresses={addresses}/>
          </Route>
          <Route exact path="/orders">
            <Orders token={token} loggedIn={loggedIn}/>
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
              loyaltydiscount={loyaltydiscount} 
              kodoNuolaida={kodoNuolaida}
              priceSum={priceSum}
              setCart={setCart}
              setKodoNuolaida={setKodoNuolaida}
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
              loyaltydiscount={loyaltydiscount} 
              setCart={setCart} 
              priceSum={priceSum}
              kodoNuolaida={kodoNuolaida}
              setKodoNuolaida={setKodoNuolaida}
            />
          </Route>
          <Route path='*'>
            <PageNotFound />
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
