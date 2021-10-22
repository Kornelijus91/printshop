import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Snackbar, Grow, Grid, AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FaUser, FaBoxOpen, FaUserFriends, FaCrown, FaPercent, FaChartBar } from 'react-icons/fa'; //FaChartBar
import { HiMail } from "react-icons/hi";
import { MdViewCarousel } from "react-icons/md";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import AccountsV2 from './AdminPanelComponents/accounts/AccountsV2';
import Products from './AdminPanelComponents/products/Products';
import Carousel from './AdminPanelComponents/carousel/Carousel';
import Email from './AdminPanelComponents/email/Email';
import Loyalty from './AdminPanelComponents/loyalty/Loyalty';
import DiscountCodes from './AdminPanelComponents/discountcodes/DiscountCodes';
import Statistics from './AdminPanelComponents/stats/Statistics';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.myTheme.sriftoSpalva,
        height: '100%'
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    toolbarContainer: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.myTheme.pirma
    },
    content: {
        flexGrow: 1,
        padding: '.5rem 0 0 .5rem',
        overflowY: 'auto',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 1rem',
        },
        
        // backgroundColor: theme.myTheme.sriftoSpalva,
        // height: '100%',
    },
    contentInner: {
        // backgroundColor: theme.myTheme.sriftoSpalva,
    },
    logo: {
        textAlign: 'center',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1.2rem'
    },
    icon: {
        margin: ' .5rem 1rem .5rem 1rem'
    },
    menuicon: {
        color: theme.myTheme.sriftoSpalva,
    },
    menutext: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1.2rem'
    },
    text: {
        textAlign: 'left',
        margin: '0 0 0 .8rem',
        padding: '0',
        textSizeAdjust: 'auto',
        overflowWrap: 'break-word',
    },
    link: {
        margin: '0 0 1rem .8rem',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        '&:hover': {
            color: '#0d1726',
        },
    },
    usernameLogoutContainer: {
        maxWidth: '5rem',
    },
    snackbar: {
        backgroundColor: theme.myTheme.antra,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas
    },
    addButton: {
        margin: '0',
        padding: '.3rem .6rem .3rem .6rem',
        fontSize: '.9rem',
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.antra,
        '&:hover': {
            backgroundColor: theme.myTheme.sriftoSpalva,
        }
    },
}));

