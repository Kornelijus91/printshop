import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, InputAdornment, ClickAwayListener, Popover } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    searchOnFocus: {
        width: 'clamp(14rem, 11vw, 28rem)',
        transition: "width .5s, backgroundc-color 1s",
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
        backgroundColor: theme.myTheme.balta,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeXXS,
        paddingLeft: theme.myTheme.sizeXXS,
        color: theme.myTheme.juoda,
    },
    searchOnBlur: {
        width: 'clamp(2.4rem, 1.9vw, 4.8rem)',
        borderRadius: theme.myTheme.sizeBorderRadiusLarge,
        backgroundColor: 'transparent',
        transition: "width .5s, background-color 1s",
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeXXS,
        paddingLeft: '0rem',
        color: theme.myTheme.juoda,
    },
    searchglass: {
        fontSize: theme.myTheme.sizeXL,
        color: theme.myTheme.balta,
        transition:'color .4s ease', 
        '&:hover': {
            color: theme.myTheme.sZalia.main,
            cursor: 'pointer'
        },
    },
    searchglassFocused: {
        fontSize: theme.myTheme.sizeXL,
        color: theme.myTheme.juoda,
        transition:'color .4s ease', 
    },
    text: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        borderRadius: `0, ${theme.myTheme.sizeXXXS}, ${theme.myTheme.sizeXXXS}, 0`,
        fontSize: theme.myTheme.sizeM,
    },
    textHidden: {
        width: 0,
        transition: "width .5s",
        borderRadius: `0, ${theme.myTheme.sizeXXXS}, ${theme.myTheme.sizeXXXS}, 0`,
        fontSize: theme.myTheme.sizeM,
    },
    searchResults: {
        transform: `translateY(${theme.myTheme.sizeXXS}) translateX(${theme.myTheme.sizeXXS})`,
    },
    searchResultspaper: {
        width: 'clamp(13.4rem, 10.8vw, 26.8rem)',
        overflowWrap: 'break-word',
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
    },
    LinkParent: {
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeM,
        paddingLeft: theme.myTheme.sizeM,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.myTheme.sZalia.main,
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
                    onChange={(e) => {
                            handlesearchValueChange(e);
                            handlePopover(e);
                        }
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Box className={classes.searchglassBackground} display='flex' justifyContent="center" alignItems='center'>
                                    <FaSearch className={isInputFocused ? classes.searchglassFocused : classes.searchglass} onClick={() => {
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