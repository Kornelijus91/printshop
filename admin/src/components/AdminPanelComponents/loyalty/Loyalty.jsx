import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddEditLoyaltyModal from './AddEditLoyaltyModal';
import { FaTrash } from 'react-icons/fa';
import { Box, Grid, Tooltip } from '@material-ui/core';
import DeleteLoyaltyModal from './DeleteLoyaltyModal';
import {Helmet} from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'

const useStyles = makeStyles((theme) => ({
    searchResultBox: {
        // backgroundColor: theme.myTheme.ruda.main,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '7px',
        margin: '.5rem 0 0 0',
        // padding: '.5rem .5rem .001rem .5rem',
        width: '99%',
        [theme.breakpoints.up('xxl')]: {
            margin: '2rem 0 0 0',
            padding: '.75rem .75rem .002rem .75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '4rem 0 0 0',
            padding: '1rem 1rem .003rem 1rem',
        },
    },
    infosection: {
        marginLeft: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginLeft: '1.5rem',
            '& p': {
                fontSize: '1.6rem'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            marginLeft: '2rem',
            '& p': {
                fontSize: '2rem'
            },
        },
    },
    item: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        color: theme.myTheme.trecia,
        borderRadius: '7px',
        margin: '0 0 .5rem 0',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#0d1726',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
            margin: '0 0 .75rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            margin: '0 0 1rem 0',
        },
    },
    deleteIcon: {
        color: theme.myTheme.trecia,
        '&:hover': {
            cursor: 'pointer',
            color:'#f2f2f2',
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    iconBox: {
        display: 'inline-block', 
        marginRight: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginRight: '2.5rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            marginRight: '3.5rem'
        },
    },
}));

const Loyalty = ({ newChatrooms, newOrders, getLoyalty, loyalty, user, setSnackbar, addLoyaltyModal, setAddLoyaltyModal, handleLoyaltyAddModalChange }) => {

    const classes = useStyles();

    const [deleteModal, setDeleteModal] = useState({
        submitting: false,
        open: false,
        loyaltyID: '',
    });

    const openDeleteModal = (e, deleteID) => {
        e.stopPropagation();
        setDeleteModal({
            submitting: false,
            open: true,
            loyaltyID: deleteID,
        });
    };

    return (
        <div>
            <AddEditLoyaltyModal 
                user={user}
                setSnackbar={setSnackbar}
                addLoyaltyModal={addLoyaltyModal}
                setAddLoyaltyModal={setAddLoyaltyModal}
                handleLoyaltyAddModalChange={handleLoyaltyAddModalChange}
                getLoyalty={getLoyalty}
            />
            <DeleteLoyaltyModal 
                user={user}
                setSnackbar={setSnackbar}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                getLoyalty={getLoyalty}
            />
            <Helmet defer={false}>
                <title>{newOrders + newChatrooms > 0 ? `(${newOrders + newChatrooms})` : ''} Tavo Reklama klubas | {ProjectName}</title> 
            </Helmet>
            <Box >
                {loyalty.length > 0 && 
                    <Box classes={{root: classes.searchResultBox}}>
                        {loyalty.map((item, index) => 
                            <Grid container display="flex" justifyContent='flex-start' alignItems='center' className={classes.item} onClick={() => {
                                if (user.administracija) {
                                    setAddLoyaltyModal({
                                        open: true,
                                        id: item._id,
                                        money: item.money,
                                        discount: item.discount,
                                    });
                                } else {
                                    setSnackbar({
                                        message: 'Tik administratorius gali redaguoti TR klubo lygius.',
                                        open: true,
                                    });
                                }
                            }}>
                                <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>{index + 1} Lygis</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>Nuo: {item.money} €</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>Nuolaida: {item.discount}%</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <Box display="flex" justifyContent='flex-end' alignItems='center'>
                                            {user.administracija &&
                                                <Tooltip title='Ištrinti' placement="top" arrow>
                                                    <div className={classes.iconBox} >
                                                        <FaTrash size={20} className={classes.deleteIcon} onClick={(e) => openDeleteModal(e, item._id)}/> 
                                                    </div>
                                                </Tooltip>
                                            }
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                }
            </Box>
        </div>
    )
}

export default Loyalty