function ResponsiveDrawer(props) {
    
    const { window, user, setUser } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [view, setView] = useState({
        value: 0,
        title: 'Produktai',
        titleAdditional: '',
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    });
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [carouselView, setCarouselView] = useState(0);

    const [carouselItemInfo, setCarouselItemInfo] = useState({
        id: '',
        title: '',
        bluetext: '',
        redtext: '',
        productLink: '',
        borderRadius: 0,
        size: 20,
        animation: 0,
        image: null,
        imageURL: '',
        imageOriginalName: '',
        position: 0,
    });

    const addCarouselItemButton = () => {
        setCarouselView(1);
        setCarouselItemInfo({
            id: '',
            title: '',
            bluetext: '',
            redtext: '',
            productLink: '',
            borderRadius: 0,
            size: 20,
            animation: 0,
            image: null,
            imageURL: '',
            imageOriginalName: '',
            position: 0,
        });
    };

    const [addLoyaltyModal, setAddLoyaltyModal] = useState({
        open: false,
        id: '',
        money: 0,
        discount: 0,
    });

    const [loyalty, setLoyalty] = useState([]);

    const [codeModal, setCodeModal] = useState({
        open: false,
        id: '',
        code: '',
        discount: 0,
        oneuse: false,
        valid: new Date().setDate(new Date().getDate() + 7),
    });

    const handleCodeChange = (prop) => (event) => {
        setCodeModal(prev => ({ ...prev, [prop]: event.target.value }));
    };

    const getLoyalty = async () => {
        try {
            const getLoyaltyRequest = await fetch("/users/getLoyalty/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const getLoyaltyResponse= await getLoyaltyRequest.json();
            if (getLoyaltyResponse.success) {
                setLoyalty(getLoyaltyResponse.data);
            } 
        } catch (error) {
            setSnackbar({
                message: `${error}`,
                open: true,
            });
        }
    };

    const handleLoyaltyAddModalChange = (prop) => (event) => {
        setAddLoyaltyModal(prev => ({ ...prev, [prop]: event.target.value }));
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbar({
            message: '',
            open: false,
        });
    };

    const handleLogOut = async (e) => {
        e.preventDefault();
        fetch("/users/logout/", {
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            "authorization": `JWT ${user.token}`,
            },
        }).then(async response => {
            localStorage.setItem("logout", Date.now())
            setUser({
                token: null,
                loggedIn: false,
                username: '',
                personalas: false,
                administracija: false,
            });
        })
    };

    useEffect(() => {
        getLoyalty();
        // eslint-disable-next-line
    }, [])

    const drawer = (
        <div className={classes.toolbarContainer}>
            <div className={classes.toolbar}>
                <Box dispay='flex' justifyContent='center' alignItems='center' style={{paddingTop: '.2rem'}}>
                    <h1 className={classes.logo} >Artis Spausdin</h1>
                </Box>
            </div>
            <Grid container style={{marginBottom: '1rem'}}>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}> 
                    <FaUser size={24} className={classes.icon}/> 
                </Grid>
                <Grid item xl={9} lg={9} md={9} sm={9} xs={9}> 
                    <Box>
                        <p className={classes.text}>{user.username}</p>
                        <a className={classes.link} href="/" onClick={(e) => handleLogOut(e)}>Atsijungti</a>
                    </Box>
                </Grid>
            </Grid>
            <Divider />
            <List>
                <ListItem button onClick={() => {
                    if (view.value !== 4) {
                        setView({value: 4, title: 'Svetainės statistika', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaChartBar size={24} /></ListItemIcon>
                    <ListItemText primary='Statistika' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem button onClick={() => {
                    if (view.value !== 0) {
                        setView({value: 0, title: 'Produktai', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaBoxOpen size={24} /></ListItemIcon>
                    <ListItemText primary='Produktai' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem button onClick={() => {
                    if (view.value !== 1) {
                        setView({value: 1, title: 'Paskyros', titleAdditional: ''});
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaUserFriends size={24} /></ListItemIcon>
                    <ListItemText primary='Paskyros' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem button onClick={() => {
                    if (view.value !== 2) {
                        setView({value: 2, title: 'Karuselė', titleAdditional: ''});
                    } 
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                    setCarouselView(0);
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><MdViewCarousel size={24} /></ListItemIcon>
                    <ListItemText primary='Karuselė' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem button onClick={() => {
                    if (view.value !== 5) {
                        setView({value: 5, title: 'El. Paštas', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><HiMail size={24} /></ListItemIcon>
                    <ListItemText primary='El. Paštas' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem button onClick={() => {
                    if (view.value !== 6) {
                        setView({value: 6, title: 'Lojalumo programa', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaCrown size={24} /></ListItemIcon>
                    <ListItemText primary='Lojalumo prog.' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem button onClick={() => {
                    if (view.value !== 7) {
                        setView({value: 7, title: 'Nuolaidų kodai', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaPercent size={24} /></ListItemIcon>
                    <ListItemText primary='Nuolaidų kodai' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{vertical:'bottom', horizontal: 'left' }}
                open={snackbar.open}
                onClose={handleSnackbarClose}
                message={snackbar.message}
                ContentProps={{
                    className: classes.snackbar
                }}
                TransitionComponent={Grow}
                autoHideDuration={3000}
                key={snackbar.message}
            />
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon style={{color: theme.myTheme.sriftoSpalva}}/>
                    </IconButton>
                    <Grid container dispay='flex' justifyContent='flex-start' alignItems='center'>
                        <Grid 
                            item 
                            xl={3} 
                            lg={3} 
                            md={view.value === 0 || view.value === 2 || view.value === 6 || view.value === 7 ? 4 : 12} 
                            sm={view.value === 0 || view.value === 2 || view.value === 6 || view.value === 7 ? 6 : 12} 
                            xs={view.value === 0 || view.value === 2 || view.value === 6 || view.value === 7 ? 6 : 12}
                        >
                            <Box dispay='flex' justifyContent='flex-start' alignItems='flex-start' >
                                <h1 className={classes.logo} style={{textAlign: 'left'}}>{view.title} {view.titleAdditional}</h1>
                            </Box>
                        </Grid>
                        {view.value === 0 && user.administracija &&
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box dispay='flex' justifyContent='center' alignItems='center'>
                                    <Button classes={{root: classes.addButton}} onClick={() => setProductModalOpen(true)}>Pridėti produktą</Button>
                                </Box>  
                            </Grid>
                        } 
                        {view.value === 2 && carouselView === 0 && user.administracija &&
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box dispay='flex' justifyContent='center' alignItems='center'>
                                    <Button classes={{root: classes.addButton}} onClick={() => addCarouselItemButton()}>Pridėti</Button>
                                </Box>  
                            </Grid>
                        } 
                        {view.value === 6 && user.administracija &&
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box dispay='flex' justifyContent='center' alignItems='center'>
                                    <Button classes={{root: classes.addButton}} onClick={() => setAddLoyaltyModal({ ...addLoyaltyModal, open: true })}>Pridėti lygį</Button>
                                </Box>  
                            </Grid>
                        } 
                        {view.value === 7 && user.administracija &&
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box dispay='flex' justifyContent='center' alignItems='center'>
                                    <Button classes={{root: classes.addButton}} onClick={() => setCodeModal({ ...codeModal, open: true, valid: new Date().setDate(new Date().getDate() + 7) })}>Pridėti kodą</Button>
                                </Box>  
                            </Grid>
                        } 
                    </Grid>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, 
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Box className={classes.contentInner}>
                    {
                        {
                            0: <Products user={user} setSnackbar={setSnackbar} productModalOpen={productModalOpen} setProductModalOpen={setProductModalOpen}/>,
                            1: <AccountsV2 user={user} setSnackbar={setSnackbar} setView={setView} view={view} loyalty={loyalty}/>,     
                            2: <Carousel user={user} setSnackbar={setSnackbar} carouselView={carouselView} setCarouselView={setCarouselView} carouselItemInfo={carouselItemInfo} setCarouselItemInfo={setCarouselItemInfo}/>,
                            4: <Statistics />,
                            5: <Email user={user} setSnackbar={setSnackbar}/>,
                            6: <Loyalty user={user} setSnackbar={setSnackbar} addLoyaltyModal={addLoyaltyModal} setAddLoyaltyModal={setAddLoyaltyModal} handleLoyaltyAddModalChange={handleLoyaltyAddModalChange} loyalty={loyalty} getLoyalty={getLoyalty}/>,
                            7: <DiscountCodes user={user} setSnackbar={setSnackbar} codeModal={codeModal} setCodeModal={setCodeModal} handleCodeChange={handleCodeChange}/>,
                            // 6: "Item Seven",
                        }[view.value]
                    }
                </Box>
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default withWidth()(ResponsiveDrawer);
