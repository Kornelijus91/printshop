import { useState, useEffect } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxHeight: '13.5rem',
        backgroundColor: theme.myTheme.sriftoSpalva,
        margin: '1rem 0 0 0',
        fontFamily: theme.myTheme.sriftas,
        overflowY: 'auto',
        overflowZ: 'auto',
        [theme.breakpoints.up('sm')]: {
            maxHeight: '47rem',
            // overflowZ: 'none',
            width: '99%',
        },
        [theme.breakpoints.up('md')]: {
            maxHeight: '47rem',
            // overflowZ: 'none',
            width: '100%',
        },
        [theme.breakpoints.up('xxl')]: {
            maxHeight: '71rem',
        }, 
        [theme.breakpoints.up('xxxl')]: {
            maxHeight: '94rem',
        },
    },
    table: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.trecia,
        height: '100%'
    },
    cell: {
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.trecia,
        maxWidth: '10rem',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            maxWidth: '15rem',
            fontSize: '1.4rem',
            margin: '.5rem 0'
        }, 
        [theme.breakpoints.up('xxxl')]: {
            maxWidth: '20rem',
            fontSize: '1.8rem',
            margin: '.75rem 0'
        },
    },
    noResult: {
        width: '99%',
        backgroundColor: theme.myTheme.ketvirta,
        padding: '1rem',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        borderRadius: '7px',
        [theme.breakpoints.up('xxl')]: {
            padding: '1.5rem',
            fontSize: '1.5rem',
        }, 
        [theme.breakpoints.up('xxxl')]: {
            padding: '2rem',
            fontSize: '2rem',
        },
    },
}));

const UserAddresses = ({ userId, setSnackbar, token }) => {

    const classes = useStyles();

    const [userAddresses, setUserAddresses] = useState([]);

    const getuserAddresses = async () => {
        try {
            const getAddressesRequest = await fetch("/administracija/getUserAddresses/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    id: userId,
                }),
            });
            const getAddressesResponse = await getAddressesRequest.json();
            if(getAddressesResponse.success) {
                setUserAddresses(getAddressesResponse.result);
            } else {
                setSnackbar({
                    open: true,
                    message: 'Klaida! Pabandykite vėliau.'
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: `${error}`
            });
        } 
    };

    useEffect(() => {
        getuserAddresses();
        // eslint-disable-next-line
    }, [])

    return (
        <Box classes={{root: classes.root}}>
            {userAddresses.length > 0 ?
                <TableContainer component={Paper} style={{backgroundColor: 'transparent'}}>
                    <Table classes={{root: classes.table}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" classes={{root: classes.cell}}>Miestas:</TableCell>
                                <TableCell align="left" classes={{root: classes.cell}}>Adresas:</TableCell>
                                <TableCell align="left" classes={{root: classes.cell}}>Pašto kodas:</TableCell>
                                <TableCell align="left" classes={{root: classes.cell}}>Įmonės pavadinimas:</TableCell>
                                <TableCell align="left" classes={{root: classes.cell}}>Įmonės kodas:</TableCell>
                                <TableCell align="left" classes={{root: classes.cell}}>Įmonės adresas:</TableCell>
                                <TableCell align="left" classes={{root: classes.cell}}>Įmonės PVM kodas:</TableCell>
                                {/* <TableCell align="left" classes={{root: classes.cell}}>Biudžetinė įstaiga:</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userAddresses.map((item) => 
                                <TableRow key={item.id}>
                                    <TableCell align="left" classes={{root: classes.cell}}>{item.city}</TableCell>
                                    <TableCell align="left" classes={{root: classes.cell}}>{item.address}</TableCell>
                                    <TableCell align="left" classes={{root: classes.cell}}>{item.zipCode}</TableCell>
                                    <TableCell align="left" classes={{root: classes.cell}}>{item.companyName}</TableCell>
                                    <TableCell align="left" classes={{root: classes.cell}}>{item.companyCode}</TableCell>
                                    <TableCell align="left" classes={{root: classes.cell}}>{item.companyAddress}</TableCell>
                                    <TableCell align="left" classes={{root: classes.cell}}>{item.companyPVMCode}</TableCell>
                                    {/* <TableCell align="left" classes={{root: classes.cell}}>{item.companyName !== '' ? item.budgetCompany ? 'Taip' : 'Ne' : ''}</TableCell> */}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            :
                <Box classes={{root: classes.noResult}}>
                    <p style={{margin: '.5rem 0 .5rem 0', padding: '0'}}>Vartotojas nėra pateikęs siuntimo adresų.</p>
                </Box>
            }
        </Box>
    )
}

export default UserAddresses
