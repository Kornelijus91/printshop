import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, CircularProgress, Grid, Card, CardContent, CardMedia } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles'; // useTheme
import DesignerButton from './DesignerButton';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '99.5vw',
        maxHeight: '90vh',
        [theme.breakpoints.up('lg')]: {
            width: '70vw',
        },
    },
    dialog: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.balta,
    },
    dialogContent: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.balta,
        padding: '1em',
        minHeight: '70vh',
        maxHeight: '95vh',
        overflowY: 'auto',
        [theme.breakpoints.up('lg')]: {
            minHeight: '50vh',
        },
    },
    dialogActions: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.balta,
        padding: '1em'
    },
    titleText: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        margin: 0,
        padding: 0,
        fontSize: theme.myTheme.sizeMM,
    },
    closeButton: {
        color: theme.myTheme.juoda,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    titleBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentBox: {
       
    },
    spinnerBox: {
        width: '100%',
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        color: theme.myTheme.juoda,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    templateCard: {
        width: '100%',
        height: '100%',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        '&:hover': {
            cursor: 'pointer'
        },
    },
    templateCardSelected: {
        width: '100%',
        height: '100%',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        '&:hover': {
            cursor: 'pointer'
        },
        boxShadow: `0 0 0 2px ${theme.myTheme.tZalia.main}`,
        [theme.breakpoints.up('xxl')]: {
            boxShadow: `0 0 0 3px ${theme.myTheme.tZalia.main}`,
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: `0 0 0 4px ${theme.myTheme.tZalia.main}`,
        },
    },
    cardText: {
        fontSize: theme.myTheme.sizeM,
        margin: '1em 0 0 0',
        padding: '0',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
    },
    img: {
        fontSize: theme.myTheme.sizeM,
        marginBottom: '.5em',
        height: '100%', 
        width: '100%', 
        objectFit: 'contain'
    },
    cardContent: {
        fontSize: theme.myTheme.sizeM,
        padding: '1em',
        '&:last-child': {
            paddingBottom: '1em'
        },

    },
    media: {
        height: 140,
        [theme.breakpoints.up('xxl')]: {
            height: 185,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 280,
        },
    },
    CardContentParent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CardContentPicBox: {
        width: '100%',
    },
    CardContentTitleBox: {
        width: '100%',
    },
}));

const SelectTemplateModal = ({ selectedTemplate, setSelectedTemplate, selectTemplateModalOpen, setSelectTemplateModalOpen, userid, productID, productName, productTemplateID, setFile }) => {

    const classes = useStyles();
    // const theme = useTheme();

    const [fetching, setFetching] = useState(false);
    const [templates, setTemplates] = useState([]);

    const handleClose = () => {
        setSelectTemplateModalOpen(false);
        setSelectedTemplate('');
    };

    const getTemplates = async () => {
        try {
            const request = await fetch("/users/getTemplates/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    categoryId: productTemplateID,
                }),
            });
            const response = await request.json();
            if (response.success) {
                setTemplates(response.templates);
            } else {
                console.log(response.error);
            }
            setFetching(false);
        } catch (error) {
            setFetching(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (productTemplateID !== '' && fetching !== true && selectTemplateModalOpen) {
            setFetching(true);
            getTemplates();
        }

        // eslint-disable-next-line
    }, [selectTemplateModalOpen]);

    return <div>
        <Dialog 
            open={selectTemplateModalOpen}
            onClose={handleClose} 
            classes={{paper: classes.root}}
            aria-labelledby="select-template-dialog"
            maxWidth={false} 
        >

            <DialogTitle 
                id="select-template-dialog-title" 
                onClose={handleClose}
                classes={{root: classes.dialog}}
            >
                <Box classes={{root: classes.titleBox}}>
                    <p className={classes.titleText}>Pasirinkite šabloną</p>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers classes={{root: classes.dialogContent}}>
                {fetching ? 
                    <Box classes={{root: classes.spinnerBox}}>
                        <CircularProgress size={30} className={classes.spinner}/>
                    </Box>
                :
                    <Box classes={{root: classes.contentBox}}>
                        {templates.length > 0 ? 
                            <Box>
                                <Grid container spacing={2}>
                                    {templates.map((item) => 
                                        <Grid item xl={2} lg={2} md={3} sm={6} xs={6} key={item.id}> 
                                            <Card 
                                                className={selectedTemplate === item.id ? classes.templateCardSelected : classes.templateCard} 
                                                onClick={() => setSelectedTemplate(item.id)}
                                            >
                                                <CardMedia 
                                                    className={classes.media}
                                                    image={`${item.previews[0]}`}
                                                    title={`${item.title}`}
                                                />
                                                <CardContent classes={{root: classes.cardContent}}>
                                                    {/* <Box classes={{root: classes.CardContentParent}}> 
                                                        <Box classes={{root: classes.CardContentPicBox}}>
                                                            <Box>
                                                                <img src={item.previews[0]} alt={item.title} className={classes.img} />
                                                            </Box>
                                                        </Box>
                                                        <Box classes={{root: classes.CardContentTitleBox}}>
                                                            <Box>
                                                                <p className={classes.cardText}>{item.title}</p>
                                                            </Box>
                                                        </Box>
                                                    </Box> */}

                                                    <p className={classes.cardText}>{item.title}</p>

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        :
                            <p className={classes.titleText}>Šablonų nėra.</p>
                        }
                    </Box>
                }     
            </DialogContent>

            <DialogActions classes={{root: classes.dialogActions}}>
                <DesignerButton 
                    userid={userid}
                    productID={productID}
                    productName={productName}
                    setSelectTemplateModalOpen={setSelectTemplateModalOpen}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                    setFile={setFile}
                />
            </DialogActions>

        </Dialog>
    </div>;
};

export default SelectTemplateModal;
