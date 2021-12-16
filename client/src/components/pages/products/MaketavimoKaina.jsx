import { Box, Grid, Tooltip, FormControl, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaInfo } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    OptionTitleBox: {
        width: '100%',
    },
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
    infoIcon: {
        color: theme.myTheme.sriftoSpalva,
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    formVariantSelect: {
        width: '100%',
        marginBottom: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '1.5rem',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '2rem',
            fontSize: '1.9rem',
        },
    },
    variantSelect: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        margin: '0',
        padding: '0',
        minHeight: '3.5rem',
        textOverflow: 'ellipsis',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        }, 
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            minHeight: '5.25rem',
            '&:focus': {
                borderRadius: '7px',
           }, 
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `2px solid ${theme.myTheme.sriftoSpalva}`,
            borderRadius: '9px',
            minHeight: '7rem',
            '&:focus': {
                borderRadius: '9px',
                border: `2px solid ${theme.myTheme.sriftoSpalva}`,
           }, 
        },
    },
    variantSelectIcon: {
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem'
        },
    },
    menuPaper: {
        maxHeight: '22rem',
        overflowY: 'auto',
        [theme.breakpoints.up('xxl')]: {
            maxHeight: '33rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxHeight: '44rem',
            borderRadius: '9px',
        },
    },
    menuitself: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('lg')]: {
            width: '13rem'
        },
        [theme.breakpoints.up('xxl')]: {
            width: '19.5rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '26rem'
        },
    },
    menuItem: {
        width: '100%',
        overflowWrap: 'break-word',
    },
    selectRenderOuterBox: {
        height: '100%',
        paddingLeft: '1rem',
        width: '90%', 
        whitespace: 'nowrap', 
        textOverflow: 'ellipsis',
        [theme.breakpoints.up('xxl')]: {
            paddingLeft: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            paddingLeft: '2rem',
        },
    },
    truncateBox: {
        width: '100%', 
        height: '100%', 
        display: 'inline-block',
        overflow: 'hidden',
        whitespace: 'nowrap', 
        textOverflow: 'ellipsis',
    },
    selectRender2: {
        width: '100%', 
        display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        verticalAlign: 'middle',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            margin: 0,
            padding: '1rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            margin: 0,
            padding: '1.5rem 0',
        },
    },
}));

const MaketavimoKaina = ({ maketavimoKaina, papildomaMaketavimoKaina, setPapildomaMaketavimoKaina }) => {

    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleOptionChange = (e) => {
        setValue(e.target.value);
        if (e.target.value === 1) {
            setPapildomaMaketavimoKaina(maketavimoKaina);
        } else {
            setPapildomaMaketavimoKaina(0);
        }
    };

    useEffect(() => {
        if (papildomaMaketavimoKaina > 0) {
            setValue(1);
            if (papildomaMaketavimoKaina !== maketavimoKaina) {
                setPapildomaMaketavimoKaina(maketavimoKaina);
            }
        } else {
            setValue(0);
            if (papildomaMaketavimoKaina !== 0) {
                setPapildomaMaketavimoKaina(0);
            }
        }
        // eslint-disable-next-line
    }, [papildomaMaketavimoKaina]);

    return (
        <>
            <Box className={classes.OptionTitleBox}>
                <Grid container justifyContent="space-between">
                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10} >
                        <h2 className={classes.OptionTitleHeader}>Maketavimas</h2>
                    </Grid>    
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                        <Box display='flex' justifyContent='flex-end' alignItems='center'>
                            <Tooltip title={
                                `Siūlome profesionalias maketavimo paslaugas už papildomą ${maketavimoKaina.toFixed(2)}€ kainą. Ar pageidausite maketavimo paslaugų?`
                            } placement="top" arrow>
                                <div>
                                    <FaInfo 
                                        size={17} 
                                        className={classes.infoIcon} 
                                    />
                                </div>
                            </Tooltip>
                        </Box> 
                    </Grid> 
                </Grid>
            </Box>
            <Box>
                <FormControl variant="outlined" classes={{root: classes.formVariantSelect}} focused={false}>
                    <Select
                        id="maketavimoKaina_select"
                        variant='outlined'
                        classes={{outlined: classes.variantSelect, iconOutlined: classes.variantSelectIcon}}
                        value={value}
                        onChange={handleOptionChange}
                        defaultValue={0}
                        MenuProps={{ classes: { paper: classes.menuitself, list: classes.menuPaper } }}
                        renderValue={(value) => 
                            <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.selectRenderOuterBox}}>
                                <Box classes={{root: classes.truncateBox}}> 
                                    <p className={classes.selectRender2}>{value === 0 ? 'Ne' : 'Taip'}</p>
                                </Box>
                            </Box> 
                        }
                    >
                        <MenuItem value={0} classes={{root: classes.menuItem}}>
                            Ne
                        </MenuItem>
                        <MenuItem value={1} classes={{root: classes.menuItem}}>
                            Taip
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}

export default MaketavimoKaina
