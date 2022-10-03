import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const breakpoints = createBreakpoints({})

breakpoints.values.xxl = 2240
breakpoints.values.xxxl = 3740

export const themeObject = {
    overrides: {
        MuiTooltip: {
            tooltipArrow: {
                backgroundColor: '#56c2bf',
                color: '#000000',
                fontFamily: "'GilroyLight', Helvetica, sans-serif", 
                fontSize: 'clamp(1rem, 0.8vw, 2rem)',
                maxWidth: '20em',
                borderRadius: 'clamp(0.3125rem, 0.25vw, 0.625rem)',
                padding: '.5em 1em',
            // [breakpoints.up('xxl')]:{
            //     transform: 'translateY(-.4em)'
            // },
            // [breakpoints.up('xxxl')]:{
            //     transform: 'translateY(-1em)'
            // },
            // textAlign: 'justify',
            // textJustify: 'inter-word',
            },
            tooltipPlacementTop: {
              [breakpoints.up('xxl')]:{
                margin: "1em 0",
              },
              [breakpoints.up('xxxl')]:{
                margin: "1.5em 0",
              },
            },
            arrow : {
                color: '#56c2bf',
                [breakpoints.up('xxl')]:{
                    transform: 'scale(1.4)',
                },
                [breakpoints.up('xxxl')]:{
                    transform: 'scale(2)',
                },
            },
        },
        MuiBreadcrumbs: {
            root: {
                [breakpoints.down('md')]: {
                    fontSize: 'clamp(.8rem, 0.648vw, 1.6rem)',
                },
            },
        },
        MuiAlert: {
            root: {
                fontFamily: "'GilroyLight', Helvetica, sans-serif", 
            },
        },
        MuiFormControl: {
            root: {
                "& .MuiOutlinedInput-notchedOutline": {
                    border: 'none',
                },
            },
        },
        MuiCardContent: {
            root: {
                "&:last-child": {
                    paddingBottom: 'clamp(2rem, 1.6vw, 4rem)',
                }
            },
        },
        MuiButtonGroup: {
            groupedContainedHorizontal: {
                border: 'none',
                '&:not(:last-child)': {
                    borderRight: 'none',
                }
            }
        },
        MuiPaginationItem: {
            root: {
                fontSize: 'clamp(1rem, 0.8vw, 2rem)',
                fontFamily: "'GilroyLight', Helvetica, sans-serif", 
                margin: '0 .8em'
            },
            page: {
                fontSize: 'clamp(1rem, 0.8vw, 2rem)',
                padding: ".9em",
                borderRadius: '50em'
                // '&.Mui-selected:hover': {
                // },
            },
        },
        
        MuiButton: {
            root: {
                '&.Mui-disabled': {
                    color: '#ffffff',
                },
            },
            // contained: {
            //     backgroundColor: '#56c2bf',
            // },
            disabled: {
                // backgroundColor: '#56c2bf',\
                color: '#ffffff',
            },
        },
        // MuiOutlinedInput: {
        //     input: {
        //         paddingTop: 'clamp(1rem, 0.8vw, 2rem)',
        //         paddingRight: 'clamp(.4rem, 0.32vw, .8rem)',
        //         paddingBottom: 'clamp(1rem, 0.8vw, 2rem)',
        //         paddingLeft: 'clamp(.4rem, 0.32vw, .8rem)'
        //     },
        // },
    },
    props: {
        MuiContainer: {
            disableGutters: true,
        },
            // MuiCardContent: {
            //   disablePadding: true
            // },
    },
    breakpoints: {
        values: {
            xs: 450,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1800,
            xxl: 2240,
            xxxl: 3740,
        },
    },
    palette: {
        primary: {
            main: '#173e43',
            light: '#21585f',
            dark: '#0d2326',
        },
        warning: {
            main: "#f44336",
            light: "#e57373",
            dark: "#d32f2f",
        },
        success: {
            main: "#26a69a",
            light: "#26a69a",
            dark: "#26a69a",
        },
        error: {
            main: "#26a69a",
            light: "#26a69a",
            dark: "#26a69a",
        },
        background: {
            default: "#dddfd4"
        },
        action: {
            disabledBackground: '#f7bbc0',
        }
    },
    myTheme: {

    //===== SENI ======//
    
        // pirma: '#E63946', //RAUDONA
        // antra: '#457B9D', //MELYNA
        // trecia: '#F1FAEE', //KREMINE
        // ketvirta: '#A8DADC', //SVIESIAI MELYNA
        // sriftoSpalva: '#1D3557', //TAMSIAI MELYNA
        // sriftas: "'Quicksand', Helvetica, sans-serif", //SRIFTAS
    
    //================//
        juoda: '#000000',
        balta: '#ffffff',
        sZalia: {
            main: '#3fb0ac',
            light: '#56c2bf',
            dark: '#369693',
        },
        tZalia: {
            main: '#173e43',
            light: '#21585f',
            dark: '#0d2326',
        },
        ruda: {
            main: '#dddfd4',
            light: '#f3f4f0',
            dark: '#c5c9b6',
        },
        sriftas: "'GilroyLight', Helvetica, sans-serif", 
        sriftasBold: "'GilroyBold', Helvetica, sans-serif", 
        sriftasGrotesk: "'Grotesk', Helvetica, sans-serif", 
        sriftasLogo: "'LogoFont', Helvetica, sans-serif", 
    
    // ====== Dydziai ====== //
    
        sizeBorderRadiusSmall: 'clamp(0.3125rem, 0.25vw, 0.625rem)', // 5px border radius
        sizeBorderRadiusMedium: 'clamp(.8rem, 0.648vw, 1.6rem)',
        sizeBorderRadiusLarge: 'clamp(20rem, 16vw, 40rem)',
        sizeXXXS: 'clamp(.2rem, 0.16vw, .4rem)',
        sizeXXS: 'clamp(.4rem, 0.32vw, .8rem)',
        sizeXS: 'clamp(.6rem, 0.48vw, 1.2rem)',
        sizeS: 'clamp(.8rem, 0.648vw, 1.6rem)',
        sizeM: 'clamp(1rem, 0.8vw, 2rem)',
        sizeMM: 'clamp(1.2rem, 0.97vw, 2.4rem)',
        sizeL: 'clamp(1.25rem, 1vw, 2.5rem)',
        sizeXL: 'clamp(1.5rem, 1.2vw, 3rem)',
        sizeXXL: 'clamp(2rem, 1.6vw, 4rem)',
        sizeXXXL: 'clamp(2.5rem, 2, 5rem)',
    
    // ===================== //
    // ======= Stiliai ===== //
    
        button: {
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            width: '100%',
            backgroundColor: '#173e43',
            fontFamily: "'GilroyLight', Helvetica, sans-serif", 
            margin: '.5em 0',
            color: '#ffffff',
            borderRadius: 'clamp(0.3125rem, 0.25vw, 0.625rem)',
            height: 'clamp(2.5rem, 2vw, 5rem)',
        },
        cssOutlinedInput: {
            color: '#000000',
            fontFamily: "'GilroyLight', Helvetica, sans-serif", 
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            margin: '.37em .75em',
        },
        cssOutlinedInput2: {
            color: '#000000',
            fontFamily: "'GilroyLight', Helvetica, sans-serif", 
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            height: '3em',
            padding: '.5em .75em'
        },
        isbraukta: {
            fontSize: 'clamp(1.2rem, 0.97vw, 2.4rem)',
            padding: '0',
            margin: '0 .7em .3em 0',
            overflowWrap: 'break-word',
            fontWeight: 'bold',
            position: 'relative',
            '&:before': {
                position: 'absolute',
                content: '""',
                width: '100%',
                height: '.2em',
                borderRadius: '.1em',
                backgroundColor: '#369693',
                right: '0',
                top: '40%',
                '-webkit-transform': 'skewY(-7deg)',
                transform: 'skewY(-7deg)',
            },
        },
        variantSelect: {
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            color: '#000000',
            fontFamily: "'GilroyLight', Helvetica, sans-serif", 
            margin: '0',
            padding: '0',
            height: '3em',
            textOverflow: 'ellipsis',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #000000',
            borderRadius: 'clamp(0.3125rem, 0.25vw, 0.625rem)',
            '&:focus': {
                borderRadius: 'clamp(0.3125rem, 0.25vw, 0.625rem)',
                border: '1px solid #000000',
            },
            [breakpoints.up('xxl')]:{
                border: '1.4px solid #000000',
                '&:focus': {
                    border: '1.4px solid #000000',
                },
            },
            [breakpoints.up('xxxl')]:{
                border: '2px solid #000000',
                '&:focus': {
                    border: '2px solid #000000',
                },
            },
        },
        variantSelectIcon: {
            color: '#000000',
            [breakpoints.up('xxl')]: {
                transform: 'scale(1.5)',
                marginRight: '1rem'
            },
            [breakpoints.up('xxxl')]: {
                transform: 'scale(2)',
                marginRight: '1.5rem'
            },
        },
        menuitself: {
            color: '#000000',
            fontFamily: "'GilroyLight', Helvetica, sans-serif", 
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            width: '13em',
            borderRadius: 'clamp(0.3125rem, 0.25vw, 0.625rem)',
        },
        menuPaper: {
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            maxHeight: '22em',
            overflowY: 'auto',
            borderRadius: 'clamp(0.3125rem, 0.25vw, 0.625rem)',
        },
        menuItem: {
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            // width: '100%',
            overflowWrap: 'break-word',
        },
        selectRenderOuterBox: {
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            height: '100%',
            width: '90%', 
            whitespace: 'nowrap', 
            textOverflow: 'ellipsis',
            display: 'flex', 
            justifyContent: 'start',
            alignItems: 'center',
            textAlign: 'left',
        },
        selectRender2: {
            width: '100%', 
            lineHeight: 'normal',
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#000000',
            fontFamily: "'GilroyLight', Helvetica, sans-serif", 
            verticalAlign: 'middle',
            margin: 0,
        },
        formVariantSelect: {
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            width: '100%',
            marginBottom: '1em',
        },
        OptionTitleBox: {
            width: '100%',
        },
        OptionTitleHeader: {
            color: '#000000',
            fontSize: 'clamp(1rem, 0.8vw, 2rem)',
            fontFamily: "'GilroyLight', Helvetica, sans-serif", 
            margin: '0',
            padding: '0',
            overflowWrap: 'break-word',
        },
        infoIcon: {
            color: '#000000',
            margin: '0',
            padding: '0',
            [breakpoints.up('xxl')]: {
                transform: 'scale(1.4)',
                margin: '0 0 .1em 0',
            },
            [breakpoints.up('xxxl')]: {
                transform: 'scale(2)',
                margin: '0 0 .3em 0',
            },
        },
        alert: {
            width: '100%',
            borderRadius: 'clamp(0.3125rem, 0.25vw, 0.625rem)',
            paddingTop: 'clamp(.2rem, 0.16vw, .4rem)',
            paddingBottom: 'clamp(.2rem, 0.16vw, .4rem)',
            paddingRight: 'clamp(.2rem, 0.16vw, .4rem)',
            paddingLeft: 'clamp(1rem, 0.8vw, 2rem)',
        },
        alertBox: {
            marginBottom: 'clamp(1rem, 0.8vw, 2rem)',
        },
        alertText: {
            textAlign: "left",
            margin: 0,
            padding: 0,
            fontFamily: "'GilroyLight', Helvetica, sans-serif",
            overflowWrap: 'break-word',
            fontSize: 'clamp(.8rem, 0.648vw, 1.6rem)',
        },
        alertIcon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            [breakpoints.up('xxl')]: {
                transform: 'scale(1.4)',
                marginRight: 'clamp(1rem, 0.8vw, 2rem)',
            },
            [breakpoints.up('xxxl')]: {
                transform: 'scale(2)',
            },
        },

    // ===================== //
    },
}