import { Grid, Box, Hidden, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import '../../styles.css';
import SearchField from './SearchField.jsx';
import User from './User';
import Cart from './Cart';
import { FaBoxOpen, FaUser, FaHome, FaClipboardList, FaDoorOpen, FaSearch } from 'react-icons/fa';
import { BsFillChatDotsFill } from "react-icons/bs";
import Treklama01 from '../../media/Treklama01.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: ".4rem",
    margin: '0',
    backgroundColor: theme.myTheme.pirma,
    // boxShadow: '3px 3px 5px 6px #ccc'
  },
  grid: {
        textAlign: "center",
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: "center",
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            justifyContent: 'center', 
            alignItems: "center",
        },
  },
  gridItem: {
      padding: ".7rem"
  },
  link: {
    color: theme.myTheme.sriftoSpalva,
    fontFamily: theme.myTheme.sriftas,
    margin: '0 2rem 0 0',
    textDecoration: 'none',
    fontSize: '1.5rem',
    // fontWeight: 'bold',
    // backgroundColor: 'none',
    transition:'color .4s ease', 
    '&:hover': {
        color: '#2d5286',
    },
    [theme.breakpoints.up('xxl')]: {
        fontSize: '2.025rem',
        margin: '0 3rem 0 0',
    },
    [theme.breakpoints.up('xxxl')]: {
        fontSize: '3rem',
        margin: '0 4rem 0 0',
    },
  },
  drawerlnk: {
    color: theme.myTheme.sriftoSpalva,
    fontFamily: theme.myTheme.sriftas,
    textDecoration: 'none',
    fontSize: '1.2rem',
    padding: '.5rem .7rem .5rem 0rem',
    overflowWrap: 'break-word',
  },
  icon: {
    color: theme.myTheme.sriftoSpalva,
    '&:hover': {
        cursor: 'pointer',
    },
  },
  list: {
    width: 250,
    height: '100%',
    backgroundColor: theme.myTheme.pirma,
  },
  drawer: {
    backgroundColor: theme.myTheme.pirma,
  },
  divider: {
    background: 'rgba(29, 53, 87, 0.3)',
    marginTop: '.5rem'
  },
  logoBox: {
    width: '100%',
  },
  mainLogo: {
    width: '100%', 
    objectFit: 'contain',
    padding: '.2rem 0',
    [theme.breakpoints.up('lg')]: {
        width: '70%', 
    },
    [theme.breakpoints.up('xl')]: {
        width: '65%', 
    },
    [theme.breakpoints.up('xxl')]: {
        margin: '1rem' 
    },
    [theme.breakpoints.up('xxxl')]: {
        margin: '2rem' 
    },
  },
  drawerLogo: {
    width: '90%',
    marginTop: '.5rem',
    objectFit: 'contain'
  },
  drawerLogoLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mobilemenuIconBox: {
    width: '100%',
    paddingRight: '.5rem',
  },
}));

