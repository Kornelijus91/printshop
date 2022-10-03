import { Box, Grid, Tooltip, FormControl, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaInfo } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    OptionTitleBox: theme.myTheme.OptionTitleBox,
    OptionTitleHeader: theme.myTheme.OptionTitleHeader,
    infoIcon: theme.myTheme.infoIcon,
    formVariantSelect: theme.myTheme.formVariantSelect,
    variantSelect: theme.myTheme.variantSelect,
    variantSelectIcon: theme.myTheme.variantSelectIcon,
    menuPaper: theme.myTheme.menuPaper,
    menuitself: theme.myTheme.menuitself,
    menuItem: theme.myTheme.menuItem,
    selectRenderOuterBox:  theme.myTheme.selectRenderOuterBox,
    selectRender2:  theme.myTheme.selectRender2,
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
                                `Siūlome profesionalias maketavimo paslaugas už papildomą ${maketavimoKaina.toFixed(2)}€ kainą. Maketavimui nuolaidos netaikomos. Ar pageidausite maketavimo paslaugų?`
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
                                <p className={classes.selectRender2}>{value === 0 ? 'Ne' : 'Taip'}</p>
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
