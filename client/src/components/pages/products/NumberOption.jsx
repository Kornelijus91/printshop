import { useEffect, useState } from 'react';
import { TextField, ClickAwayListener, ButtonGroup, Button, Box, Grid, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaInfo } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    OptionTitleHeader: {
        color: theme.myTheme.sriftoSpalva,
        fontSize: '1rem',
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    doubleNumberBox: {
        width: '100%',
        margin: '0 0 1rem 0',
        [theme.breakpoints.up('sm')]: {
            margin: '0 0 1rem 0',
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 0 1rem 0',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0 0 1rem 0',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 1.5rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 2rem 0',
        },
    },
    buttonGroup: {
        height: '3rem',
        border: 'none',
        margin: '0 0 1rem 0',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0',
            width: '10rem',
        },
        [theme.breakpoints.up('xxl')]: {
            height: '4.5rem',
            margin: '0 0 1.5rem 0',
            width: '15rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '6rem',
            margin: '0 0 2rem 0',
            width: '20rem',
        },
    },
    previewButton: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '2rem',
        backgroundColor: theme.myTheme.pirma,
        '&:hover': {
            backgroundColor: '#e31c2d',
        }, 
        [theme.breakpoints.up('xxl')]: {
            fontSize: '3rem',
            borderRadius: '7px',
            padding: '0 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '4rem',
            borderRadius: '9px',
            padding: '0 2rem',
        },
    },
    headerBox: {
        [theme.breakpoints.up('lg')]: {
            width: '10rem',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '15rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '20rem',
        },
    },
    previewNumberInput: {
        backgroundColor: theme.myTheme.ketvirta,
        display: 'flex',
        height: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            height: '4.5rem',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '6rem',
            fontSize: '1.9rem',
        },
    },
    cssOutlinedInput: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            padding: '0 .5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.9rem',
            padding: '0 1rem',
        },
    },
    cssFocused: {
        border: 'none',
        outline: 'none',
    },
    notchedOutline: {
        border: 'none',
        outline: 'none',
    },
    firstBox: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    secondBox: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    infoIcon: {
        margin: 0,
        padding: 0,
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
}));


