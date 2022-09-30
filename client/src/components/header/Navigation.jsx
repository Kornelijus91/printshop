import { Grid, Box, Hidden, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'; //Divider
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
import Treklama01 from '../../media/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.myTheme.sizeXXS, 
    margin: '0',
    backgroundColor: theme.myTheme.juoda,
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
      padding: theme.myTheme.sizeXS, 
  },
  link: {
    color: theme.myTheme.balta,
    fontFamily: theme.myTheme.sriftas,
    textDecoration: 'none',
    fontSize: theme.myTheme.sizeMM, 
    transition:'color .4s ease', 
    '&:hover': {
        color: theme.myTheme.sZalia.main,
    },
  },
  menuDivider: {
    width: theme.myTheme.sizeXXXS, 
    height: theme.myTheme.sizeL, 
    backgroundColor: theme.myTheme.sZalia.main,
    borderRadius: theme.myTheme.sizeBorderRadiusSmall, 
    margin: `0 ${theme.myTheme.sizeXXL}`,
  },
  drawerlnk: {
    color: theme.myTheme.balta,
    fontFamily: theme.myTheme.sriftas,
    textDecoration: 'none',
    fontSize: theme.myTheme.sizeMM, 
    padding: `${theme.myTheme.sizeXXS}, ${theme.myTheme.sizeXS}, ${theme.myTheme.sizeXXS}, 0`, 
    overflowWrap: 'break-word',
  },
  icon: {
    color: theme.myTheme.balta,
    '&:hover': {
        cursor: 'pointer',
    },
  },
  list: {
    width: 250,
    height: '100%',
    backgroundColor: theme.myTheme.juoda,
  },
  drawer: {
    backgroundColor: theme.myTheme.juoda,
  },
//   divider: {
//     background: theme.myTheme.balta,
//     marginTop: theme.myTheme.sizeXS,
//   },
  logoBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  mainLogo: {
    width: '70%', 
    objectFit: 'contain',
    [theme.breakpoints.up('xl')]: {
        width: '55%', 
    },
  },
  logoLink: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  drawerLogo: {
    width: '90%',
    marginTop: theme.myTheme.sizeXXS,
    objectFit: 'contain'
  },
  drawerLogoLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.myTheme.sizeM,
  },
  mobilemenuIconBox: {
    width: '100%',
    paddingRight: theme.myTheme.sizeXXS,
  },

}));

const Navigation = ({ priceSum, personalas, setPersonalas, firstName, setSearchResult, setSearchValue, searchResult, handlesearchValueChange, searchValue, setModalOpen, loggedIn, setLoggedIn, token, setToken, username, setMoneySpent }) => { //loyaltydiscountLevel, 

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
            setPersonalas({
                personalas: false,
                administracija: false
            });
            setLoggedIn(false);
            setMoneySpent(0);
        })
        setAnchorEl(null);
        setMenuOpen(false); 
    };

    return (
        <Box classes={{root: classes.root}}>
            <Grid container className={classes.grid} >
                <Grid item xl={3} lg={4} md={4} sm={4} xs={6}>
                    <Box classes={{root: classes.logoBox}}>
                        <Link to="/" className={classes.logoLink}><img src={Treklama01} alt='Tavo reklama' className={classes.mainLogo}/></Link>
                    </Box>
                </Grid>
                <Grid item xl={5} lg={5} md={false} sm={false} xs={false}>
                    <Hidden mdDown implementation="css">
                        <Box display='flex' justifyContent='flex-start' alignItems="center">
                            <Link to="/products" className={classes.link}>Produktai</Link>
                            <div className={classes.menuDivider}/>
                            <Link to="/klubas" className={classes.link}>Tavo reklama klubas</Link>
                            <div className={classes.menuDivider}/>
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
                                        personalas={personalas}
                                        // loyaltydiscountLevel={loyaltydiscountLevel}
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
                        {/* <Divider className={classes.divider} /> */}
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
                                    {/* <Divider className={classes.divider} /> */}
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
