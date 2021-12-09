import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tooltip } from '@material-ui/core';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.myTheme.trecia,
        '&:hover': {
            color: '#e6e6e6',
            cursor: 'pointer'
        }, 
        [theme.breakpoints.up('xxl')]:{
            transform: 'scale(1.5)',
            marginRight: '1.5rem'
        },
        [theme.breakpoints.up('xxxl')]:{
            transform: 'scale(2)',
            marginRight: '2rem'
        },
    },
    iconBox: {
        margin: '0 1rem 0 0',
    },
    iconParent: {
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
}));

const MoveOptions = ({ itemIndex, setProductInfo, setProductOptionsMemo, arraylength, productInfo, productOptionsMemo }) => {

    const classes = useStyles();

    const move = (direction) => {
        if (direction === 'down') {
            const arrayCopy = productInfo.options;
            const array2Copy = productOptionsMemo;
            [arrayCopy[itemIndex + 1], arrayCopy[itemIndex]] = [arrayCopy[itemIndex], arrayCopy[itemIndex + 1]];
            [array2Copy[itemIndex + 1], array2Copy[itemIndex]] = [array2Copy[itemIndex], array2Copy[itemIndex + 1]];
            setProductInfo({ ...productInfo, options: arrayCopy});
            setProductOptionsMemo(array2Copy);
        } else {
            const arrayCopy = productInfo.options;
            const array2Copy = productOptionsMemo;
            [arrayCopy[itemIndex - 1], arrayCopy[itemIndex]] = [arrayCopy[itemIndex], arrayCopy[itemIndex - 1]];
            [array2Copy[itemIndex - 1], array2Copy[itemIndex]] = [array2Copy[itemIndex], array2Copy[itemIndex - 1]];
            setProductInfo({ ...productInfo, options: arrayCopy});
            setProductOptionsMemo(array2Copy);
        }
    };

    return (
        <Box classes={{root: classes.iconParent}}>
            {itemIndex !== 0 &&
                <Tooltip title='Perkelti aukštyn' placement="top" arrow>
                    <div className={classes.iconBox}>
                        <FaArrowUp size={20} onClick={() => move('up')} className={classes.icon}/>
                    </div>
                </Tooltip>
            }
            {itemIndex !== arraylength - 1 &&
                <Tooltip title='Perkelti žemyn' placement="top" arrow>
                    <div className={classes.iconBox}>
                        <FaArrowDown size={20} onClick={() => move('down')} className={classes.icon}/>
                    </div>
                </Tooltip>
            }
        </Box>
    )
}

export default MoveOptions
