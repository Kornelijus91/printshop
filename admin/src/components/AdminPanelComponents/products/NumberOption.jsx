import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, ButtonGroup, TextField, Tooltip, FormControl, OutlinedInput, ClickAwayListener } from '@material-ui/core';
import { FaInfoCircle, FaTrash } from 'react-icons/fa';
import MoveOptions from './MoveOptions';
import SummonSelect from './SummonSelect';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem 0 0 0'
    },
    item: {
        margin: '0 0 0 1rem',
        [theme.breakpoints.up('sm')]: {
            margin: '0 0 0 1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 0 0 1.5rem',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0 0 0 1.5rem',
        },
    },
    previewButtonGroup: {
        height: '3rem',
        width: '8rem',
        border: 'none',
        margin: '0 0 1rem 0',
        [theme.breakpoints.up('lg')]: {
            margin: '0',
            width: '10rem',
        },
    },
    previewBox: {
        width: '100%',
        margin: '0 0 0 1rem',
        [theme.breakpoints.up('sm')]: {
            margin: '0 0 0 1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 0 0 1.5rem',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0 0 0 1.5rem',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerinput: {
        padding: '0',
        backgroundColor: 'green',
    },
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
    },
    headersmall: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        fontSize: '.9rem',
        overflowWrap: 'break-word',
    },
    infoIcon: {
        color: theme.myTheme.trecia,
        margin: '0',
        padding: '0',
    },
    deleteIcon: {
        color: theme.myTheme.trecia,
        '&:hover': {
            color: '#e6e6e6',
            cursor: 'pointer'
        }, 
    },
    formVariantOptionNameInfo: {
        width: '16rem',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '14rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
    },
    textInput: {
        marginBottom: "1rem",
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
    },
    diasbleOutline: {
        border: 'none',
    },
    infotext: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0 0 1rem 0',
        padding: '0',
        fontSize: '.75rem'
    },
}));