const Navigation = ({ priceSum, loyaltydiscount, cart, firstName, setSearchResult, setSearchValue, searchResult, handlesearchValueChange, searchValue, setModalOpen, loggedIn, setLoggedIn, token, setToken, username, setMoneySpent }) => {

    const classes = useStyles();
    const [drawer, setDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleUserOpen = (event) => {
        if (loggedIn) {
            setAnchorEl(event.currentTarget);
            setMenuOpen(true); 
        } else {
            setModalOpen(true);
        }
    };

    const handleUserClose = () => {
        setAnchorEl(null);
        setMenuOpen(false); 
    };

    const handleLogout = () => {
        fetch("/users/logout/", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "authorization": `JWT ${token}`,
          },
        }).then(async response => {
            setToken(null);
            window.localStorage.setItem("logout", Date.now())
            setLoggedIn(false);
            setMoneySpent(0);
        })
        setAnchorEl(null);
        setMenuOpen(false); 
    };

    return (
        <Box maxWidth='xl' classes={{root: classes.root}}>
            <Grid container className={classes.grid} >
                <Grid item xl={3} lg={4} md={4} sm={4} xs={6}>
                    <Box display='flex' justifyContent="center" alignItems="center" classes={{root: classes.logoBox}}>
                        <Link to="/"><img src={Treklama01} alt='Tavo reklama' className={classes.mainLogo}/></Link>
                    </Box>
                </Grid>
                <Grid item xl={5} lg={5} md={false} sm={false} xs={false}>
                    <Hidden mdDown implementation="css">
                        <Box display='flex' justifyContent='flex-start' alignItems="center">
                            <Link to="/products" className={classes.link}>Produktai</Link>
                            <Link to="/contact" className={classes.link}>Susisiekite</Link>
                        </Box>
                    </Hidden>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={5} xs={4} >
                    <Hidden mdDown implementation="css">
                        <Grid container className={classes.grid} justifyContent='flex-end'>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.gridItem} >
                                <SearchField setSearchResult={setSearchResult} setSearchValue={setSearchValue} searchValue={searchValue} handlesearchValueChange={handlesearchValueChange} searchResult={searchResult}/>
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} className={classes.gridItem}>
                                <Box justifyContent="flex-end" display='flex' alignItems="flex-end" style={{paddingRight: '.5rem'}}>   
                                    <Cart 
                                        priceSum={priceSum}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} className={classes.gridItem}>
                                <Box justifyContent="flex-end" display='flex' alignItems="flex-end" style={{paddingRight: '.5rem'}}>
                                    <User 
                                        setModalOpen={setModalOpen} 
                                        loggedIn={loggedIn} 
                                        setLoggedIn={setLoggedIn} 
                                        token={token} 
                                        setToken={setToken} 
                                        username={username} 
                                        handleUserOpen={handleUserOpen}
                                        handleUserClose={handleUserClose}
                                        anchorEl={anchorEl}
                                        menuOpen={menuOpen}
                                        handleLogout={handleLogout}
                                        firstName={firstName}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Hidden>
                    <Hidden lgUp implementation="css">
                        <Box classes={{root: classes.mobilemenuIconBox}} display='flex' justifyContent="flex-end" alignItems="center">  
                            <AiOutlineMenu size={24} className={classes.icon} onClick={() => setDrawer(true)}/>
                        </Box>
                    </Hidden>
                </Grid>  
            </Grid>
            <Hidden mdDown implementation="css">
                <Drawer anchor={'left'} open={drawer} onClose={() => setDrawer(false)} >
                    <div
                        className={classes.list}
                        role="presentation"
                        onClick={() => setDrawer(false)}
                        onKeyDown={() => setDrawer(false)}
                    >
                        <Box display='flex' justifyContent="center" alignItems="center">
                            <Link to="/" className={classes.drawerLogoLink}><img src={Treklama01} alt='Tavo reklama' className={classes.drawerLogo}/></Link>
                        </Box>
                        <Divider className={classes.divider} />
                        <List classes={{root: classes.drawer}}>
                            {!loggedIn ?
                                <ListItem button onClick={handleUserOpen} style={{marginBottom: '.5rem', marginTop: '.5rem', paddingBottom: '0', paddingTop: '0'}}>
                                    <ListItemIcon style={{marginBottom: '0', marginTop: '0', paddingBottom: '0', paddingTop: '0'}}><FaUser size={24} className={classes.icon} /></ListItemIcon>
                                    <ListItemText classes={{root:classes.drawerlnk}} disableTypography={true} style={{marginBottom: '0', marginTop: '0', paddingBottom: '0', paddingTop: '0'}}>Prisijungti / Registruotis</ListItemText>
                                </ListItem>
                            : 
                                <>
                                    <ListItem button >
                                        <ListItemIcon><FaUser size={24} className={classes.icon} /></ListItemIcon>
                                        <Link to="/profile" className={classes.drawerlnk}>Profilis</Link>
                                    </ListItem>
                                    <ListItem button >
                                        <ListItemIcon><FaHome size={24} className={classes.icon} /></ListItemIcon>
                                        <Link to="/addresses" className={classes.drawerlnk}>Adresai</Link>
                                    </ListItem>
                                    <ListItem button >
                                        <ListItemIcon><FaClipboardList size={24} className={classes.icon} /></ListItemIcon>
                                        <Link to="/orders" className={classes.drawerlnk}>Užsakymai</Link>
                                    </ListItem>
                                    <ListItem button onClick={handleLogout}>
                                        <ListItemIcon><FaDoorOpen size={24} className={classes.icon} /></ListItemIcon>
                                        <ListItemText classes={{root:classes.drawerlnk}} disableTypography={true}>Atsijungti</ListItemText>
                                    </ListItem>
                                    <Divider className={classes.divider} />
                                </>
                            }
                            <ListItem button>
                                <ListItemIcon><FaBoxOpen size={24} className={classes.icon} /></ListItemIcon>
                                <Link to="/products" className={classes.drawerlnk}>Produktai</Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><BsFillChatDotsFill size={24} className={classes.icon} /></ListItemIcon>
                                <Link to="/contact" className={classes.drawerlnk}>Susisiekite</Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><FaSearch size={24} className={classes.icon} /></ListItemIcon>
                                <Link to="/searchpage" className={classes.drawerlnk}>Paieška</Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><Cart priceSum={priceSum}/></ListItemIcon>
                                <Link to="/cart" className={classes.drawerlnk}>Krepšelis</Link>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </Hidden>
        </Box>
    )
}

export default Navigation
