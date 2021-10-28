import { Box, FormControl, Select, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
        overflowWrap: 'break-word',
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
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.trecia}`,
        }, 
    },
    formVariantSelect: {
        width: '5rem',
        marginRight: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    variantSelectIconExample: {
        color: theme.myTheme.trecia,
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
            <h3 className={classes.header} style={{margin: '0 .2rem 0 0'}}>Iškvietimo ID:</h3>
            <FormControl variant="outlined" className={classes.formVariantSelect}>
                <Select
                    id="summon_select_id"
                    onWheel={(e) => e.target.blur()}
                    value={productInfo.options[itemIndex].summon}
                    onChange={handleSummonIDChange}
                    label="Iškvietimo ID"
                    defaultValue={productInfo.options[itemIndex].summon}
                    classes={{outlined: classes.variantSelectSummon, iconOutlined: classes.variantSelectIconExample}}
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
