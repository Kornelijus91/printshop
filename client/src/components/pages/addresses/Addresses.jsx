import { useState, useEffect } from 'react'
import { Box, Button, Grid, Tooltip, Breadcrumbs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddModalv2 from './AddModalv2';
import DeleteModal from './DeleteModal';
import { Redirect } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'left',
        minHeight: '88vh',
        backgroundColor: theme.myTheme.trecia,
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000',
        display: 'flex',
        justifyContent: 'center',
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '60%',
        },
    },
    bodyInner: {
        minWidth: '100%',
        padding: '.5rem',
        [theme.breakpoints.up('lg')]: {
            padding: 0,
        },
    },
    addButton: {
        width: '100%',
        marginBottom: ".5rem",
        borderRadius: '6px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#cc0000',
        },
        [theme.breakpoints.up('xxl')]: {
            marginBottom: ".75rem",
            borderRadius: '9px',
            height: '3.375rem',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "1rem",
            borderRadius: '12px',
            height: '4.5rem',
            fontSize: '1.6rem',
        },
    },
    adresaiHeaser: {
        margin: '1rem 0 ',
        [theme.breakpoints.up('xxl')]: {
            margin: '1.35rem 0',
            fontSize: '2.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 0',
            fontSize: '3.6rem',
        },
    },
    addressItem: {
        borderRadius: '5px',
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        // backgroundColor: theme.myTheme.antra,
        color: theme.myTheme.sriftoSpalva,
        fontSize: '.7rem',
        overflowWrap: 'break-word',
        marginBottom: '1rem',
        padding: '.5rem 1rem',
        '& p': {
            margin: 0,
            padding: 0,
        },
        [theme.breakpoints.up('xs')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            fontSize: '1.35rem',
            marginBottom: '1.35rem',
            padding: '.675rem 1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            fontSize: '2rem',
            marginBottom: '2rem',
            padding: '1rem 2rem',
        },
    },
    icon: {
        color: theme.myTheme.sriftoSpalva,
        margin: '0',
        transform: 'scale(0.7)',
        '&:hover': {
            cursor: "pointer",
            color: '#264673',
        },
        [theme.breakpoints.up('xs')]: {
            transform: 'scale(1)'
        },
        [theme.breakpoints.up('xxl')]: {
           transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    breadcrumbLink: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        '&:hover': {
            color: '#2d5286',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    breadcrumbLinkDisabled: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        pointerEvents: 'none',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    breakcrumbs: {
        margin: '.5rem 0 0 0',
        [theme.breakpoints.up('md')]: {
            margin: '1rem 0 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '1rem 0 0 0',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '1rem 0 0 0',
            fontSize: '1.8rem',
        },
    },
}));

