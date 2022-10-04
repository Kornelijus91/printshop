import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, CircularProgress, Tooltip } from '@material-ui/core';
import { FaTrash, FaStar, FaImage } from 'react-icons/fa';
import {Helmet} from "react-helmet";
import Pagination from '@material-ui/lab/Pagination';
import ProductModal from './ProductModal'
import DeleteProductModal from './DeleteProductModal';
import { ProjectName } from '../../../Variables.jsx'
import GalerijaModal from './GalerijaModal'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem 0 0 0',
        // height: '97vh',
        // width: '96.5%',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem 0 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '4rem 0 0 0',
        },
    },
    header: {
        margin: '0',
        padding: '0',
        fontSize: '1.5rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.25rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3rem',
        },
    },
    accountsBox: {
        // backgroundColor: theme.myTheme.antra,
        borderRadius: '7px',
        padding: '0',
        width: '99%',
        height: '85%',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
        },
    },
    accountsBoxInner: {
        height: '95%',
        overflowY: 'auto'
    },
    accountsBoxPagination: {
        marginTop: '.2rem',
        padding: '0 0 .5rem .2rem',
        [theme.breakpoints.up('xxl')]: {
            marginTop: '.3rem',
            padding: '0 0 .75rem .3rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '.4rem',
            padding: '0 0 1rem .4rem',
            
        },
    },
    pagination:{
        
    },
    paginationel: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        
    },
    progressIcon: {
        color: theme.myTheme.sriftoSpalva,
    },
    item: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '7px',
        padding: '.5rem .5rem 0 .5rem',
        margin: '.5rem 0',
        maxWidth: '97%',
        '&:hover': {
            cursor: "pointer",
            backgroundColor: '#0d1726',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '98.8%',
            padding: '.3rem .3rem .3rem 1.5rem',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
            padding: '.7rem',
            margin: '.7rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            padding: '1.2rem',
            margin: '1.2rem 0',
        },
    },
    deleteIcon: {
        color: theme.myTheme.trecia,
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
    starIcon: {
        color: '#ffeb3b',
        '&:hover': {
            color: '#e6cf00',
            cursor: 'pointer'
        }, 
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    image: {
        maxWidth: '3rem',
        maxheight: '3rem',
        objectFit: 'contain',
        margin: '0',
        padding: '0',
        // backgroundColor: theme.myTheme.trecia,
        borderRadius: '7px',
        [theme.breakpoints.up('xxl')]: {
            maxWidth: '4.5rem',
            maxheight: '4.5rem',
            borderRadius: '10px',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxWidth: '6rem',
            maxheight: '6rem',
            borderRadius: '14px',
        },
    },
    infosection: {
        height: '100%',
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            '& p': {
                margin: 0,
                padding: 0,
            }, 
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            // '& p': {
            //     margin: 0,
            //     padding: 0,
            // }, 
        },
    },
    trashsection: {
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        height: '100%'
    },
}));

