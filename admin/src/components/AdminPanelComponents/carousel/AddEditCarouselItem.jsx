import { useState, useEffect, useRef } from 'react';
import { Radio, FormControlLabel, RadioGroup, Box, Grid, FormControl, OutlinedInput, Select, MenuItem, Button, Slider, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        margin: '0',
        padding: '0',
    },
    contentItem: {
        textAlign: 'left',
    },
    contentTextHeader: {
        margin: '0',
        padding: '0',
        fontSize: '3rem',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    contentText: {
        margin: '0',
        padding: '0',
        fontSize: '1.5rem',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    contentRedText: {
        margin: '0',
        padding: '0',
        fontSize: '1.5rem',
        color: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
    },
    leftBreakWord: {
        maxWidth: '80%',
        overflowWrap: 'break-word',
    },
    contentButton: {
        marginTop: '1rem',
        backgroundColor: theme.myTheme.antra,
        fontSize: '1rem',
        fontWeight: 'bold',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: theme.myTheme.sriftoSpalva,
        },
    },
    previewBoxInnerTop: {
        margin: '1rem 0 1rem 0',
        minHeight: '35rem',
        backgroundColor: theme.myTheme.trecia,
    },
    textInput: {
        marginBottom: "1rem",
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
    },
    diasbleOutline: {
        border: 'none',
    },
    formVariant: {
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.up('md')]: {
            width: '90%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '21rem',
        },
    },
    buttonBox: {
        marginBottom: '3rem',
        [theme.breakpoints.up('lg')]: {
            marginBottom: '0',
        },
    },
    variantSelectExample: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
        margin: '0 0 1rem 0',
        padding: '0 0 0 1rem',
        minHeight: '3.5rem',
        textOverflow: 'ellipsis',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:focus': {
            borderRadius: '4px',
            border: `1px solid ${theme.myTheme.trecia}`,
        }, 
    },
    variantSelectIconExample: {
        color: theme.myTheme.trecia,
        marginTop: '-.5rem',
    },
    menuPaper: {
        maxHeight: '22rem',
        overflowY: 'auto'
    },
    input: {
        display: 'none',
    },
    radio: {
        color: theme.myTheme.trecia,
    },
    icon: {
        color: theme.myTheme.trecia,
        margin: '0',
        padding: '0',
    },
    animation0: {
        transform: 'perspective(900px) rotateX(20deg) ',
        boxShadow: '0px 20px 100px #555',
        transition: '0.5s ease transform',
        '&:hover': {
            transform: 'rotate(0deg)'
        },
    },
    animation1: {
        transform: 'perspective(800px) rotateY(-8deg)',
        boxShadow: '20px 20px 50px #555',
        transition: 'transform 1s ease 0s',
        '&:hover': {
            transform: 'perspective(800px) rotateY(-4deg)'
        },
    },
    animation2: {
        transform: 'rotateX(51deg) rotateZ(43deg)',
        transformStyle: 'preserve-3d',
        boxShadow: '-1px 0 28px 0 rgba(34, 33, 81, 0.01), 28px 28px 28px 0 rgba(34, 33, 81, 0.25)',
        transition: '.4s ease-in-out transform, .4s ease-in-out box-shadow',
        '&:hover': {
            transform: 'translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg)',
            boxShadow: '-1px 0 28px 0 rgba(34, 33, 81, 0.01), 54px 54px 28px -10px rgba(34, 33, 81, 0.15)',
        },
    },
    animation3: {
        transform: 'rotate3d(.5,-.866,0,15deg) rotate(1deg)',
        boxShadow: '2em 4em 6em -2em rgba(0,0,0,.5), 1em 2em 3.5em -2.5em rgba(0,0,0,.5) ',
        transition:'transform .4s ease, box-shadow .4s ease',
        '&:hover': {
            transform: 'rotate3d(0,0,0,0deg) rotate(0deg)',
            transition:' transform .4s ease',
        }
    },
    animation4: {
        transform: 'perspective(750px) translate3d(0px, 0px, -250px) rotateX(27deg) scale(0.9, 0.9)',
        boxShadow: '0 70px 40px -20px rgba(0, 0, 0, 0.2)',
        // '-webkit-filter': 'drop-shadow(70px 40px 20px rgba(0, 0, 0, 0.2))',
        // filter: 'drop-shadow(70px 40px 20px rgba(0, 0, 0, 0.2))',
        transition: '0.4s ease-in-out transform',
        '&:hover': {
            transform: 'translate3d(0px, 0px, -250px)'
        }
    },
    animation5: {
        transform: 'perspective(800px) rotateY(25deg) scale(0.9) rotateX(10deg)',
        transition: '0.6s ease transform',
        '&:hover': {
            transform: 'perspective(800px) rotateY(-15deg) translateY(-25px) rotateX(10deg) scale(1)',
        },
    },
    animation6: {
        
    },
}));

