import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, Select, MenuItem } from '@material-ui/core';

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
    formVariantSelect: {
        width: '16rem',
        [theme.breakpoints.up('sm')]: {
            width: '15rem',
        },
        [theme.breakpoints.up('md')]: {
            width: '14rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
    },
    variantSelectExample: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
        margin: '0 0 1rem 0',
        padding: '0 0 0 1rem',
        minHeight: '3.5rem',
        textOverflow: 'ellipsis',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.trecia}`,
        }, 
    },
    variantSelectIconExample: {
        color: theme.myTheme.trecia,
        marginTop: '-.5rem',
    },
    menuPaper: {
        maxHeight: '22rem',
        overflowY: 'auto'
    },
}));

const PictureAmount = ({ productInfo, setProductInfo }) => {

    const classes = useStyles();

    const handlePictureAmountChange = (event) => {
        setProductInfo({
            ...productInfo,
            pictureAmount: event.target.value
        });
    };

    return (
        <Box classes={{root: classes.root}}>
            <h3 className={classes.header}>Iš kliento prašomų paveikslėlių skaičius.</h3>
            <FormControl variant="outlined" className={classes.formVariantSelect}>
                <Select
                    id="simple-select-outlined"
                    classes={{outlined: classes.variantSelectExample, iconOutlined: classes.variantSelectIconExample}}
                    value={productInfo.pictureAmount}
                    onChange={handlePictureAmountChange}
                    defaultValue={productInfo.pictureAmount}
                    MenuProps={{ classes: { list: classes.menuPaper } }}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default PictureAmount