const Products = ({ newOrders, newChatrooms, user, setSnackbar, productModalOpen, setProductModalOpen }) => {

    const classes = useStyles();
    
    const [page, setPage] = useState(1);
    const [submitting, setSubmitting] = useState(false);
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

    const [file, setFile] = useState({
        src: null,
        URL: ''
    });

    const [productInfo, setProductInfo] = useState({
        id: '',
        name: '',
        description: '',
        price: null,
        discountPrice: null,
        minOrderAmount: 1,
        amountDiscount: [],
        options: [],
        oneDayLimit: 1,
        twoDayLimit: 1,
        oneDayPriceIncreace: 0,
        twoDayPriceIncreace: 0,
        pictureAmount: 1,
        templateID: '',
        kiekioPasirinkimas: 0,
        kainosModelis: 0,
        basePrice: 0,
        baseDiscount: 0,
    });

    const [deleteModal, setDeleteModal] = useState({
        submitting: false,
        open: false,
        productID: '',
        productName: '',
    });

    const [galerijaModal, setGalerijaModal] = useState({
        open: false,
        productID: '',
        productName: '',
        productGalerija: [],
    });

    const [productOptionsMemo, setProductOptionsMemo] = useState([]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const getAllProducts = async (page) => {
        setSubmitting(true);
        try {
            const getProductsRequest = await fetch("/administracija/getProducts/", {
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
            const getProductsResponse = await getProductsRequest.json();
            if (getProductsResponse.success) {
                setSubmitting(false);
                setPageDetails({
                    items: getProductsResponse.items,
                    totalItems: getProductsResponse.totalItems,
                    itemLimit: getProductsResponse.itemLimit,
                    currentPage: getProductsResponse.currentPage,
                    totalPages: getProductsResponse.totalPages,
                    hasNextPage: getProductsResponse.hasNextPage,
                    nextPage: getProductsResponse.nextPage,
                    hasPrevPage: getProductsResponse.hasPrevPage,
                    prevPage: getProductsResponse.prevPage,
                    pagingCounter: getProductsResponse.pagingCounter
                });
            } else {
                setSubmitting(false);
                setSnackbar({
                    message: 'Klaida! Nepavyko gauti produktų duomenų iš serverio. Pabandykite vėliau.',
                    open: true,
                });
            }

        } catch (error) {
            setSubmitting(false);
            setSnackbar({
                message: `${error}`,
                open: true,
            });
        }
    };

    const openDeleteModal = (e, deleteID, deleteName) => {
        e.stopPropagation();
        setDeleteModal({
            submitting: false,
            open: true,
            productID: deleteID,
            productName: deleteName,
        });
    };

    const openGalerijaModal = (e, productID, productName, productGalerija) => {
        e.stopPropagation();
        setGalerijaModal({
            open: true,
            productID: productID,
            productName: productName,
            productGalerija: productGalerija,
        });
    };

    const fillProductOptionsMemo = (optionData) => {
        var tempArray = [];
        for (var i = 0; i < optionData.length; i++) {
            const tempItem = {
                fileSrc: null,
                fileURL: '',
                fileOriginalName: '',
                variantName: '',
                variantDesc: '',
                priceAdd: 0,
                optionIndex: null,
                summonID: 0,
            }
            tempArray.push(tempItem);
        }
        setProductOptionsMemo(tempArray);
    };

    const handleHomepageAdd = async (e, toHomepageProductId) => {
        e.stopPropagation();
        try {
            const handleHomepageAddRequest = await fetch("/administracija/homepageproduct/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    productID: toHomepageProductId,
                }),
            });
            const handleHomepageAddResponse = await handleHomepageAddRequest.json();
            if (handleHomepageAddResponse.success) {
                getAllProducts(page);
                setSnackbar({
                    message: handleHomepageAddResponse.message,
                    open: true,
                });
            } else {
                setSnackbar({
                    message: handleHomepageAddResponse.error,
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

    const priceRange = (item) => {
        if (item.length > 1) {
            var min = item[0].price;
            var max = item[0].price;
            for (const x of item) {
                if (x.price < min){
                    min = x.price;
                }
                if (x.price > max){
                    max = x.price;
                }
            }
            return(`${min}€ - ${max}€`);
        } else {
            if (item[0].price) {
                return(`${item[0].price}€`);
            } else {
                return('Error');
            }
        }
    };

    const discountRange = (item) => {
        if (item.length > 1) {
            var min = item[0].discount;
            var max = item[0].discount;
            for (const x of item) {
                if (x.discount < min){
                    min = x.discount;
                }
                if (x.discount > max){
                    max = x.discount;
                }
            }
            if (max > 0) {
                return(`${min}% - ${max}%`);
            } else {
                return('Nėra');
            }
        } else {
            if (item[0].discount !== null) {
                if (item[0].discount > 0) {
                    return(`${item[0].discount}%`);
                } else {
                    return('Nėra');
                }
            } else {
                return('Error');
            }
        }
    };

    useEffect(() => {
        getAllProducts(page);
        // eslint-disable-next-line
    }, [page])

    return (
        <Box classes={{root: classes.root}}>
            <Helmet defer={false}>
                <title>{newOrders + newChatrooms > 0 ? `(${newOrders + newChatrooms})` : ''} Produktai | {ProjectName}</title>  
            </Helmet>
            <ProductModal 
                productModalOpen={productModalOpen} 
                setProductModalOpen={setProductModalOpen} 
                setSnackbar={setSnackbar} 
                user={user}
                file={file}
                setFile={setFile}
                productInfo={productInfo}
                setProductInfo={setProductInfo}
                productOptionsMemo={productOptionsMemo}
                setProductOptionsMemo={setProductOptionsMemo}
                getAllProducts={getAllProducts}
                page={pageDetails.totalPages < page ? pageDetails.totalPages : page}
            />
            <DeleteProductModal 
                deleteModal={deleteModal} 
                setDeleteModal={setDeleteModal} 
                user={user} 
                setSnackbar={setSnackbar} 
                getAllProducts={getAllProducts}
                page={pageDetails.totalPages < page ? pageDetails.totalPages : page}
            />
            <GalerijaModal 
                galerijaModal={galerijaModal} 
                setGalerijaModal={setGalerijaModal}
                setSnackbar={setSnackbar}
                user={user} 
                getAllProducts={getAllProducts}
                page={pageDetails.totalPages < page ? pageDetails.totalPages : page}
            />
            {pageDetails.items.length > 0 ?
                <Box classes={{root: classes.accountsBox}}>
                    <Box classes={{root: classes.accountsBoxInner}}>
                        {pageDetails.items.map((item) => 
                            <Grid container display="flex" justifyContent='center' alignItems='center' className={classes.item} key={item._id}
                                onClick={() => {
                                    if (user.administracija) {
                                        setProductInfo({
                                            id: item._id,
                                            name: item.name,
                                            description: item.description,
                                            price: item.price,
                                            discountPrice: item.discount,
                                            minOrderAmount: item.minOrderAmount,
                                            amountDiscount: item.amountDiscount,
                                            options: item.options,
                                            oneDayLimit: item.oneDayLimit,
                                            twoDayLimit: item.twoDayLimit,
                                            oneDayPriceIncreace: item.oneDayPriceIncreace,
                                            twoDayPriceIncreace: item.twoDayPriceIncreace,
                                            pictureAmount: item.pictureAmount,
                                            templateID: item.templateID,
                                            kiekioPasirinkimas: item.kiekioPasirinkimoModelis,
                                            kainosModelis: item.kainosModelis,
                                            basePrice: item.basePrice,
                                            baseDiscount: item.baseDiscount,
                                        });
                                        setFile({
                                            src: null,
                                            URL: item.image
                                        });
                                        fillProductOptionsMemo(item.options);
                                        setProductModalOpen(true);
                                    } else {
                                        setSnackbar({
                                            message: 'Tik administratorius gali redaguoti produktus.',
                                            open: true,
                                        });
                                    }
                                }}
                            >
                                <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                                    <Grid container>
                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                            <Box classes={{root: classes.infosection}} >
                                                <Box display='flex' justifyContent='center' alignItems='center' style={{marginLeft: '1rem'}}>
                                                    <img src={item.image} alt={`${item.name}`} className={classes.image}/>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                            <Box classes={{root: classes.infosection}}>
                                                <p>{item.name}</p>
                                            </Box>
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                            <Box classes={{root: classes.infosection}}>
                                                <p>Kaina: {priceRange(item.amountDiscount)}</p>
                                            </Box>
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                            <Box classes={{root: classes.infosection}}>
                                                <p>Nuolaida: {discountRange(item.amountDiscount)}</p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                    { user.administracija &&
                                        <Box classes={{root: classes.trashsection}}>
                                            <Box style={{marginRight: '1rem'}} display='flex' justifyContent='center' alignItems='center'>
                                                <Tooltip title={item.homepage ? 'Išimti i pagrindinio puslapio' : 'Pridėti prie pagrindinio puslapio'} placement="top" arrow>
                                                    <div>
                                                        <FaStar size={20} className={item.homepage ? classes.starIcon : classes.deleteIcon} onClick={(e) => handleHomepageAdd(e, item._id)}/> 
                                                    </div>
                                                </Tooltip>
                                            </Box> 
                                        </Box>
                                    }
                                </Grid>
                                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                    { user.administracija &&
                                        <Box classes={{root: classes.trashsection}}>
                                            <Box style={{marginRight: '1rem'}} display='flex' justifyContent='center' alignItems='center'>
                                                <Tooltip title='Ištrinti' placement="top" arrow>
                                                    <div>
                                                        <FaTrash size={20} className={classes.deleteIcon} onClick={(e) => openDeleteModal(e, item._id, item.name)}/> 
                                                    </div>
                                                </Tooltip>
                                            </Box> 
                                        </Box>
                                    }
                                </Grid> */}
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    { user.administracija &&
                                        <Grid container display="flex" justifyContent='flex-end' alignItems='center'>
                                            <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                                <Box classes={{root: classes.trashsection}}>
                                                    <Box style={{marginRight: '1rem'}} display='flex' justifyContent='center' alignItems='center'>
                                                        <Tooltip title='Galerija' placement="top" arrow>
                                                            <div>
                                                                <FaImage size={20} className={classes.deleteIcon} onClick={(e) => openGalerijaModal(e, item._id, item.name, item.galerija)}/> 
                                                            </div>
                                                        </Tooltip>
                                                    </Box> 
                                                </Box>
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                                <Box classes={{root: classes.trashsection}}>
                                                    <Box style={{marginRight: '1rem'}} display='flex' justifyContent='center' alignItems='center'>
                                                        <Tooltip title={item.homepage ? 'Išimti i pagrindinio puslapio' : 'Pridėti prie pagrindinio puslapio'} placement="top" arrow>
                                                            <div>
                                                                <FaStar size={20} className={item.homepage ? classes.starIcon : classes.deleteIcon} onClick={(e) => handleHomepageAdd(e, item._id)}/> 
                                                            </div>
                                                        </Tooltip>
                                                    </Box> 
                                                </Box>
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                                <Box classes={{root: classes.trashsection}}>
                                                    <Box style={{marginRight: '1rem'}} display='flex' justifyContent='center' alignItems='center'>
                                                        {user.administracija &&
                                                            <Tooltip title='Ištrinti' placement="top" arrow>
                                                                <div>
                                                                    <FaTrash size={20} className={classes.deleteIcon} onClick={(e) => openDeleteModal(e, item._id, item.name)}/> 
                                                                </div>
                                                            </Tooltip>
                                                        }
                                                    </Box> 
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        )}
                    </Box>
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
            :
                submitting ? 
                    <Box classes={{root: classes.accountsBox}} >
                        <Box style={{width: '100%', height: '100%'}} display='flex' justifyContent='center' alignItems='center'>
                            <CircularProgress size={40} className={classes.progressIcon}/>
                        </Box>
                    </Box>
                :
                <Box classes={{root: classes.accountsBox}}>
                    <Box style={{width: '100%', height: '100%'}} display='flex' justifyContent='flex-start' alignItems='center'>
                        <h3 className={classes.header} style={{margin: '1rem'}}>Produktų nėra.</h3>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default Products
