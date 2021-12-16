import { FaUser } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { Box, Badge, Menu, MenuItem, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa'; 

const useStyles = makeStyles((theme) => ({
    root: {
        // marginTop: ".4rem",
        fontSize: '24px',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '32.4px',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '48px',
        },
        '&:hover': {
            color: '#2d5286',
            cursor: 'pointer'
        },
        color: theme.myTheme.sriftoSpalva,
    },
    badge: {
        border: `2px solid ${theme.myTheme.pirma}`,
        borderRadius: "50%",
        height: ".75rem",
        width: ".75rem",
        [theme.breakpoints.up('xxl')]: {
            // transform: 'scale(1.35)'
            border: `3px solid ${theme.myTheme.pirma}`,
            height: "1.0125rem",
            width: "1.0125rem",
        },
        [theme.breakpoints.up('xxxl')]: {
            // transform: 'scale(2) translate(1rem 1rem)'
            border: `4px solid ${theme.myTheme.pirma}`,
            height: "1.5rem",
            width: "1.5rem",
        },
    },
    menu: {
        marginTop: ".5rem",
        // boxShadow: "1px 3px 5px #888888",
        minWidth: '10rem',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            minWidth: '13.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            minWidth: '20rem',
        },
    },
    menuItem: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        height: '100%',
        width: '100%',
        margin: '.2em .2em',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.3rem',
            margin: '.3em .2em',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            margin: '.4em .2em',
        },
    },
    text: {
        margin: '0 1em .4em 1.2em',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.3rem',
            margin: '0 1.35em .4em 1em',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            margin: '0 2em .5em .8em',
        },
    },
    menuHeader: {
        margin: '0 0 0 1.2em',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.3rem',
            margin: '.1em 0 0 1em',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            margin: '.3em 0 0 .8em',
        },
    },
    crownBox: {
        width: '6rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            width: '8.1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '12rem',
        },
    },
    crownBadge: {
        transform: 'translate(2.6rem, -1.3rem)',
        [theme.breakpoints.up('xxl')]: {
            transform: 'translate(3.4rem, -1.5rem)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'translate(4.84rem, -2rem)',
        },
    },
    crownIcon: {
        color: '#e9c46a',
        fontSize: '1rem',
        margin: '0 .2em',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    }
}));

const User = ({ loyaltydiscountLevel, firstName, loggedIn, handleLogout, username, handleUserOpen, handleUserClose, anchorEl, menuOpen, personalas }) => {

    const classes = useStyles();

    const [karunos, setKarunos] = useState([]);

    const kreipinys = () => {
        var last2 = firstName.slice(-2);
        var last1 = firstName.slice(-1);
        var replacement = '';
        var name = '';
        if (last2 === 'us' || last2 === 'as' || last2 === 'is' || last2 === 'ys') {
            switch(last2) {
                case 'us':
                    replacement = 'au';
                    break;
                case 'as':
                    replacement = 'ai';
                    break;
                case 'is':
                    replacement = 'i';
                    break;
                case 'ys':
                    replacement = 'y';
                    break;
                default:
                    replacement = last2;
            };
            name = firstName.slice(0, -2) + replacement;
        } else {
            switch(last1) {
                case 'ė':
                    replacement = 'e';
                    break;
                default:
                    replacement = last1;
            };
            name = firstName.slice(0, -1) + replacement;
        }
        return name;
    };

    const kiekkarunu = () => {
        var tempArray = [];
        for (var i = 1; i <= loyaltydiscountLevel; i++) {
            tempArray.push(<FaCrown className={classes.crownIcon} /> );
        }
        setKarunos(tempArray);
    };

    useEffect(() => {
        if (loyaltydiscountLevel > 0) {
            kiekkarunu();
        }
        // eslint-disable-next-line
    }, [loyaltydiscountLevel]);

    return (
        <>
            <Badge 
                invisible={loyaltydiscountLevel <= 0} 
                classes={{badge: classes.crownBadge}}
                anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                badgeContent={
                    <Box classes={{root: classes.crownBox}}>
                        {karunos}
                    </Box>
                }
            >
                <Badge 
                    color="error" 
                    variant="dot" 
                    invisible={!loggedIn} 
                    classes={{badge: classes.badge}}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}}
                >
                    <FaUser onClick={handleUserOpen} className={classes.root}/>
                </Badge>
            </Badge>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                elevation={0}
                getContentAnchorEl={null}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                keepMounted
                open={menuOpen}
                onClose={handleUserClose}
                classes={{paper: classes.menu}}
            >
                {firstName !== '' ?
                    <>
                        <h5 className={classes.menuHeader}>Labas,</h5>
                        <p className={classes.text}>{`${kreipinys()}!`}</p>
                    </>
                :
                    <>
                        <h5 className={classes.menuHeader}>Prisijunges kaip:</h5>
                        <p className={classes.text}>{username}</p>
                    </>
                }
                <Divider style={{marginBottom: '.2rem'}}/>
                {(personalas.personalas || personalas.administracija) &&
                    <MenuItem><a href='/personalas' className={classes.menuItem}>Personalas</a></MenuItem>
                }
                <MenuItem onClick={handleUserClose}><Link to="/profile" className={classes.menuItem}>Profilis</Link></MenuItem>
                <MenuItem onClick={handleUserClose}><Link to="/addresses" className={classes.menuItem}>Adresai</Link></MenuItem>
                <MenuItem onClick={handleUserClose}><Link to="/orders" className={classes.menuItem}>Užsakymai</Link></MenuItem>
                <MenuItem onClick={handleLogout}><p className={classes.menuItem}>Atsijungti</p></MenuItem>
            </Menu>
        </>
    )
}

export default User
