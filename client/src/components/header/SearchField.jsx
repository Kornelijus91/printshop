import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, InputAdornment, ClickAwayListener } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    searchOnFocus: {
        width: "14rem",
        transition: "width .5s, backgroundc-color 1s",
        borderRadius: "5rem",
        backgroundColor: theme.myTheme.trecia,
        padding: '.2rem 0rem .2rem .4rem',
        color: theme.myTheme.sriftoSpalva,
    },
    searchOnBlur: {
        width: "2.4rem",
        borderRadius: "5rem",
        backgroundColor: 'transparent',
        transition: "width .5s, background-color 1s",
        padding: '.2rem 0rem .2rem .4rem',
        color: theme.myTheme.sriftoSpalva,
    },
    searchglass: {
        color: theme.myTheme.sriftoSpalva,
        cursor: 'pointer',
        '&:hover': {
            color: '#2d5286',
        },
    },
    text: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        borderRadius: "0 5rem 5rem 0",
    },
}));

export default function Searchfield() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const classes = useStyles();
  const inputRef = useRef();

  return (
    <ClickAwayListener onClickAway={() => setIsInputFocused(false)}>
        <Box display="flex" flexDirection="row-reverse" className={classes.outterBox}>
            <Box className={isInputFocused ? classes.searchOnFocus : classes.searchOnBlur} >
                <TextField
                    id="input-with-icon-textfield"
                    inputRef={inputRef}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Box className={classes.searchglassBackground} display='flex' justifyContent="center" alignItems='center'>
                                    <FaSearch size={24} className={classes.searchglass} onClick={() => {
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
                            input: classes.text,
                        },
                    disableUnderline: true
                    }}
                    variant="standard"
                />
            </Box>
        </Box>
    </ClickAwayListener>
  );
}