import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, OutlinedInput, FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root:{
        margin: '0 0 0 1rem',
    },
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0'
    },
    formPrice: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
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
}));

const Limits = ({ productInfo, handleProductInfoChange }) => {

    const classes = useStyles();

    return (
        <Box classes={{root: classes.root}}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Box>
                        <h3 className={classes.header}>1 - 2 dienų kiekio limitas vnt.</h3>
                    </Box>
                    <Box>
                        <FormControl className={classes.formPrice} variant="outlined">
                            <OutlinedInput
                                id="2daylimit"
                                type='number'
                                onWheel={(e) => e.target.blur()}
                                value={productInfo.twoDayLimit}
                                placeholder='Eur...'
                                onChange={handleProductInfoChange('twoDayLimit')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                autoComplete='off'
                            />
                        </FormControl>
                    </Box>    
                    <Box>
                        <h3 className={classes.header}>1 - 2 dienų gamybos pabrangimas %.</h3>
                    </Box>
                    <Box>
                        <FormControl className={classes.formPrice} variant="outlined">
                            <OutlinedInput
                                id="2daypriceIncreace"
                                type='number'
                                onWheel={(e) => e.target.blur()}
                                value={productInfo.twoDayPriceIncreace}
                                placeholder='Eur...'
                                onChange={handleProductInfoChange('twoDayPriceIncreace')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                autoComplete='off'
                            />
                        </FormControl>
                    </Box>    
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Box>
                        <h3 className={classes.header}>24h. kiekio limitas vnt.</h3>
                    </Box>
                    <Box>
                        <FormControl className={classes.formPrice} variant="outlined">
                            <OutlinedInput
                                id="1daylimit"
                                type='number'
                                onWheel={(e) => e.target.blur()}
                                value={productInfo.oneDayLimit}
                                placeholder='Eur...'
                                onChange={handleProductInfoChange('oneDayLimit')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                autoComplete='off'
                            />
                        </FormControl>   
                    </Box> 
                    <Box>
                        <h3 className={classes.header}>24h. gamybos pabrangimas %.</h3>
                    </Box>
                    <Box>
                        <FormControl className={classes.formPrice} variant="outlined">
                            <OutlinedInput
                                id="1daypriceIncreace"
                                type='number'
                                onWheel={(e) => e.target.blur()}
                                value={productInfo.oneDayPriceIncreace}
                                placeholder='Eur...'
                                onChange={handleProductInfoChange('oneDayPriceIncreace')}
                                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                autoComplete='off'
                            />
                        </FormControl>
                    </Box>    
                </Grid>
            </Grid>
        </Box>
    )
}

export default Limits
