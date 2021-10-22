import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaTrash } from 'react-icons/fa';
import { Box, Grid, Tooltip } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx';
import AddCodeModal from './AddCodeModal';
import Pagination from '@material-ui/lab/Pagination';
import DeleteCodeModal from './DeleteCodeModal';

const useStyles = makeStyles((theme) => ({
    accountsBoxPagination: {
        marginTop: '.2rem'
    },
    pagination: {
        marginBottom: '.5rem'
    },
    paginationel: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        marginBottom: '.5rem'
    },
    searchResultBox: {
        backgroundColor: theme.myTheme.antra,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '7px',
        margin: '.5rem 0 0 0',
        padding: '.5rem .5rem .001rem .5rem',
        width: '99%',
    },
    infosection: {
        marginLeft: '1rem'
    },
    itemActive: {
        backgroundColor: '#26a69a',
        color: theme.myTheme.trecia,
        borderRadius: '7px',
        margin: '0 0 .5rem 0',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#1c7d73',
        },
    },
    itemNotActive: {
        backgroundColor: theme.myTheme.pirma,
        color: theme.myTheme.trecia,
        borderRadius: '7px',
        margin: '0 0 .5rem 0',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#cc1928',
        },
    },
    deleteIcon: {
        color: theme.myTheme.trecia,
        '&:hover': {
            cursor: 'pointer',
            color:'#f2f2f2',
        },
    },
}));

const DiscountCodes = ({ user, setSnackbar, codeModal, setCodeModal, handleCodeChange }) => {

    const classes = useStyles();

    const [page, setPage] = useState(1);
    const [pageDetails, setPageDetails] = useState({
        items: [],
        totalItems: 0,
        itemLimit: 0,
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        nextPage: null,
        hasPrevPage: false,
        prevPage: null,
        pagingCounter: 0
    });

    const [deleteModal, setDeleteModal] = useState({
        submitting: false,
        open: false,
        codeID: '',
    });

    const openDeleteModal = (e, deleteID) => {
        e.stopPropagation();
        setDeleteModal({
            submitting: false,
            open: true,
            codeID: deleteID,
        });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const getAllCodes = async (page) => {
        try {
            const getAllCodesRequest = await fetch("/administracija/getAllCodes/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    page: page,
                }),
            });
            const getAllCodesResponse = await getAllCodesRequest.json();
            if (getAllCodesResponse.success) {
                setPageDetails({
                    items: getAllCodesResponse.items,
                    totalItems: getAllCodesResponse.totalItems,
                    itemLimit: getAllCodesResponse.itemLimit,
                    currentPage: getAllCodesResponse.currentPage,
                    totalPages: getAllCodesResponse.totalPages,
                    hasNextPage: getAllCodesResponse.hasNextPage,
                    nextPage: getAllCodesResponse.nextPage,
                    hasPrevPage: getAllCodesResponse.hasPrevPage,
                    prevPage: getAllCodesResponse.prevPage,
                    pagingCounter: getAllCodesResponse.pagingCounter
                });
            } else {
                setSnackbar({
                    message: 'Klaida! Nepavyko gauti nuolaidos kodų iš serverio. Pabandykite vėliau.',
                    open: true,
                });
            }

        } catch (error) {
            setSnackbar({
                message: `${error}`,
                open: true,
            });
        }
    };

    const isActive = (oneuse, used, valid) => {
        if ((oneuse && used > 0) || new Date(valid) <= new Date()) {
            return false;
        } else {
            return true;
        }
    };

    useEffect(() => {
        getAllCodes(page);
        // eslint-disable-next-line
    }, [page])

    return (
        <div>
            <Helmet>
                <title>Nuolaidų kodai | {ProjectName}</title> 
            </Helmet>
            <AddCodeModal 
                user={user} 
                setSnackbar={setSnackbar}
                codeModal={codeModal}
                setCodeModal={setCodeModal}
                handleCodeChange={handleCodeChange}
                getAllCodes={getAllCodes}
                page={pageDetails.totalPages < page ? pageDetails.totalPages : page}
            />
            <DeleteCodeModal 
                user={user}
                setSnackbar={setSnackbar}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                getAllCodes={getAllCodes}
            />
            <Box >
                {pageDetails.items.length > 0 && 
                    <Box classes={{root: classes.searchResultBox}}>
                        {pageDetails.items.map((item) => 
                            <Grid 
                                container display="flex" 
                                justifyContent='flex-start' 
                                alignItems='center' 
                                className={isActive(item.oneuse, item.used, item.valid) ? classes.itemActive : classes.itemNotActive}
                                onClick={() => {
                                    setCodeModal({
                                        open: true,
                                        id: item._id,
                                        code: item.code,
                                        discount: item.discount,
                                        oneuse: item.oneuse,
                                        valid: new Date(item.valid)
                                    });
                                }}
                            >
                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>{item.code}</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>Nuolaida: {item.discount}%</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>{!item.oneuse ? 'Daugkartinis' : 'Vienkartinis'}</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>Panaudotas {item.used} kartų</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>Galioja iki: {new Date(item.valid).getDate()+"/"+(new Date(item.valid).getMonth() + 1)+"/"+new Date(item.valid).getFullYear()}</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <Box display="flex" justifyContent='flex-end' alignItems='center'>
                                            <Tooltip title='Ištrinti' placement="top" arrow>
                                                <div style={{display: 'inline-block', marginRight: '1rem'}}>
                                                    <FaTrash size={20} className={classes.deleteIcon} onClick={(e) => openDeleteModal(e, item._id)}/> 
                                                </div>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                        { pageDetails.totalPages > 1 &&
                            <Box classes={{root: classes.accountsBoxPagination}}>
                                <Pagination 
                                    classes={{root: classes.pagination, ul: classes.paginationel}}
                                    count={pageDetails.totalPages} 
                                    page={page} 
                                    onChange={handlePageChange} 
                                    hideNextButton={true}
                                    hidePrevButton={true}
                                />
                            </Box>
                        }
                    </Box>
                }
            </Box>
        </div>
    )
}

export default DiscountCodes
