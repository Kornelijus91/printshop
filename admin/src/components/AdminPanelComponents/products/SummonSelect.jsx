import { Box, FormControl, Select, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0 .2rem 0 0',
        padding: '0',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]:{
            fontSize: '1.5rem',
            margin: '0 .3rem 0 0',
        },
        [theme.breakpoints.up('xxxl')]:{
            fontSize: '2rem',
            margin: '0 .4rem 0 0',
        },
    },
    variantSelectSummon: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
        margin: '0',
        padding: '0 0 0 .5rem',
        textOverflow: 'ellipsis',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '1.5rem',
        width: '2.5rem',
        alignItems: 'center',
        borderRadius: '4px',
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.trecia}`,
        }, 
        [theme.breakpoints.up('xxl')]:{
            height: '2.25rem',
            width: '3.75rem',
            padding: '0 0 0 .75rem',
            fontSize: '1.5rem',
            borderRadius: '6px',
            '&:focus': {
                borderRadius: '6px',
            }, 
        },
        [theme.breakpoints.up('xxxl')]:{
            height: '3rem',
            width: '5rem',
            padding: '0 0 0 1rem',
            fontSize: '2rem',
            borderRadius: '8px',
            '&:focus': {
                borderRadius: '8px',
            }, 
        },
    },
    formVariantSelect: {
        width: '5rem',
        marginRight: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: 'none',
        outline: 'none',
        [theme.breakpoints.up('xxl')]:{
            width: '7.5rem',
            marginRight: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]:{
            width: '10rem',
            marginRight: '2rem',
        },
    },
    variantSelectIconExample: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]:{
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]:{
            transform: 'scale(2)'
        },
    },
}));

const SummonSelect = ({ itemIndex, setProductInfo, productInfo }) => {

    const classes = useStyles();

    const handleSummonIDChange = (e) => {
        const arrayCopy = productInfo.options;
        arrayCopy[itemIndex].summon = e.target.value;
        setProductInfo({ ...productInfo, options: arrayCopy});
    };

    return (
        <Box display='flex' justifyContent='flex-end' alignItems='center'>
            <h3 className={classes.header}>Iškvietimo ID:</h3>
            <FormControl variant="standard" disableUnderline className={classes.formVariantSelect}>
                <Select
                    id="summon_select_id"
                    variant="standard"
                    disableUnderline
                    onWheel={(e) => e.target.blur()}
                    value={productInfo.options[itemIndex].summon}
                    onChange={handleSummonIDChange}
                    label="Iškvietimo ID"
                    defaultValue={productInfo.options[itemIndex].summon}
                    classes={{root: classes.variantSelectSummon, icon: classes.variantSelectIconExample}}
                >
                    <MenuItem value={0}>
                        <em>Nėra</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
            </FormControl> 
        </Box>   
    )
}

export default SummonSelect
