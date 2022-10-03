import { useState, useEffect } from 'react'
import { Box, Button, Grid, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddModalv2 from './AddModalv2';
import DeleteModal from './DeleteModal';
import { Redirect } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import Breadcurmbs from '../utils/Breadcurmbs';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'center',
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    bodyInner: {
        fontSize: theme.myTheme.sizeM,
        minWidth: '100%',
        padding: '.5rem',
        [theme.breakpoints.up('lg')]: {
            padding: 0,
        },
    },
    addButton: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        marginBottom: ".5em",
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: '3em',
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
    },
    adresaiHeaser: {
        fontSize: theme.myTheme.sizeXXXL,
        margin: '1em 0 ',
    },
    addressItem: {
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        border: `1px solid ${theme.myTheme.juoda}`,
        color: theme.myTheme.juoda,
        fontSize: theme.myTheme.sizeS,
        overflowWrap: 'break-word',
        marginBottom: '1em',
        padding: '.5em 1em',
        '& p': {
            margin: 0,
            padding: 0,
        },
        [theme.breakpoints.up('xs')]: {
            fontSize: theme.myTheme.sizeM,
        },
    },
    icon: {
        color: theme.myTheme.juoda,
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
                        <Breadcurmbs routes={[{path: 'addresses', name: 'Adresai'}]}/>
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
