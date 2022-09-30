import { FaUser } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
// import { useEffect, useState } from 'react';
import { Badge, Menu, MenuItem, Divider } from '@material-ui/core'; //Box,
import { Link } from 'react-router-dom';
// import { FaCrown } from 'react-icons/fa'; 

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeXL,
        color: theme.myTheme.balta,
        transition:'color .4s ease', 
        '&:hover': {
            color: theme.myTheme.sZalia.main,
            cursor: 'pointer'
        },
    },
    badge: {
        border: `clamp(2px, 0.1vw, 4px) solid ${theme.myTheme.juoda}`,
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
        height: theme.myTheme.sizeS,
        width: theme.myTheme.sizeS,
    },
    menu: {
        marginTop: theme.myTheme.sizeXXS,
        minWidth: 'clamp(10rem, 8vw, 20rem)',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
    },
    menuItem: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        height: '100%',
        width: '100%',
        marginTop: theme.myTheme.sizeXXXS,
        marginBottom: theme.myTheme.sizeXXXS,
        marginRight: theme.myTheme.sizeXXXS,
        marginLeft: theme.myTheme.sizeMM,
        padding: '0rem',
        fontSize: theme.myTheme.sizeM,
    },
    text: {
        marginTop: '0rem',
        marginBottom: theme.myTheme.sizeXXS,
        marginRight: theme.myTheme.sizeM,
        marginLeft: theme.myTheme.sizeMM,
        padding: '0',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
    },
    menuListItem: {
        paddingLeft: 0,
    },
    menuHeader: {
        marginTop: '0rem',
        marginBottom: '0rem',
        marginRight: '0rem',
        marginLeft: theme.myTheme.sizeMM,
        padding: '0rem',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
    },
    menuDivider: {
        marginBottom: theme.myTheme.sizeXXXS,
    },
    // crownBox: {
    //     width: '6rem',
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     [theme.breakpoints.up('xxl')]: {
    //         width: '8.1rem',
    //     },
    //     [theme.breakpoints.up('xxxl')]: {
    //         width: '12rem',
    //     },
    // },
    // crownBadge: {
    //     transform: 'translate(2.6rem, -1.3rem)',
    //     [theme.breakpoints.up('xxl')]: {
    //         transform: 'translate(3.4rem, -1.5rem)',
    //     },
    //     [theme.breakpoints.up('xxxl')]: {
    //         transform: 'translate(4.84rem, -2rem)',
    //     },
    // },
    // crownIcon: {
    //     color: '#e9c46a',
    //     fontSize: '1rem',
    //     margin: '0 .2em',
    //     [theme.breakpoints.up('xxl')]: {
    //         fontSize: '1.35rem',
    //     },
    //     [theme.breakpoints.up('xxxl')]: {
    //         fontSize: '2rem',
    //     },
    // }
}));

const User = ({ firstName, loggedIn, handleLogout, username, handleUserOpen, handleUserClose, anchorEl, menuOpen, personalas }) => { //loyaltydiscountLevel

    const classes = useStyles();

    // const [karunos, setKarunos] = useState([]);

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

    // const kiekkarunu = () => {
    //     var tempArray = [];
    //     for (var i = 1; i <= loyaltydiscountLevel; i++) {
    //         tempArray.push(<FaCrown className={classes.crownIcon} /> );
    //     }
    //     setKarunos(tempArray);
    // };

    // useEffect(() => {
    //     if (loyaltydiscountLevel > 0) {
    //         kiekkarunu();
    //     }
    //     // eslint-disable-next-line
    // }, [loyaltydiscountLevel]);

    return (
        <>
            {/* <Badge 
                invisible={loyaltydiscountLevel <= 0} 
                classes={{badge: classes.crownBadge}}
                anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                badgeContent={
                    <Box classes={{root: classes.crownBox}}>
                        {karunos}
                    </Box>
                }
            > */}
                <Badge 
                    color="error" 
                    variant="dot" 
                    invisible={!loggedIn} 
                    classes={{badge: classes.badge}}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}}
                >
                    <FaUser onClick={handleUserOpen} className={classes.root}/>
                </Badge>
            {/* </Badge> */}
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
                <Divider classes={{root: classes.menuDivider}}/>
                {(personalas.personalas || personalas.administracija) &&
                    <MenuItem classes={{root: classes.menuListItem}}><a href='/personalas' className={classes.menuItem}>Personalas</a></MenuItem>
                }
                <MenuItem classes={{root: classes.menuListItem}} onClick={handleUserClose}><Link to="/profile" className={classes.menuItem}>Profilis</Link></MenuItem>
                <MenuItem classes={{root: classes.menuListItem}} onClick={handleUserClose}><Link to="/addresses" className={classes.menuItem}>Adresai</Link></MenuItem>
                <MenuItem classes={{root: classes.menuListItem}} onClick={handleUserClose}><Link to="/orders" className={classes.menuItem}>Užsakymai</Link></MenuItem>
                <MenuItem classes={{root: classes.menuListItem}} onClick={handleLogout}><p className={classes.menuItem}>Atsijungti</p></MenuItem>
            </Menu>
        </>
    )
}

export default User