const NumberOption = ({ productInfo, itemIndex, setProductInfo, productOptionsMemo, setProductOptionsMemo }) => {

    const classes = useStyles();

    const [dummyValue, setDummyValue] = useState({
        first: 0,
        second: 0
    });
    const [minMaxValue, setMinMaxValue] = useState({
        firstMin: 0,
        firstMax: 100,
        secondMin: 0,
        secondMax: 100
    });

    const handleOpdtionDelete = () => {
        setProductOptionsMemo(productOptionsMemo.filter(function(value, index, arr) {
            return index !== itemIndex
        }));
        setProductInfo({ ...productInfo, options: productInfo.options.filter(function(value, index, arr) {
            return index !== itemIndex
        })});
    };

    const handleProductInfoNameChange = (e) => {
        const arrayCopy = productInfo.options;
        arrayCopy[itemIndex].name = e.target.value;
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const handleProductInfoInfoChange = (e) => {
        const arrayCopy = productInfo.options;
        arrayCopy[itemIndex].info = e.target.value;
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const handleProductInfoName = (e, witch) => {
        const arrayCopy = productInfo.options;
        if (witch === 'first') {
            arrayCopy[itemIndex].firstItemName = e.target.value;
            
        } else {
            arrayCopy[itemIndex].secondItemName = e.target.value;
           
        }
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const handleProductInfoMinValue = (e, witch) => {
        const arrayCopy = productInfo.options;
        if (witch === 'first') {
            arrayCopy[itemIndex].fistItemMinValue = e.target.value;
            setMinMaxValue({
                ...minMaxValue,
                firstMin: e.target.value
            });
        } else {
            arrayCopy[itemIndex].secondItemMinValue = e.target.value;
            setMinMaxValue({
                ...minMaxValue,
                secondMin: e.target.value
            });
        }
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const handleProductInfoMaxValue = (e, witch) => {
        const arrayCopy = productInfo.options;
        if (witch === 'first') {
            arrayCopy[itemIndex].firstItemMaxValue = e.target.value;
            setMinMaxValue({
                ...minMaxValue,
                firstMax: e.target.value
            });
        } else {
            arrayCopy[itemIndex].secondItemMaxValue = e.target.value;
            setMinMaxValue({
                ...minMaxValue,
                secondMax: e.target.value
            });
        }
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const handleDummyValueChange = (prop, witch) => (event) => {
        // var roundedNumber = 0;
        var unit = 0;
        var min = 0;
        var max = 0;
        if (witch === 'first') {
            unit = productInfo.options[itemIndex].fiststItemUnit;
            min = productInfo.options[itemIndex].fistItemMinValue;
            max = productInfo.options[itemIndex].firstItemMaxValue;
        } else {
            unit = productInfo.options[itemIndex].secondItemUnit;
            min = productInfo.options[itemIndex].secondItemMinValue;
            max = productInfo.options[itemIndex].secondItemMaxValue;
        }
        if (prop === '+') {
            if (witch === 'first') {
                if (Number(dummyValue.first) + Number(unit) >= Number(min) && Number(dummyValue.first) + Number(unit) <= Number(max)) {
                    const number = Number(dummyValue.first) + Number(unit)
                    const roundedNumber = Math.round(Number((Math.abs(number) * 100).toPrecision(15))) / 100 * Math.sign(number); 
                    setDummyValue({
                        ...dummyValue,
                        first: roundedNumber
                    });
                } else {
                    if ((Number(dummyValue.first) < Number(min))) {
                        setDummyValue({
                            ...dummyValue,
                            first: Number(min)
                        });
                    } else if ((Number(dummyValue.first) > Number(max))) {
                        setDummyValue({
                            ...dummyValue,
                            first: Number(max)
                        });
                    }
                }
            } else {
                if (Number(dummyValue.second) + Number(unit) >= Number(min) && Number(dummyValue.second) + Number(unit) <= Number(max)) {
                    const number = Number(dummyValue.second) + Number(unit)
                    const roundedNumber = Math.round(Number((Math.abs(number) * 100).toPrecision(15))) / 100 * Math.sign(number); 
                    setDummyValue({
                        ...dummyValue,
                        second: roundedNumber
                    });
                } else {
                    if ((Number(dummyValue.second) < Number(min))) {
                        setDummyValue({
                            ...dummyValue,
                            second: Number(min)
                        });
                    } else if ((Number(dummyValue.second) > Number(max))) {
                        setDummyValue({
                            ...dummyValue,
                            second: Number(max)
                        });
                    }
                }
            }
        } else if (prop === '-') {
            if (witch === 'first') {
                if (Number(dummyValue.first) - Number(unit) >= Number(min) && Number(dummyValue.first) - Number(unit) <= Number(max)) {
                    const number = Number(dummyValue.first) - Number(unit)
                    const roundedNumber = Math.round(Number((Math.abs(number) * 100).toPrecision(15))) / 100 * Math.sign(number); 
                    setDummyValue({
                        ...dummyValue,
                        first: roundedNumber
                    });
                } else {
                    if ((Number(dummyValue.first) < Number(min))) {
                        setDummyValue({
                            ...dummyValue,
                            first: Number(min)
                        });
                    } else if ((Number(dummyValue.first) > Number(max))) {
                        setDummyValue({
                            ...dummyValue,
                            first: Number(max)
                        });
                    }
                }
            } else {
                if (Number(dummyValue.second) - Number(unit) >= Number(min) && Number(dummyValue.second) - Number(unit) <= Number(max)) {
                    const number = Number(dummyValue.second) - Number(unit)
                    const roundedNumber = Math.round(Number((Math.abs(number) * 100).toPrecision(15))) / 100 * Math.sign(number); 
                    setDummyValue({
                        ...dummyValue,
                        second: roundedNumber
                    });
                } else {
                    if ((Number(dummyValue.second) < Number(min))) {
                        setDummyValue({
                            ...dummyValue,
                            second: Number(min)
                        });
                    } else if ((Number(dummyValue.second) > Number(max))) {
                        setDummyValue({
                            ...dummyValue,
                            second: Number(max)
                        });
                    }
                }
            }
        }
        
    };

    const handleProductInfoUnit = (e, witch) => {
        const arrayCopy = productInfo.options;
        if (witch === 'first') {
            arrayCopy[itemIndex].fiststItemUnit = e.target.value;
        } else {
            arrayCopy[itemIndex].secondItemUnit = e.target.value;
        }
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const handleProductInfoadditionalPrice = (e, witch) => {
        const arrayCopy = productInfo.options;
        if (witch === 'first') {
            arrayCopy[itemIndex].firstItemAdditionalPrice = e.target.value;
        } else {
            arrayCopy[itemIndex].secondItemAdditionalPrice = e.target.value;
        }
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    const handlePreviewChange = (e, witch) => {
        if (witch === 'first') {
            setDummyValue({
                ...dummyValue,
                first: e.target.value
            });
        } else {
            setDummyValue({
                ...dummyValue,
                second: e.target.value
            });
        }
    };

    const handlePreviewCorrection1 = () => {
        if (Number(minMaxValue.firstMin) >= Number(dummyValue.first)) {
            setDummyValue({
                ...dummyValue,
                first: Number(minMaxValue.firstMin)
            });
        } else if (Number(minMaxValue.firstMax) <= Number(dummyValue.first)) {
            setDummyValue({
                ...dummyValue,
                first: Number(minMaxValue.firstMax)
            });
        }
        
    };

    const handlePreviewCorrection2 = () => {
        if (Number(minMaxValue.secondMin) >= Number(dummyValue.second)) {
            setDummyValue({
                ...dummyValue,
                second: Number(minMaxValue.secondMin)
            });
        } else if (Number(minMaxValue.secondMax) <= Number(dummyValue.second)) {
            setDummyValue({
                ...dummyValue,
                second: Number(minMaxValue.secondMax)
            });
        }
    };

    useEffect(() => {
        setMinMaxValue({
            min: productInfo.options[itemIndex].minValue,
            max: productInfo.options[itemIndex].maxValue,
            firstMin: productInfo.options[itemIndex].fistItemMinValue,
            firstMax: productInfo.options[itemIndex].firstItemMaxValue,
            secondMin: productInfo.options[itemIndex].secondItemMinValue,
            secondMax: productInfo.options[itemIndex].secondItemMaxValue,
        });
        if (Number(productInfo.options[itemIndex].fistItemMinValue) >= Number(dummyValue.first)) {
            setDummyValue({
                ...dummyValue,
                first: Number(productInfo.options[itemIndex].fistItemMinValue)
            });
        } else if (Number(productInfo.options[itemIndex].firstItemMaxValue) <= Number(dummyValue.first)) {
            setDummyValue({
                ...dummyValue,
                first: Number(productInfo.options[itemIndex].firstItemMaxValue)
            });
        }
        if (Number(productInfo.options[itemIndex].secondItemMinValue) >= Number(dummyValue.second)) {
            setDummyValue({
                ...dummyValue,
                second: Number(productInfo.options[itemIndex].secondItemMinValue)
            });
        } else if (Number(productInfo.options[itemIndex].secondItemMaxValue) <= Number(dummyValue.second)) {
            setDummyValue({
                ...dummyValue,
                second: Number(productInfo.options[itemIndex].secondItemMaxValue)
            });
        }
        
        // eslint-disable-next-line
    }, []);

    return (
        <Box classes={{root: classes.root}}>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box display='flex' justifyContent='flex-end' alignItems='flex-end'>
                        <SummonSelect 
                            itemIndex={itemIndex}
                            setProductInfo={setProductInfo}
                            productInfo={productInfo}
                        />
                        <MoveOptions 
                            itemIndex={itemIndex}
                            setProductInfo={setProductInfo}
                            setProductOptionsMemo={setProductOptionsMemo}
                            arraylength={productInfo.options.length}
                            productInfo={productInfo}
                            productOptionsMemo={productOptionsMemo}
                        />
                        <Tooltip title='Ištrinti pasirinkimą' placement="top" arrow>
                            <div>
                                <FaTrash size={20} onClick={handleOpdtionDelete} className={classes.deleteIcon}/>
                            </div>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box classes={{root: classes.previewBox}}>
                                <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                    <Box style={{margin: '0 1rem .5rem 0'}}>
                                        {productInfo.options[itemIndex].name ?
                                            <h3 className={classes.header}>{productInfo.options[itemIndex].name}</h3>
                                        :
                                            <h3 className={classes.header}>Peržiūra</h3>
                                        }
                                    </Box>
                                    <Box>
                                        {productInfo.options[itemIndex].info && 
                                            <Tooltip title={productInfo.options[itemIndex].info} placement="top">
                                                <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                                    <FaInfoCircle 
                                                        size={20} 
                                                        className={classes.infoIcon} 
                                                    />
                                                </Box>
                                            </Tooltip>
                                        }
                                    </Box>
                                </Box>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                    <Grid container >
                                        <Grid item xl={6} lg={6} md={12} sm={12} xs={12} >
                                            <Box style={{marginRight: '1rem'}}>
                                                {productInfo.options[itemIndex].firstItemName &&
                                                    <h3 className={classes.headersmall}>{productInfo.options[itemIndex].firstItemName}</h3>
                                                }
                                            </Box>
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group" classes={{root: classes.previewButtonGroup}}>
                                                <Button 
                                                    classes={{root: classes.previewButton}}
                                                    onClick={handleDummyValueChange('+', 'first')}
                                                >
                                                +
                                                </Button>
                                                <ClickAwayListener onClickAway={handlePreviewCorrection1}>
                                                    <TextField 
                                                        id="num_input_1" 
                                                        variant="outlined" 
                                                        autoComplete='off'
                                                        type='number'
                                                        classes={{root: classes.previewNumberInput}}
                                                        value={dummyValue.first}
                                                        onChange={(e) => handlePreviewChange(e, 'first')}
                                                    />
                                                </ClickAwayListener>
                                                <Button 
                                                    classes={{root: classes.previewButton}}
                                                    onClick={handleDummyValueChange('-', 'first')}
                                                >
                                                -
                                                </Button>
                                            </ButtonGroup>
                                        </Grid> 
                                        <Grid item xl={6} lg={6} md={12} sm={12} xs={12} >
                                            <Box style={{marginRight: '1rem'}}>
                                                {productInfo.options[itemIndex].secondItemName &&
                                                    <h3 className={classes.headersmall}>{productInfo.options[itemIndex].secondItemName}</h3>
                                                }
                                            </Box>
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group" classes={{root: classes.previewButtonGroup}}>
                                                <Button 
                                                    classes={{root: classes.previewButton}}
                                                    onClick={handleDummyValueChange('+', 'second')}
                                                >
                                                +
                                                </Button>
                                                <ClickAwayListener onClickAway={handlePreviewCorrection2}>
                                                    <TextField 
                                                        id="num_input_1" 
                                                        variant="outlined" 
                                                        autoComplete='off'
                                                        type='number'
                                                        classes={{root: classes.previewNumberInput}}
                                                        value={dummyValue.second}
                                                        onChange={(e) => handlePreviewChange(e, 'second')}
                                                    />
                                                </ClickAwayListener>
                                                <Button 
                                                    classes={{root: classes.previewButton}}
                                                    onClick={handleDummyValueChange('-', 'second')}
                                                >
                                                -
                                                </Button>
                                            </ButtonGroup>
                                        </Grid> 
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12} >
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Pavadinimas</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="Option_name"
                                        type='text'
                                        value={productInfo.options[itemIndex].name}
                                        placeholder='Pavadinimas...'
                                        onChange={(e) => handleProductInfoNameChange(e)}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>    
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Info</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="Option_info"
                                        type='text'
                                        value={productInfo.options[itemIndex].info}
                                        placeholder='Info...'
                                        onChange={(e) => handleProductInfoInfoChange(e)}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Box className={classes.item} display='flex' justifyContent='center' alignItems='center' style={{height: '100%'}}>
                                <h3 className={classes.header}>Pirmasis pasirinkimas</h3>
                            </Box>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Pavadinimas</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_22_first"
                                        type='text'
                                        value={productInfo.options[itemIndex].firstItemName}
                                        placeholder='Pavadinimas...'
                                        onChange={(e) => handleProductInfoName(e, 'first')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>   
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Minimali vertė</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_2_first"
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        value={productInfo.options[itemIndex].fistItemMinValue}
                                        placeholder='Minimali vertė...'
                                        onChange={(e) => handleProductInfoMinValue(e, 'first')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>   
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Maksimali vertė</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_3_first"
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        value={productInfo.options[itemIndex].firstItemMaxValue}
                                        placeholder='Maksimali vertė...'
                                        onChange={(e) => handleProductInfoMaxValue(e, 'first')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid> 
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Vienetas</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_4_first"
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        value={productInfo.options[itemIndex].fiststItemUnit}
                                        placeholder='Vienetas...'
                                        onChange={(e) => handleProductInfoUnit(e, 'first')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>      
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Papildoma kaina</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_1_first"
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        value={productInfo.options[itemIndex].firstItemAdditionalPrice}
                                        placeholder='Papildoma kaina...'
                                        onChange={(e) => handleProductInfoadditionalPrice(e, 'first')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid> 
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item} display='flex' justifyContent='center' alignItems='center' style={{height: '100%'}}>
                                <Box>
                                    <p className={classes.infotext}>
                                        Papildoma kaina, už nustatytą vienetą, pridedama viršijus minimalią vertę.
                                    </p>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>   
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Box className={classes.item} display='flex' justifyContent='center' alignItems='center' style={{height: '100%'}}>
                                <h3 className={classes.header}>Antrasis pasirinkimas</h3>
                            </Box>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Pavadinimas</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_22_second"
                                        type='text'
                                        value={productInfo.options[itemIndex].secondItemName}
                                        placeholder='Pavadinimas...'
                                        onChange={(e) => handleProductInfoName(e, 'second')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>   
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Minimali vertė</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_2_second"
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        value={productInfo.options[itemIndex].secondItemMinValue}
                                        placeholder='Minimali vertė...'
                                        onChange={(e) => handleProductInfoMinValue(e, 'second')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>   
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Maksimali vertė</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_3_second"
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        value={productInfo.options[itemIndex].secondItemMaxValue}
                                        placeholder='Maksimali vertė...'
                                        onChange={(e) => handleProductInfoMaxValue(e, 'second')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid> 
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Vienetas</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_4_second"
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        value={productInfo.options[itemIndex].secondItemUnit}
                                        placeholder='Vienetas...'
                                        onChange={(e) => handleProductInfoUnit(e, 'second')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid>      
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Papildoma kaina</h3>
                                <FormControl className={classes.formVariantOptionNameInfo} variant="outlined">
                                    <OutlinedInput
                                        id="num_input_1_second"
                                        type='number'
                                        onWheel={(e) => e.target.blur()}
                                        value={productInfo.options[itemIndex].secondItemAdditionalPrice}
                                        placeholder='Papildoma kaina...'
                                        onChange={(e) => handleProductInfoadditionalPrice(e, 'second')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Box>
                        </Grid> 
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <Box className={classes.item} display='flex' justifyContent='center' alignItems='center' style={{height: '100%'}}>
                                <Box>
                                    <p className={classes.infotext}>
                                        Papildoma kaina, už nustatytą vienetą, pridedama viršijus minimalią vertę.
                                    </p>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>                
            </Grid>
        </Box>
    )
}

export default NumberOption
