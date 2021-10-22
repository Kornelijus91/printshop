// import { makeStyles } from '@material-ui/core/styles';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter  as Router, Switch, Route } from 'react-router-dom'; // Link
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

// const useStyles = makeStyles({
  
// });

const App = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [oAuthWindow, setOAuthWindow] = useState(false);
  const [modalView, setmodalView] = useState("Prisijungti");
  const [products, setProducts] = useState([]);
  const [carousel, setCarousel] = useState([]);

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
        console.log('Klaida gaunant produktus!');
    }
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
        setLoggedIn(true);
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
  },[])

  useEffect(() => {
      verifyUser();
  }, [verifyUser, oAuthWindow])

  useEffect(() => {
      if(products.length <= 0) {
        getProducts();
      }
      // eslint-disable-next-line
  }, [])

  return (
    <>
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
        />
        <Navigation 
          setModalOpen={setModalOpen} 
          loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn} 
          token={token} 
          setToken={setToken} 
          username={username} 
        />
        <Switch>
          <Route exact path="/">
            <Homepage products={products} carousel={carousel} setCarousel={setCarousel}/>
          </Route>
          <Route exact path="/products">
            <Products products={products}/>
          </Route>
          <Route exact path="/products/:link">
            <ProductPage products={products}/>
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route path='/resetpassword/:token'>
            <ResetPassword />
          </Route>
          <Route exact path="/termsofservice">
            <TermsOfService />
          </Route>
          <Route exact path="/privacypolicy">
            <PrivacyPolicy />
          </Route>
          <Route exact path="/profile">
            <Profile token={token} username={username} loggedIn={loggedIn}/>
          </Route>
          <Route exact path="/addresses">
            <Addresses token={token} loggedIn={loggedIn}/>
          </Route>
          <Route exact path="/orders">
            <Orders />
          </Route>
          <Route exact path="/searchpage">
            <SearchPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        <Footer setmodalView={setmodalView} setModalOpen={setModalOpen}/>
        {/* <Link to="/">Home</Link><br />
        <Link to="/resetpassword">Reset Password</Link><br /> */}
      </Router>
    </>
  )
}

export default App
