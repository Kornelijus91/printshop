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
    },
    buttonGroup: {
        height: '3rem',
        border: 'none',
        margin: '0 0 1rem 0',
        boxShadow: 'none',
        [theme.breakpoints.up('lg')]: {
            margin: '0',
            width: '10rem',
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
    },
    previewNumberInput: {
        backgroundColor: theme.myTheme.ketvirta,
        display: 'flex',
        height: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cssOutlinedInput: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
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
}));


const NumberOption = ({ optionsValues, setOptionsValues, index, product }) => {

    const classes = useStyles();
    const [first, setFirst] = useState(0);

    const handleDummyValueChange = (prop, index) => (event) => {
        var unit = product.options[index].fiststItemUnit;
        var min = product.options[index].fistItemMinValue;
        var max = product.options[index].firstItemMaxValue;
      
        if (prop === '+') {
            if (Number(optionsValues[index].firstValue) + Number(unit) >= Number(min) && Number(optionsValues[index].firstValue) + Number(unit) <= Number(max)) {
                const number = Number(optionsValues[index].firstValue) + Number(unit)
                const roundedNumber = Math.round(Number((Math.abs(number) * 100).toPrecision(15))) / 100 * Math.sign(number); 
                var copy = optionsValues;
                copy[index].firstValue = roundedNumber;
                copy[index].firstPrice = Math.round(Number((Math.abs((roundedNumber - min) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((roundedNumber - min) * product.options[index].firstItemAdditionalPrice);
                setOptionsValues(copy);
                setFirst(roundedNumber);
            } else {
                if ((Number(optionsValues[index].firstValue) < Number(min))) {
                    var copy1 = optionsValues;
                    copy1[index].firstValue = Number(min);
                    copy1[index].firstPrice = Math.round(Number((Math.abs((Number(min) - min) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((Number(min) - min) * product.options[index].firstItemAdditionalPrice);
                    setOptionsValues(copy1);
                    setFirst(Number(min));
                } else if ((Number(optionsValues[index].firstValue) > Number(max))) {
                    var copy2 = optionsValues;
                    copy2[index].firstValue = Number(max);
                    copy2[index].firstPrice = Math.round(Number((Math.abs((Number(max) - min) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((Number(max) - min) * product.options[index].firstItemAdditionalPrice);
                    setOptionsValues(copy2);
                    setFirst(Number(max));
                }
            }
        } else if (prop === '-') {
            if (Number(optionsValues[index].firstValue) - Number(unit) >= Number(min) && Number(optionsValues[index].firstValue) - Number(unit) <= Number(max)) {
                const number = Number(optionsValues[index].firstValue) - Number(unit)
                const roundedNumber = Math.round(Number((Math.abs(number) * 100).toPrecision(15))) / 100 * Math.sign(number); 
                var copy6 = optionsValues;
                copy6[index].firstValue = roundedNumber;
                copy6[index].firstPrice = Math.round(Number((Math.abs((roundedNumber - min) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((roundedNumber - min) * product.options[index].firstItemAdditionalPrice);
                setOptionsValues(copy6);
                setFirst(roundedNumber);
            } else {
                if ((Number(optionsValues[index].firstValue) < Number(min))) {
                    var copy7 = optionsValues;
                    copy7[index].firstValue = Number(min);
                    copy7[index].firstPrice = Math.round(Number((Math.abs((Number(min) - min) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((Number(min) - min) * product.options[index].firstItemAdditionalPrice);
                    setOptionsValues(copy7);
                    setFirst(Number(min));
                } else if ((Number(optionsValues[index].firstValue) > Number(max))) {
                    var copy8 = optionsValues;
                    copy8[index].firstValue = Number(max);
                    copy8[index].firstPrice = Math.round(Number((Math.abs((Number(max) - min) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((Number(max) - min) * product.options[index].firstItemAdditionalPrice);
                    setFirst(Number(max));
                }
            }
        }   
    };

    const handlePreviewCorrection1 = (index) => {
        if (Number(product.options[index].fistItemMinValue) >= Number(optionsValues[index].firstValue)) {
            var copy12 = optionsValues;
            copy12[index].firstValue = Number(product.options[index].fistItemMinValue)
            copy12[index].firstPrice = Math.round(Number((Math.abs((Number(product.options[index].fistItemMinValue) - product.options[index].fistItemMinValue) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((Number(product.options[index].fistItemMinValue) - product.options[index].fistItemMinValue) * product.options[index].firstItemAdditionalPrice);
            setOptionsValues(copy12);
            setFirst(Number(product.options[index].fistItemMinValue));
        } else if (Number(product.options[index].firstItemMaxValue) <= Number(optionsValues[index].firstValue)) {
            var copy13 = optionsValues;
            copy13[index].firstValue = Number(product.options[index].firstItemMaxValue)
            copy13[index].firstPrice = Math.round(Number((Math.abs((Number(product.options[index].firstItemMaxValue) - product.options[index].fistItemMinValue) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((Number(product.options[index].firstItemMaxValue) - product.options[index].fistItemMinValue) * product.options[index].firstItemAdditionalPrice);
            setOptionsValues(copy13);
            setFirst(Number(product.options[index].firstItemMaxValue));
        } else {
            var copy20 = optionsValues;
            const nomer = optionsValues[index].firstValue - (optionsValues[index].firstValue % product.options[index].fiststItemUnit);
            copy20[index].firstValue = nomer;
            copy20[index].firstPrice = Math.round(Number((Math.abs((nomer - product.options[index].fistItemMinValue) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((nomer - product.options[index].fistItemMinValue) * product.options[index].firstItemAdditionalPrice);
            setOptionsValues(copy20);
            setFirst(nomer);
        }
    };

    const handlePreviewChange = (e, index) => { 
        if (e.target.value === '') {
            setFirst(e.target.value);
        } else {
            var copy16 = optionsValues;
            copy16[index].firstValue = Number(e.target.value)
            copy16[index].firstPrice = Math.round(Number((Math.abs((Number(e.target.value) - product.options[index].fistItemMinValue) * product.options[index].firstItemAdditionalPrice) * 100).toPrecision(15))) / 100 * Math.sign((Number(e.target.value) - product.options[index].fistItemMinValue) * product.options[index].firstItemAdditionalPrice);
            setOptionsValues(copy16);
            setFirst(Number(e.target.value));
        }
    };

    useEffect(() => {
        setFirst(product.options[index].fistItemMinValue);
        // eslint-disable-next-line
    }, []);

    return (
        <Box classes={{root: classes.doubleNumberBox}}>
            <Grid container>
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12} >
                    <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
                        <Box style={{margin: '0 1rem 0 0'}}>
                            <h3 className={classes.OptionTitleHeader}>{product.options[index].name}</h3>
                        </Box>
                        <Box style={{marginRight: '1.5rem'}}>
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
