import { FaUser } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
// import { useState } from 'react';
import { Badge, Menu, MenuItem, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'; // Link

const useStyles = makeStyles((theme) => ({
    root: {
        // marginTop: ".4rem",
        '&:hover': {
            cursor: "pointer",
            color: '#2d5286',
        },
        color: theme.myTheme.sriftoSpalva,
    },
    badge: {
        border: `2px solid ${theme.myTheme.pirma}`,
        borderRadius: "50%",
        height: ".75rem",
        width: ".75rem",
    },
    menu: {
        marginTop: ".5rem",
        // boxShadow: "1px 3px 5px #888888",
    },
    menuItem: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        height: '100%',
        width: '100%'
    },
    text: {
        margin: '.2rem 1rem 0 1rem',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
}));

const User = ({ loggedIn, handleLogout, username, handleUserOpen, handleUserClose, anchorEl, menuOpen }) => {

    const classes = useStyles();

    return (
        <>
            <Badge 
                color="error" 
                variant="dot" 
                invisible={!loggedIn} 
                classes={{badge: classes.badge}}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}}
            >
                <FaUser size={24} onClick={handleUserOpen} className={classes.root}/>
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
                <h5 className={classes.text}>Prisijunges kaip:</h5>
                <p className={classes.text} style={{marginBottom: '.6rem'}}>{username}</p>
                <Divider style={{marginBottom: '.2rem'}}/>
                <MenuItem onClick={handleUserClose}><Link to="/profile" className={classes.menuItem}>Profilis</Link></MenuItem>
                <MenuItem onClick={handleUserClose}><Link to="/addresses" className={classes.menuItem}>Adresai</Link></MenuItem>
                <MenuItem onClick={handleUserClose}><Link to="/orders" className={classes.menuItem}>Užsakymai</Link></MenuItem>
                <MenuItem onClick={handleLogout} selected={false} className={classes.menuItem}>Atsijungti</MenuItem>
            </Menu>
        </>
    )
}

export default User