const Addresses = ({token, loggedIn, getAddresses, addresses}) => {

    const classes = useStyles();

    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editAddress, setEditAddress] = useState({
        id: '',
        city: '',
        address: '',
        zipCode: '',
        companyName: '',
        companyCode: '',
        companyAddress: '',
        companyPVMCode: '',
        budgetCompany: false
    });
    const [deleteAddressId, setDeleteAddressId] = useState('');
    const [modalView, setmodalView] = useState("Fizinis asmuo");


    const deleteAddress = async () => {
        setDeleting(true);
        try {   
            const deleteAddress = await fetch("/users/deleteAddress/", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    addressId: deleteAddressId
                }),
            });
            const deleteAddressResponse = await deleteAddress.json();
            if (deleteAddressResponse.success) {
                getAddresses();
                setDeleting(false);
                return true;
            } else {
                setDeleting(false);
                return false;
            }
        } catch (error) {
            setDeleting(false);
            return false;
        }
    };
    
    const AddressesComponent = () => {
        const component = addresses.map((address) => 
            <Box classes={{root: classes.addressItem}}>
                <Grid container display='flex' justifyContent='flex-start' alignItems='flex-start'>
                    <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                        <Grid container spacing={2}>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <p><b>Miestas:</b> {address.city}</p> 
                            </Grid>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <p><b>Adresas:</b> {address.address}</p>
                            </Grid>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <p><b>Pašto kodas:</b> {address.zipCode}</p>
                            </Grid>
                            {address.companyName !== '' && 
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                    <p><b>Įmonės pavadinimas:</b> {address.companyName}</p>
                                </Grid>
                            }
                            {address.companyCode !== '' && 
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                    <p><b>Įmonės kodas:</b> {address.companyCode}</p>
                                </Grid>
                            }
                            {address.companyAddress !== '' && 
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                    <p><b>Įmonės adresas:</b> {address.companyAddress}</p>
                                </Grid>
                            }
                            {address.companyPVMCode !== '' && 
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                    <p><b>Įmonės PVM kodas:</b> {address.companyPVMCode}</p>
                                </Grid>
                            }
                            {/* {address.budgetCompany && 
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                    <p><b>Biudžetinė įstaiga.</b></p>
                                </Grid>
                            } */}
                        </Grid>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                        <Box display='flex' justifyContent='flex-end' alignItems='flex-start' style={{height: '100%'}}>
                            <Box>
                                <Tooltip title="Redaguoti" aria-label="Redaguoti" placement="top" arrow >
                                    <Box display='flex' justifyContent='center'>
                                        <AiFillEdit 
                                            size={20} 
                                            // style={{margin: '0 0 .5em .2em'}} 
                                            style={{marginBottom: '.5em'}} 
                                            className={classes.icon}
                                            onClick={() => {
                                                setEditAddress({
                                                    id: address._id,
                                                    city: address.city,
                                                    address: address.address,
                                                    zipCode: address.zipCode,
                                                    companyName: address.companyName,
                                                    companyCode: address.companyCode,
                                                    companyAddress: address.companyAddress,
                                                    companyPVMCode: address.companyPVMCode,
                                                    budgetCompany: address.budgetCompany
                                                });
                                                setModalAddOpen(true); 
                                            }}
                                        /> 
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Ištrinti" aria-label="Ištrinti" placement="top" arrow>
                                    <div>
                                        <IoClose size={25} onClick={() => {setDeleteAddressId(address._id); setDeleteModal(true)}} className={classes.icon}/>
                                    </div>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
        return (
            <Box >
                {addresses.length > 0 ? 
                    <>
                        {component}
                    </>
                :
                    <Box classes={{root: classes.addressItem}}>
                        <h3>Nesate pridėję siuntimo adresų.</h3>
                    </Box>
                }
            </Box>
           
        )
    }
    
    useEffect(() => {
        getAddresses();
        // eslint-disable-next-line
    }, [])

    return (
        <Box classes={{root: classes.root}}>
            <Helmet>
                <title>Adresai | {ProjectName}</title>  
            </Helmet>
            {loggedIn && token ? 
                <Box classes={{root: classes.body}}>
                    <AddModalv2 
                        token={token} 
                        setModalAddOpen={setModalAddOpen} 
                        modalAddOpen={modalAddOpen} 
                        getAddresses={getAddresses}
                        editAddress={editAddress}
                        setEditAddress={setEditAddress}
                        modalView={modalView} 
                        setmodalView={setmodalView}
                    />
                    <DeleteModal 
                        deleting = {deleting}
                        deleteModal = {deleteModal}
                        setDeleteModal = {setDeleteModal} 
                        deleteAddress = {deleteAddress}
                        setDeleteAddressId = {setDeleteAddressId}
                    />
                    <Box classes={{root: classes.bodyInner}}>
                        <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                            <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                            <Link to='/products' className={classes.breadcrumbLinkDisabled}>Adresai</Link>
                        </Breadcrumbs>
                        <h1 className={classes.adresaiHeaser}>Mano adresai</h1>
                        <AddressesComponent />
                        <Button 
                            classes={{root: classes.addButton}} 
                            onClick={() => {
                                setEditAddress({
                                    id: '',
                                    city: '',
                                    address: '',
                                    zipCode: '',
                                    companyName: '',
                                    companyCode: '',
                                    companyAddress: '',
                                    companyPVMCode: '',
                                    budgetCompany: false
                                });
                                setModalAddOpen(true); 
                            }}
                        >
                            Pridėti adresą
                        </Button> 
                    </Box>
                </Box>
            :
                <Redirect to="/" />
            }
        </Box>
    )
}

export default Addresses
