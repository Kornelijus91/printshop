import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Snackbar, Fade } from '@material-ui/core';
import Accounts from './AdminPanelComponents/accounts/Accounts';
import Products from './AdminPanelComponents/products/Products'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.myTheme.sriftoSpalva,
        display: 'flex',
        height: "100%",
    },
    content: {
        width: '88.5%',
        height: '100%',
    },
    leftPanel: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.pirma,
        textAlign: 'center',

    },
    tabs: {
        marginTop: '1rem'
    },
    tab: {
        fontFamily: theme.myTheme.sriftas,
        fontWeight: 'bold',
        fontSize: '1rem',
        zIndex: '2'
    },
    selectedTab: {
        color: theme.myTheme.trecia,
    },
    logo: {
        margin: '1rem',
        color: theme.myTheme.sriftoSpalva
    },
    indicator: {
        width: '100%',
        zIndex: '1',
        backgroundColor: theme.myTheme.sriftoSpalva
    },
    text: {
        margin: '0',
        padding: '0',
    },
    link: {
        margin: '0',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        '&:hover': {
            color: theme.myTheme.ketvirta,
        },
    },
    hr: {
        border: `1px solid ${theme.myTheme.sriftoSpalva}`, 
        margin: '1.3rem 0 .5rem 0'
    },
    snackbar: {
        backgroundColor: theme.myTheme.antra,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas
    },
}));
  

const AdminPanel = ({ token, setToken, setLoggedIn, setPersonalas, administracija, setAdministracija }) => {

    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [username, setUsername] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    });

    const getUserData = async () => {
        const user = await fetch("/users/me/", {
            credentials: "include",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `JWT ${token}`,
            },
        });
        const userData = await user.json();
        setUsername(userData.username);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
              "authorization": `JWT ${token}`,
            },
        }).then(async response => {
            setToken(null);
            window.localStorage.setItem("logout", Date.now())
            setLoggedIn(false);
            setPersonalas(false);
            setAdministracija(false);
        })
    };

    useEffect(() => {
        getUserData();
        // eslint-disable-next-line
    }, [])

    return (
        <Box className={classes.root}>
            <Snackbar
                anchorOrigin={{vertical:'top', horizontal: 'center' }}
                open={snackbar.open}
                onClose={handleSnackbarClose}
                message={snackbar.message}
                ContentProps={{
                    className: classes.snackbar
                }}
                TransitionComponent={Fade}
                autoHideDuration={3000}
            />
            <Box className={classes.leftPanel}>
                <h1 className={classes.logo} >Artis Spausdin</h1>
                <p className={classes.text}>Prisijunges kaip:</p>
                <p className={classes.text}>{username}</p>
                <a className={classes.link} href="/" onClick={(e) => handleLogOut(e)}>Atsijungti</a>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs"
                    classes={{root: classes.tabs, indicator: classes.indicator}}
                    indicatorColor="secondary"
                    
                >
                    <Tab label="Produktai" value={0} classes={{root: classes.tab, selected: classes.selectedTab}} disableRipple={true}/>
                    <Tab label="Paskyros" value={1} classes={{root: classes.tab, selected: classes.selectedTab}} disableRipple={true}/>
                    {/* <Tab label="Item Two" value={1} classes={{root: classes.tab, selected: classes.selectedTab}} disableRipple={true}/>
                    <Tab label="Item Three" value={2} classes={{root: classes.tab, selected: classes.selectedTab}} disableRipple={true}/>
                    <Tab label="Item Four" value={3} classes={{root: classes.tab, selected: classes.selectedTab}} disableRipple={true}/>
                    <Tab label="Item Five" value={4} classes={{root: classes.tab, selected: classes.selectedTab}} disableRipple={true}/>
                    <Tab label="Item Six" value={5} classes={{root: classes.tab, selected: classes.selectedTab}} disableRipple={true}/>
                    <Tab label="Item Seven" value={6} classes={{root: classes.tab, selected: classes.selectedTab}} disableRipple={true}/> */}
                </Tabs>
            </Box>
            <Box className={classes.content}>
                {
                    {
                        0: <Products token={token} administracija={administracija} setSnackbar={setSnackbar}/>,
                        1: <Accounts token={token} administracija={administracija} setSnackbar={setSnackbar}/>,     
                        // 1: "Item Two",
                        // 2: "Item Three",
                        // 3: "Item Four",
                        // 4: "Item Five",
                        // 5: "Item Six",
                        // 6: "Item Seven",
                    }[value]
                }
            </Box>
        </Box>
    )
}

export default AdminPanel
