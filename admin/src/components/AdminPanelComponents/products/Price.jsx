import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, OutlinedInput, FormControl, Button, Tooltip } from '@material-ui/core';
import { FaTrash } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    //borderRight: '1px solid #1a304d'
    root:{
        margin: '0 0 0 1rem',
    },
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    formPrice: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.up('md')]: {
            width: '70%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '90%',
        },
    },
    textInput: {
        marginBottom: '.5rem',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
    },
    diasbleOutline: {
        border: 'none',
    },
    button: {
        margin: '0',
        padding: '.5rem 1rem .5rem 1rem',
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.tZalia.main,
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        }, 
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.5rem',
            padding: '.75rem 1.5rem .75rem 1.5rem',
            borderRadius: '6px',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            padding: '1rem 1.5rem 1rem 1.5rem',
            borderRadius: '8px',
        },
    },
    amountDiscountItemBox: {
        border: `1px solid ${theme.myTheme.trecia}`,
        borderRadius: '4px',
        padding: '.5rem 1rem .5rem 1rem',
        margin: '0 0 1rem 0',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '6px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '8px',
        },
    },
    icon: {
        color: theme.myTheme.trecia,
        margin: '0',
        padding: '0',
        '&:hover': {
            color: '#e6e6e6',
            cursor: 'pointer'
        }, 
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    trashcanBox: {
        display: 'flex',
        justifyContent: 'flex-end', 
        alignItems: 'flex-start', 
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            height: '100%',
        },
        [theme.breakpoints.up('xxl')]: {
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            marginRight: '1.5rem'
        },
    },
}));

const Price = ({ productInfo, addAmountDiscount, handleAmountDiscountChange, deleteAmountDiscount }) => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box style={{margin: '1rem 0 1rem 0'}}>
                        <h3 className={classes.header}>Kainos, nuolaidos.</h3>
                    </Box>
                </Grid> 
                {productInfo.amountDiscount.length > 0 &&
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        {productInfo.amountDiscount.map((item, index) =>
                            <Box classes={{root: classes.amountDiscountItemBox}} key={index}>
                                <Grid container>
                                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                                        <Grid container>
                                            <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                                                <Box>
                                                    <h3 className={classes.header}>Kiekis, vnt.</h3>
                                                </Box>
                                                <Box>
                                                    <FormControl className={classes.formPrice} variant="outlined">
                                                        <OutlinedInput
                                                            id={`Amount_${index}`}
                                                            onWheel={(e) => e.target.blur()}
                                                            type='number'
                                                            value={productInfo.amountDiscount[index].amount}
                                                            placeholder='Vnt...'
                                                            onChange={handleAmountDiscountChange('amount', index)}
                                                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                                            autoComplete='off'
                                                        />
                                                    </FormControl>  
                                                </Box>  
                                            </Grid>
                                            {productInfo.kainosModelis !== 1 &&
                                                <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                                                    <Box>
                                                        <h3 className={classes.header}>Vieneto kaina, €</h3>
                                                    </Box>
                                                    <Box>
                                                        <FormControl className={classes.formPrice} variant="outlined">
                                                            <OutlinedInput
                                                                id={`Amount_${index}`}
                                                                onWheel={(e) => e.target.blur()}
                                                                type='number'
                                                                value={productInfo.amountDiscount[index].price}
                                                                placeholder='Eur...'
                                                                onChange={handleAmountDiscountChange('price', index)}
                                                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                                                autoComplete='off'
                                                            />
                                                        </FormControl>  
                                                    </Box>  
                                                </Grid>
                                            }
                                            <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                                                <Box>
                                                    <h3 className={classes.header}>Nuolaida, %</h3>
                                                </Box>
                                                <Box>
                                                    <FormControl className={classes.formPrice} variant="outlined">
                                                        <OutlinedInput
                                                            id={`Discount_${index}`}
                                                            onWheel={(e) => e.target.blur()}
                                                            type='number'
                                                            value={productInfo.amountDiscount[index].discount}
                                                            placeholder='%...'
                                                            onChange={handleAmountDiscountChange('discount', index)}
                                                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                                            autoComplete='off'
                                                        />
                                                    </FormControl>  
                                                </Box>  
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                        <Box classes={{root: classes.trashcanBox}}>
                                            <Tooltip title='Ištrinti' placement="top" arrow>
                                                <div>
                                                    <FaTrash size={20} className={classes.icon} onClick={() => deleteAmountDiscount(index)}/>
                                                </div>    
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Grid>
                }
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Button onClick={addAmountDiscount} classes={{root: classes.button}}>
                        Pridėti
                    </Button>
                </Grid> 
            </Grid>
        </Box>
    )
}

export default Price
