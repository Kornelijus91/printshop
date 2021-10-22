import { useState, useEffect } from 'react'
import { Container, Box, Grid, Tooltip  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CgMathPlus } from "react-icons/cg";
import AddModalv2 from './AddModalv2';
import DeleteModal from './DeleteModal';
import { Redirect } from 'react-router-dom';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

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
    },
    body: {
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        width: '48rem',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    add: {
        height: '9rem',
        width: '20rem',
        border: `.2rem dashed ${theme.myTheme.sriftoSpalva}`,
        borderRadius: '1rem',
        margin: '0 0 1rem 0',
        '&:hover': {
            cursor: "pointer",
            border: `.2rem dashed ${theme.myTheme.antra}`,
            color: theme.myTheme.antra,
        },
        [theme.breakpoints.up('sm')]: {
            height: '9rem',
            width: '16rem',
            margin: '0 0 1rem 1rem',
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 0 1rem 0',
        },
    },
    plusBox: {
        margin: '0',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    adresaiHeaser: {
        margin: '1rem 0 1rem 0',
        [theme.breakpoints.up('sm')]: {
            margin: '1rem 0 1rem 1rem',
        },
        [theme.breakpoints.up('md')]: {
            margin: '1rem 0 1rem 0',
        },
    },
    addressContainer: {
        [theme.breakpoints.up('xs')]: {
            width: '20rem',
            display: 'flex', 
            justifyContent: 'center'
        },
        [theme.breakpoints.up('sm')]: {
            width: '40rem',
            display: 'flex', 
            justifyContent: 'flex-start'
        },
        [theme.breakpoints.up('md')]: {
            width: '48rem',
            margin: '0',
            padding: '0',
            
        },
    },
    addressItem: {
        [theme.breakpoints.up('xs')]: {
            borderRadius: '1rem',
            backgroundColor: theme.myTheme.pirma,
            color: theme.myTheme.sriftoSpalva,
            padding: ' 0 1rem 0 1rem',
            margin: '0 0 1rem 0',
            fontSize: '1rem',
            overflowWrap: 'break-word'
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 1rem 1rem 1rem',
        },
        [theme.breakpoints.up('md')]: {
            padding: ' 0 1rem 0 1rem',
            margin: '0 1rem 1rem 0',
            fontSize: '1rem',
            height: '100%'
        },
    },
    icon: {
        color: theme.myTheme.sriftoSpalva,
        margin: '0 0 1rem 0',
        '&:hover': {
            cursor: "pointer",
            color: '#0d1726',
        },
    },
    mobileAlign: {
        [theme.breakpoints.up('xs')]: {
            display: 'flex', 
            justifyContent: 'center'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'flex', 
            justifyContent: 'flex-start'
        },
    },
    firstRow: {
        marginRight: '1rem'
    },
}));

const Addresses = ({token, loggedIn}) => {

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
    const [addresses, setAddresses] = useState([]);
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
            <Grid item key={address._id} xl={6} lg={6} md={6} sm={12} xs={12} style={{marginBottom: '1rem'}}>
                <Box classes={{root: classes.addressItem}}>
                    <Grid container>
                        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                            <Grid container>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                            <p className={classes.firstRow}><b>Miestas:</b> {address.city}</p>
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                            <p><b>Adresas:</b> {address.address}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                            <p className={classes.firstRow}><b>Pašto kodas:</b> {address.zipCode}</p>
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                            {address.companyName !== '' && <p><b>Įmonės pavadinimas:</b> {address.companyName}</p>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                            {address.companyCode !== '' && <p className={classes.firstRow}><b>Įmonės kodas:</b> {address.companyCode}</p>}
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                            {address.companyAddress !== '' && <p><b>Įmonės adresas:</b> {address.companyAddress}</p>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Grid container>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                            {address.companyPVMCode !== '' && <p className={classes.firstRow}><b>Įmonės PVM kodas:</b> {address.companyPVMCode}</p>}
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                            {address.budgetCompany && <p><b>Biudžetinė įstaiga.</b></p>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Box display='flex' justifyContent='flex-end' alignItems='center' style={{paddingTop: '1rem'}}>
                                <Tooltip title="Redaguoti" aria-label="Redaguoti" placement="top" arrow >
                                    <div>
                                        <AiFillEdit 
                                            size={20} 
                                            // style={{marginTop: '1rem'}} 
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
                                    </div>
                                </Tooltip>
                            </Box>
                            <Box display='flex' justifyContent='flex-end' alignItems='flex-end'>
                                <Tooltip title="Ištrinti" aria-label="Ištrinti" placement="top" arrow>
                                    <div>
                                        <AiFillDelete size={20} onClick={() => {setDeleteAddressId(address._id); setDeleteModal(true)}} className={classes.icon}/>
                                    </div>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        )
        return (
            <Box classes={{root: classes.mobileAlign}}>
                {addresses.length > 0 ? 
                    <Grid container classes={{root: classes.addressContainer}}>
                        {component}
                    </Grid>
                :
                    <h2>Nesate pridėję siuntimo adresų.</h2>
                }
            </Box>
           
        )
    }

    const getAddresses = async () => {
        try{
            const addressesFetch = await fetch("/users/myAddresses/", {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                },
            });
            const addressesResponse = await addressesFetch.json();
            setAddresses(addressesResponse.addresses);
        } catch (error) {

        } 
    };
    
    useEffect(() => {
        getAddresses();
        // eslint-disable-next-line
    }, [])

    return (
        <Container maxWidth='xl' classes={{root: classes.root}}>
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
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Box classes={{root: classes.box}}>
                            <Box classes={{root: classes.mobileAlign}}>
                                <h1 className={classes.adresaiHeaser}>Mano adresai</h1>
                            </Box>
                            <Box classes={{root: classes.mobileAlign}}>
                                <AddressesComponent />
                            </Box>
                            <Box classes={{root: classes.mobileAlign}}>
                                <Box>
                                    <Box 
                                        classes={{root: classes.add}} 
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
                                        <Box>
                                            <h3 style={{textAlign: 'center'}}>Pridėti adresą.</h3>
                                            <Box classes={{root: classes.plusBox}}><CgMathPlus size={50}/></Box>
                                        </Box>
                                    </Box> 
                                </Box> 
                            </Box>
                        </Box>
                    </Box>
                </Box>
            : 
                <Redirect to="/" />
            }
        </Container>
    )
}

export default Addresses