const NumberOption = ({ optionsValues, setOptionsValues, index, product }) => {

    const classes = useStyles();
    const [first, setFirst] = useState(0);

    const handleDummyValueChange = (prop, index) => (event) => {
        var unit = Number(product.options[index].fiststItemUnit);
        var min = Number(product.options[index].fistItemMinValue);
        var max = Number(product.options[index].firstItemMaxValue);
      
        if (prop === '+') {
            if (optionsValues[index].firstValue + unit >= min && optionsValues[index].firstValue + unit <= max) {
                const number = optionsValues[index].firstValue + unit;
                const roundedNumber = Math.round(Number((Math.abs(number) * 100).toPrecision(15))) / 100 * Math.sign(number); 
                var copy = [...optionsValues];
                copy[index].firstValue = roundedNumber;
                copy[index].firstPrice = ((roundedNumber - min) / unit) * product.options[index].firstItemAdditionalPrice;
                setOptionsValues(copy);
                setFirst(roundedNumber);
            } else {
                if (optionsValues[index].firstValue <= min) {
                    var copy1 = [...optionsValues];
                    copy1[index].firstValue = min;
                    copy1[index].firstPrice = 0;
                    setOptionsValues(copy1);
                    setFirst(min);
                } else if (optionsValues[index].firstValue >= max) {
                    var copy2 = [...optionsValues];
                    copy2[index].firstValue = max;
                    copy2[index].firstPrice = ((max - min) / unit) * product.options[index].firstItemAdditionalPrice;
                    setOptionsValues(copy2);
                    setFirst(max);
                }
            }
        } else if (prop === '-') {
            if (optionsValues[index].firstValue - unit >= min && optionsValues[index].firstValue - unit <= max) {
                const number = optionsValues[index].firstValue - unit;
                const roundedNumber = Math.round(Number((Math.abs(number) * 100).toPrecision(15))) / 100 * Math.sign(number); 
                var copy6 = [...optionsValues];
                copy6[index].firstValue = roundedNumber;
                copy6[index].firstPrice = ((roundedNumber - min) / unit) * product.options[index].firstItemAdditionalPrice;
                setOptionsValues(copy6);
                setFirst(roundedNumber);
            } else {
                if (optionsValues[index].firstValue <= min) {
                    var copy7 = [...optionsValues];
                    copy7[index].firstValue = min;
                    copy7[index].firstPrice = 0;
                    setOptionsValues(copy7);
                    setFirst(min);
                } else if (optionsValues[index].firstValue > max) {
                    var copy8 = [...optionsValues];
                    copy8[index].firstValue = max;
                    copy8[index].firstPrice = ((max - min) / unit) * product.options[index].firstItemAdditionalPrice;
                    setFirst(max);
                }
            }
        }   
    };

    const handlePreviewCorrection1 = (index) => {
        if (product.options[index].fistItemMinValue >= optionsValues[index].firstValue) {
            var copy12 = [...optionsValues];
            copy12[index].firstValue = product.options[index].fistItemMinValue;
            copy12[index].firstPrice = 0;
            setOptionsValues(copy12);
            setFirst(product.options[index].fistItemMinValue);
        } else if (product.options[index].firstItemMaxValue <= optionsValues[index].firstValue) {
            var copy13 = [...optionsValues];
            copy13[index].firstValue = product.options[index].firstItemMaxValue;
            copy13[index].firstPrice = ((product.options[index].firstItemMaxValue - product.options[index].fistItemMinValue) / product.options[index].fiststItemUnit) * product.options[index].firstItemAdditionalPrice;
            setOptionsValues(copy13);
            setFirst(product.options[index].firstItemMaxValue);
        } else {
            var copy20 = [...optionsValues];
            const nomer = optionsValues[index].firstValue - (optionsValues[index].firstValue % product.options[index].fiststItemUnit);
            copy20[index].firstValue = nomer;
            copy20[index].firstPrice = ((nomer - product.options[index].fistItemMinValue) / product.options[index].fiststItemUnit) * product.options[index].firstItemAdditionalPrice;
            setOptionsValues(copy20);
            setFirst(nomer);
        }
    };

    const handlePreviewChange = (e, index) => { 
        if (e.target.value === '') {
            setFirst(e.target.value);
        } else {
            var copy16 = [...optionsValues];
            copy16[index].firstValue = Number(e.target.value);
            copy16[index].firstPrice = ((Number(e.target.value) - product.options[index].fistItemMinValue) / product.options[index].fiststItemUnit) * product.options[index].firstItemAdditionalPrice;
            setOptionsValues(copy16);
            setFirst(Number(e.target.value));
        }
    };

    useEffect(() => {
        // setFirst(product.options[index].fistItemMinValue);
        if (optionsValues[index]) {
            setFirst(optionsValues[index].firstValue);
        } else {
            setFirst(product.options[index].fistItemMinValue);
        }
        // eslint-disable-next-line
    }, [optionsValues]);

    return (
        <Box classes={{root: classes.doubleNumberBox}}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={5} xs={6} >
                    <Box display='flex' justifyContent='space-between' alignItems='flex-start' classes={{root: classes.headerBox}}>
                        <Box>
                            <h3 className={classes.OptionTitleHeader}>{product.options[index].name}</h3>
                        </Box>
                        <Box>
                            {product.options[index].info && 
                                <Tooltip title={product.options[index].info} placement="top" arrow>
                                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                        <FaInfo 
                                            size={17} 
                                            className={classes.infoIcon} 
                                        />
                                    </Box>
                                </Tooltip>
                            }
                        </Box>
                    </Box>
                    <Box className={classes.firstBox}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group" classes={{root: classes.buttonGroup}}>
                            <Button 
                                classes={{root: classes.previewButton}}
                                onClick={handleDummyValueChange('+', index)}
                            >
                            +
                            </Button>
                            <ClickAwayListener onClickAway={() => handlePreviewCorrection1(index)}>
                                <TextField 
                                    id="num_input_1" 
                                    variant="outlined" 
                                    autoComplete='off'
                                    type='number'
                                    classes={{root: classes.previewNumberInput}}
                                    value={first}
                                    onChange={(e) => handlePreviewChange(e, index)}
                                    InputProps={{
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        },
                                    }}
                                />
                            </ClickAwayListener>
                            <Button 
                                classes={{root: classes.previewButton}}
                                onClick={handleDummyValueChange('-', index)}
                            >
                            -
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Grid> 
            </Grid>
        </Box>
    )
}

export default NumberOption
