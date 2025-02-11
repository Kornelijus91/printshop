import { Box, Grid, useMediaQuery, Badge } from '@material-ui/core'; 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FaCheck } from 'react-icons/fa';
import paymentCash from '../../../media/paymentCash.png';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingRight: '0.5em',
        [theme.breakpoints.up('xl')]: {
            paddingRight: 0,
        },
    },
    option: {
        fontSize: theme.myTheme.sizeM,
        objectFit: 'contain',
        padding: '2%',
        width: '100%',
        height: '2.8em'
        // margin: '.5% 2.5%',
    },
    gridItemParent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItem: {
        fontSize: theme.myTheme.sizeM,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        boxShadow: `0 0 0 ${theme.myTheme.juoda}`,
        // transition:'box-shadow .2s ease', 
        padding: '1em',
        width: '100%',
        '&:hover': {
            cursor: 'pointer',
            boxShadow: `2px 2px 4px ${theme.myTheme.juoda}`,
        },
        [theme.breakpoints.up('xxl')]: {
            // borderRadius: '7px',
            // padding: '1.35em',
            '&:hover': {
                boxShadow: `3px 3px 6px ${theme.myTheme.juoda}`,
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            // borderRadius: '9px',
            // padding: '2em',
            '&:hover': {
                boxShadow: `4px 4px 8px ${theme.myTheme.juoda}`,
            },
        },
    },
    gridSelectedItem: {
        fontSize: theme.myTheme.sizeM,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:  theme.myTheme.sizeBorderRadiusSmall,
        boxShadow: `0 0 0 2px ${theme.myTheme.tZalia.main}`,
        // transition:'box-shadow .3s ease', \
        padding: '1em',
        width: '100%',
        '&:hover': {
            cursor: 'pointer',
        },
        [theme.breakpoints.up('xxl')]: {
            // borderRadius: '7px',
            // padding: '1.35em',
            boxShadow: `0 0 0 3px ${theme.myTheme.tZalia.main}`,
        },
        [theme.breakpoints.up('xxxl')]: {
            // borderRadius: '9px',
            // padding: '2em',
            boxShadow: `0 0 0 4px ${theme.myTheme.tZalia.main}`,
        },
    },
    badgecontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    previewSelectedBadge: {
        fontSize: theme.myTheme.sizeM,
        height: '1.6em',
        width: '1.6em',
        borderRadius: '50%',
        backgroundColor: theme.myTheme.sZalia.main,
        // boxShadow: `0 0 0 2px ${theme.myTheme.trecia}`,
        // [theme.breakpoints.up('xxl')]: {
        //     height: '2.4rem',
        //     width: '2.4rem',
        //     boxShadow: `0 0 0 3px ${theme.myTheme.trecia}`,
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     height: '3.2rem',
        //     width: '3.2rem',
        //     boxShadow: `0 0 0 4px ${theme.myTheme.trecia}`,
        // },
    },
    checkMark: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.4)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
}));

const PaymentOptions = ({selectedPayment, setSelectedPayment, pasirinktasPristatymoBudas}) => {

    const classes = useStyles();
    const theme = useTheme();

    const screenSizexxl = useMediaQuery(theme.breakpoints.up('xxl'));
    const screenSizexxxl = useMediaQuery(theme.breakpoints.up('xxxl'));

    const paymentOptions = [
        {
            src: "https://bank.paysera.com/assets/image/payment_types/card.png",
            alt: "Payment cards",
            code: 'card',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/hanza.png",
            alt: 'AB bank "Swedbank"',
            code: 'hanza',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/vb2.png",
            alt: 'AB bank "SEB"',
            code: 'vb2',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/lt_revolut.png",
            alt: "Revolut",
            code: 'lt_revolut',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/nord.png",
            alt: "AS bank Luminor",
            code: 'nord',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/mb.png",
            alt: 'UAB bank "Medicinos Bankas"',
            code: 'mb',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/lku.png",
            alt: "Lithuanian credit union",
            code: 'lku',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/lt_n26.png",
            alt: "N26",
            code: 'lt_n26',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/sb.png",
            alt: 'AB bank "Šiaulių bankas"',
            code: 'sb',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/parex.png",
            alt: 'AS bank "Citadele"',
            code: 'parex',
        },
        {
            src: "https://bank.paysera.com/assets/image/payment_types/wallet.png",
            alt: "Paysera account",
            code: 'wallet',
        },
        {
            src: paymentCash,
            alt: "Grynais pinigais pristatymo metu.",
            code: 'cash',
        },
        // {
        //     src: "https://bank.paysera.com/assets/image/payment_types/lt_post.png",
        //     alt: '"Paypost" kiosks and Lithuanian post offices',
        //     code: 'lt_post',
        // },
        // {
        //     src: "https://bank.paysera.com/assets/image/payment_types/lt_perlas.png",
        //     alt: 'In "Perlas" lottery terminals',
        //     code: 'lt_perlas',
        // },
        // {
        //     src: "https://bank.paysera.com/assets/image/payment_types/barcode.png",
        //     alt: '"Lietuvos spauda" and "Narvesen" kiosks',
        //     code: 'barcode',
        // },
        // {
        //     src: "https://bank.paysera.com/assets/image/payment_types/maximalt.png",
        //     alt: "MAXIMA Lietuva",
        //     code: 'maximalt',
        // },
        // {
        //     src: "https://bank.paysera.com/assets/image/payment_types/webmoney.png",
        //     alt: 'International "WebMoney" system',
        //     code: 'webmoney',
        // },
        // {
        //     src: "https://bank.paysera.com/assets/image/payment_types/lt_gf_leasing.png",
        //     alt: "General Financing",
        //     code: 'lt_gf_leasing',
        // },
        // {
        //     src: "https://bank.paysera.com/assets/image/payment_types/lt_mokilizingas.png",
        //     alt: "Mokilizingas",
        //     code: 'lt_mokilizingas',
        // },

    ]

    return (
        <Box classes={{root: classes.root}}>
            <Grid container spacing={
                screenSizexxxl ? 4 :
                screenSizexxl ? 3 : 2
            }>
                {paymentOptions.map((option, index) => 
                    <Grid 
                        item xl={2} lg={2} md={3} sm={4} xs={6} 
                        className={classes.gridItemParent} 
                        key={index} 
                        onClick={() => setSelectedPayment(option.code)}
                        style={option.code === 'cash' && pasirinktasPristatymoBudas.name !== 'Kurjeriu, nurodytu adresu.' ? {
                            display: 'none'
                        }: {}}
                    >
                        <Badge 
                            classes={{badge: classes.previewSelectedBadge, root: classes.badgecontainer}}  // 
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }} 
                            invisible={option.code !== selectedPayment}
                            badgeContent={
                                <FaCheck size={15} className={classes.checkMark}/>
                            }
                        >
                            <Box className={option.code === selectedPayment ? classes.gridSelectedItem : classes.gridItem} >
                                <img className={classes.option} src={option.src} alt={option.alt}/>
                            </Box>
                        </Badge>
                    </Grid>
                )}
            </Grid> 
        </Box>
    )
};

export default PaymentOptions;