const AddEditCarouselItem = ({ carouselItemInfo, setCarouselItemInfo, setSnackbar, setCarouselView, user, handlecarouselItemInfoChange, items }) => {

    const classes = useStyles();
    const inputField = useRef(null)

    const [products, setProducts] = useState([]);
    const [x, setX] = useState('0');
    const [submitting, setSubmitting] = useState(false);

    const getAllProductsIDs = async () => {
        try {
            const getProductsRequest = await fetch("/administracija/getProductsIDs/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
            });
            const getProductsResponse = await getProductsRequest.json();
            if (getProductsResponse.success) {
                setProducts(getProductsResponse.data);
            } else {
                setSnackbar({
                    message: 'Klaida! Nepavyko gauti produktų duomenų iš serverio. Pabandykite vėliau.',
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

    const handleSelect = (e) => {
        setCarouselItemInfo(prev => ({ ...prev, productLink: e.target.value }));
    };

    const handleFile = () => {
        const image = inputField.current.files[0];
        if (image) {
            setCarouselItemInfo(prev => ({ 
                ...prev,
                image: image,
                imageURL: URL.createObjectURL(image),
                imageOriginalName: image.name
            }));
        }
    };

    const handlePictureSizeRadiusChange = (prop) => (event, newValue) => {
        // setCarouselItemInfo(prev => ({ ...prev, [prop]: newValue }));
        if (prop === 'size') {
            const oldValue = carouselItemInfo.size;
            setCarouselItemInfo(prev => ({ 
                ...prev,
                size: newValue,
                borderRadius: carouselItemInfo.borderRadius * (newValue / oldValue)
            }));
        } else {
            setCarouselItemInfo(prev => ({ ...prev, [prop]: newValue }));
        }
    };

    const handleRadioButtons = (e) => {
        setX(e.target.value);
        const num = parseInt(e.target.value);
        setCarouselItemInfo(prev => ({ ...prev, animation: num }));
    };

    const addUpdateCarouselItem = async () => {
        setSubmitting(true);
        var missing = [];
        if (!carouselItemInfo.imageURL) {
            missing.push('paveikslėlio');
        } 
        if (!carouselItemInfo.title) {
            missing.push('antraštės');
        }  
        // if (!carouselItemInfo.productID) {
        //     missing.push('nuorodos į produktą');
        // }  
        if (missing.length > 0) {
            setSnackbar({
                message: `Trūksta ${missing.join(', ')}.`,
                open: true,
            });
            setSubmitting(false);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('image', carouselItemInfo.image);
            formData.append('carouselItemId', carouselItemInfo.id);
            formData.append('title', carouselItemInfo.title);
            formData.append('bluetext', carouselItemInfo.bluetext);
            formData.append('redtext', carouselItemInfo.redtext);
            formData.append('productLink', carouselItemInfo.productLink);
            formData.append('borderRadius', carouselItemInfo.borderRadius);
            formData.append('size', carouselItemInfo.size);
            formData.append('animation', carouselItemInfo.animation);
            formData.append('imageURL', carouselItemInfo.imageURL);
            if (carouselItemInfo.id) {
                formData.append('position', carouselItemInfo.position);
            } else {
                formData.append('position', items.length);
            }
            const carouselItemAddUpdateRequest = await fetch("/administracija/createUpdateCarouselItem/", {
                method: "POST",
                credentials: "include",
                headers: {
                    // "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: formData
            });
            const carouselItemAddUpdateResponse = await carouselItemAddUpdateRequest.json();
            if (carouselItemAddUpdateResponse.success) {
                setSubmitting(false);
                setSnackbar({
                    message: carouselItemAddUpdateResponse.message,
                    open: true,
                });
                goback();
            } else {
                setSubmitting(false);
                setSnackbar({
                    message: `${carouselItemAddUpdateResponse.error}`,
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

    const goback = () => {
        setCarouselView(0);
        setCarouselItemInfo({
            id: '',
            title: '',
            bluetext: '',
            redtext: '',
            productLink: '',
            borderRadius: 0,
            size: 20,
            animation: 0,
            image: null,
            imageURL: '',
            imageOriginalName: '',
        });
    };

    useEffect(() => {
        getAllProductsIDs();
        if (!carouselItemInfo.id) {
            setCarouselItemInfo({
                id: '',
                title: '',
                bluetext: '',
                redtext: '',
                productLink: '',
                borderRadius: 0,
                size: 20,
                animation: 0,
                image: null,
                imageURL: '',
                imageOriginalName: '',
            });
        };
        setX(String(carouselItemInfo.animation));
        // eslint-disable-next-line
    }, [])

    return (
        <Box>
            <Grid container>
                {/* KAIRE PUSE */}
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}> 
                    <Box display='flex' justifyContent='center' alignItems='center' classes={{root: classes.previewBoxInnerTop}}>
                        <Box classes={{root: classes.leftBreakWord}}>
                            <Box classes={{root: classes.contentItem}}> 
                                <h1 className={classes.contentTextHeader}>{carouselItemInfo.title}</h1>
                            </Box>
                            <Box classes={{root: classes.contentItem}}>
                                <h3 className={classes.contentText}>{carouselItemInfo.bluetext}</h3>
                            </Box>
                            <Box classes={{root: classes.contentItem}}>
                                <h3 className={classes.contentRedText}>{carouselItemInfo.redtext}</h3>
                            </Box>
                            <Box classes={{root: classes.contentItem}}>
                                {carouselItemInfo.productLink !== '' &&
                                    <Button classes={{root: classes.contentButton}}>Užsakyti...</Button>
                                }  
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Grid container>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Antraštė:</h3>
                                <FormControl className={classes.formVariant} variant="outlined">
                                    <OutlinedInput
                                        id="title"
                                        type='text'
                                        value={carouselItemInfo.title}
                                        placeholder='Antraštė...'
                                        onChange={handlecarouselItemInfoChange('title')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                    />
                                </FormControl> 
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Nuoroda:</h3>
                                <FormControl className={classes.formVariant} variant="outlined">
                                    <Select
                                        id="simple-select-outlined"
                                        classes={{outlined: classes.variantSelectExample, iconOutlined: classes.variantSelectIconExample}}
                                        value={carouselItemInfo.productLink}
                                        onChange={(e) => handleSelect(e)}
                                        MenuProps={{ classes: { list: classes.menuPaper } }}
                                    >
                                        {products.length > 0 && products.map((item) => 
                                            <MenuItem value={item.link}>{item.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl> 
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Mėlynas tekstas:</h3>
                                <FormControl className={classes.formVariant} variant="outlined">
                                    <OutlinedInput
                                        id="blue_text"
                                        type='text'
                                        value={carouselItemInfo.bluetext}
                                        placeholder='Tekstas...'
                                        onChange={handlecarouselItemInfoChange('bluetext')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                        multiline
                                        rows={2}
                                    />
                                </FormControl> 
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Raudonas tekstas:</h3>
                                <FormControl className={classes.formVariant} variant="outlined">
                                    <OutlinedInput
                                        id="red_text"
                                        type='text'
                                        value={carouselItemInfo.redtext}
                                        placeholder='Tekstas...'
                                        onChange={handlecarouselItemInfoChange('redtext')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline }}
                                        autoComplete='off'
                                        multiline
                                        rows={2}
                                    />
                                </FormControl> 
                            </Grid>
                            
                        </Grid>
                       
                    </Box>
                </Grid>
                {/* DESNE PUSE */}
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12} className={classes.previewBox}>
                    <Box display='flex' justifyContent='center' alignItems='center' classes={{root: classes.previewBoxInnerTop}}>
                        { carouselItemInfo.imageURL &&
                            <img 
                                src={carouselItemInfo.imageURL} 
                                alt=""
                                style={{
                                    width: `${carouselItemInfo.size}rem`,
                                    borderRadius: `${carouselItemInfo.borderRadius}rem`,
                                    objectFit: 'contain',
                                }}
                                className={
                                    {
                                        0: classes.animation0,
                                        1: classes.animation1,     
                                        2: classes.animation2,
                                        3: classes.animation3,
                                        4: classes.animation4,
                                        5: classes.animation5,
                                        6: classes.animation6,
                                    }[carouselItemInfo.animation]
                                }
                            />
                        }
                    </Box>
                    <Box>
                        <Grid container>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Box style={{marginBottom: '1rem'}}>
                                    <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Paveikslėlis:</h3>
                                    <label htmlFor='image_upload'>
                                        <Button variant="contained" color="primary" component="span">
                                            { carouselItemInfo.imageURL ? 'Pakeisti' : 'Įkelti' }
                                        </Button>
                                    </label>
                                    <input
                                        type="file" 
                                        accept=".png, .jpg, .jpeg"
                                        className={classes.input}
                                        name="photo"
                                        id='image_upload'
                                        ref={inputField}
                                        onChange={handleFile}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Dydis:</h3>
                                <Box style={{width: '80%'}}>
                                    <Slider 
                                        value={carouselItemInfo.size} 
                                        onChange={handlePictureSizeRadiusChange('size')} 
                                        aria-labelledby="continuous-slider-size" 
                                        min={18}
                                        max={30}
                                        step={0.1}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <FormControl component="fieldset">
                                    <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Animacija:</h3>
                                    <RadioGroup aria-label="animation" name="animation" value={x} onChange={handleRadioButtons} row>
                                        <FormControlLabel classes={{root: classes.radio}} value='6' control={<Radio classes={{root: classes.radio}}/>} label="Nėra" />
                                        <FormControlLabel classes={{root: classes.radio}} value='0' control={<Radio classes={{root: classes.radio}}/>} label="1" />
                                        <FormControlLabel classes={{root: classes.radio}} value='1' control={<Radio classes={{root: classes.radio}}/>} label="2" />
                                        <FormControlLabel classes={{root: classes.radio}} value='2' control={<Radio classes={{root: classes.radio}}/>} label="3" />
                                        <FormControlLabel classes={{root: classes.radio}} value='3' control={<Radio classes={{root: classes.radio}}/>} label="4" />
                                        <FormControlLabel classes={{root: classes.radio}} value='4' control={<Radio classes={{root: classes.radio}}/>} label="5" />
                                        <FormControlLabel classes={{root: classes.radio}} value='5' control={<Radio classes={{root: classes.radio}}/>} label="6" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <h3 className={classes.header} style={{margin: '0 1rem 0 0'}}>Apvalumas:</h3>
                                <Box style={{width: '80%'}}>
                                    <Slider 
                                        value={carouselItemInfo.borderRadius} 
                                        onChange={handlePictureSizeRadiusChange('borderRadius')} 
                                        aria-labelledby="continuous-slider-borderRAdius" 
                                        min={0}
                                        max={carouselItemInfo.size / 2}
                                        step={0.1}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Box display='flex' justifyContent='flex-start' alignItems='center' classes={{root: classes.buttonBox}}>
                                    <Button variant="contained" color="primary" component="span" onClick={addUpdateCarouselItem} style={{margin: '1rem 1rem 0 0'}} disabled={submitting}>
                                        {submitting ? <CircularProgress size={20} className={classes.icon}/> : 'Išsaugoti' }
                                    </Button>
                                    <Button variant="contained" color="primary" component="span" onClick={goback} style={{marginTop: '1rem'}}>
                                        Atgal
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddEditCarouselItem
