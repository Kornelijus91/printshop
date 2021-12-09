import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, InputAdornment, ClickAwayListener, Popover } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    searchOnFocus: {
        width: "14rem",
        transition: "width .5s, backgroundc-color 1s",
        borderRadius: "5px",
        backgroundColor: theme.myTheme.trecia,
        padding: '.2rem 0rem .2rem .4rem',
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            borderRadius: "7.5px",
            width: "21rem",
            padding: '.3rem 0rem .3rem .6rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: "10px",
            width: "25rem",
            padding: '.6rem 0rem .6rem .4rem',
        },
    },
    searchOnBlur: {
        width: "2.4rem",
        borderRadius: "5px",
        backgroundColor: 'transparent',
        transition: "width .5s, background-color 1s",
        padding: '.2rem 0rem .2rem .4rem',
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            borderRadius: "7.5px",
            width: "3.6rem",
            padding: '.3rem 0rem .3rem .6rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: "10px",
            width: "4.8rem",
            padding: '.6rem 0rem .6rem .4rem',
        },
    },
    searchglass: {
        cursor: 'pointer',
        fontSize: '24px',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '32.4px',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '48px',
        },
        color: theme.myTheme.sriftoSpalva,
        '&:hover': {
            color: '#2d5286',
        },
    },
    text: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        borderRadius: "0 5px 5px 0",
        [theme.breakpoints.up('xxl')]: {
            borderRadius: "0 7.5px 7.5px 0",
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: "0 10px 10px 0",
            fontSize: '1.8rem'
        },
    },
    textHidden: {
        width: 0,
        transition: "width .5s",
        borderRadius: "0 5px 5px 0",
        [theme.breakpoints.up('xxl')]: {
            borderRadius: "0 7.5px 7.5px 0",
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: "0 10px 10px 0",
            fontSize: '1.8rem'
        },
        // display: 'none'
        // MuiInput-input
    },
    searchResults: {
        transform: 'translateY(.5rem)',
        [theme.breakpoints.up('xxl')]: {
            transform: 'translateY(.8rem)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'translateY(1rem) translateX(1rem)',
        },
    },
    searchResultspaper: {
        width: "13.4rem",
        overflowWrap: 'break-word',
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            width: "18.5rem",
            fontSize: '1.4rem',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            width: "25rem",
            fontSize: '1.8rem',
            borderRadius: '9px'
        },
    },
    LinkParent: {
        padding: '.1rem 1rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.myTheme.ketvirta,
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '.15rem 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '.2rem 2rem',
        },
    },
}));

export default function Searchfield({setSearchResult, setSearchValue, handlesearchValueChange, searchValue, searchResult}) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const classes = useStyles();
  const inputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handlePopover = () => {
    setAnchorEl(inputRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsInputFocused(false);
    setSearchValue('');
  };

  const linkTo = (link) => {
    history.push(`/products/${link}`);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    setSearchValue('');
    setSearchResult([]);
    setIsInputFocused(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ClickAwayListener onClickAway={handleClose}>
        <Box display="flex" flexDirection="row-reverse" alignItems='center' justifyContent='flex-start' className={classes.outterBox}>
            <Box className={isInputFocused ? classes.searchOnFocus : classes.searchOnBlur} >
                <TextField
                    id="input-with-icon-textfield"
                    aria-describedby={id}
                    autoComplete='off'
                    inputRef={inputRef}
                    value={searchValue}
                    // ref={inputRef}
                    onChange={(e) => {
                            handlesearchValueChange(e);
                            handlePopover(e);
                        }
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Box className={classes.searchglassBackground} display='flex' justifyContent="center" alignItems='center'>
                                    <FaSearch className={classes.searchglass} onClick={() => {
                                        setIsInputFocused(!isInputFocused); 
                                        if(!isInputFocused){
                                            inputRef.current.focus()
                                        } else {
                                            inputRef.current.blur()
                                        }
                                        }}
                                    />
                                </Box>
                            </InputAdornment>
                        ),
                        classes: {
                            input: isInputFocused ? classes.text : classes.textHidden,
                        },
                        disabled: !isInputFocused,
                    disableUnderline: true
                    }}
                    variant="standard"
                />
                <Popover
                    id={id}
                    open={open && searchResult.length > 0 && isInputFocused}
                    anchorEl={isInputFocused ? anchorEl : null}
                    onClose={handleClose}
                    disableAutoFocus={true}
                    disableEnforceFocus={true}
                    classes={{
                        root: classes.searchResults,
                        paper: classes.searchResultspaper
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {searchResult.length > 0 && 
                        <Box>
                            {searchResult.slice(0, 5).map((item) => 
                                // <Link to={`/products/${item.link}`} classes={{root: classes.LinkParent}} onClick={() => clearSearch()}>{item.name}</Link>
                                <Box classes={{root: classes.LinkParent}} onClick={() => linkTo(item.link)}>
                                    <p>{item.name}</p>
                                </Box>
                            )}
                        </Box>
                    }
                </Popover>
            </Box>
        </Box>
    </ClickAwayListener>
  );
}