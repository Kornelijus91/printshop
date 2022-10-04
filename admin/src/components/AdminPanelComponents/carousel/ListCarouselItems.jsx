import { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Grid, CircularProgress, Tooltip, useMediaQuery } from '@material-ui/core';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import DeleteCarouselItemModal from './DeleteCarouselItemModal';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem 0 0 0',
        // height: '97vh',
        // width: '96.5%',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            margin: '2rem 0 0 0',
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
        padding: '.001rem 0 0 0',
        width: '99%',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
            padding: '.002rem 0 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            padding: '.004rem 0 0 0',
        },
    },
    // accountsBoxInner: {
    //     // height: '95%',
    //     overflowY: 'auto'
    // },
    progressIcon: {
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    item: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '7px',
        padding: '0',
        margin: '.5rem 0',
        maxWidth: '97%',
        height: '4rem',
        '&:hover': {
            backgroundColor: '#0d1726',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '99%',
            padding: '.3rem .3rem .3rem 1.5rem',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
            padding: '.45rem .45rem .45rem 2.25rem',
            margin: '.75rem 0',
            height: '6rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            padding: '.6rem .6rem .6rem 3rem',
            margin: '1rem 0',
            height: '8rem',
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
    image: {
        maxWidth: '3rem',
        maxheight: '3rem',
        objectFit: 'contain',
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            maxWidth: '4.5rem',
            maxheight: '4.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxWidth: '6rem',
            maxheight: '6rem',
        },
    },
    infosection: {
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.6rem',
            '& p': {
                margin: 0,
                padding: 0,
            }, 
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            '& p': {
                margin: 0,
                padding: 0,
            }, 
        },
    },
    trashsection: {
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        height: '100%'
    },
    endIconBox: {
        marginRight: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginRight: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginRight: '2rem',
        },
    },
}));

const ListCarouselItems = ({ user, setCarouselView, setCarouselItemInfo, setSnackbar, items, setItems }) => {

    const classes = useStyles();
    const theme = useTheme();

    const screenSizexxl = useMediaQuery(theme.breakpoints.up('xxl'));
    const screenSizexxxl = useMediaQuery(theme.breakpoints.up('xxxl'));
    
    const [submitting, setSubmitting] = useState(false);
    const [deleteModal, setDeleteModal] = useState({
        submitting: false,
        open: false,
        carouselID: '',
        carouselName: '',
    });

    const getAllCarouselItems = async () => {
        setSubmitting(true);
        try {
            const getCarouselItemsRequest = await fetch("/administracija/getCarouselItems/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
            });
            const getCarouselItemsResponse = await getCarouselItemsRequest.json();
            if (getCarouselItemsResponse.success) {
                setSubmitting(false);
                setItems(getCarouselItemsResponse.data);
            } else {
                setSubmitting(false);
                setSnackbar({
                    message: `${getCarouselItemsResponse.error}`,
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
            carouselID: deleteID,
            carouselName: deleteName,
        });
    };

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;
        const tempItemArray = Array.from(items);
        const [reorderedItem] = tempItemArray.splice(result.source.index, 1);
        tempItemArray.splice(result.destination.index, 0, reorderedItem);
        setItems(tempItemArray);
        var reorder = [];
        for (const [i, x] of tempItemArray.entries()) {
            reorder.push({
                id: x._id,
                position: i 
            });
        }
        try {
            const updateCarouselItemsPositionRequest = await fetch("/administracija/positionCarouselItems/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    data: reorder
                }),
            });
            const updateCarouselItemsPositionResponse = await updateCarouselItemsPositionRequest.json();
            if (!updateCarouselItemsPositionResponse.success) {
                setSnackbar({
                    message: `${updateCarouselItemsPositionResponse.error}`,
                    open: true,
                });
            } else {
                getAllCarouselItems();
            }
        } catch (error) {
            setSnackbar({
                message: `${error}`,
                open: true,
            });
        }
    }

    useEffect(() => {
        getAllCarouselItems();
        // eslint-disable-next-line
    }, [])

    return (
        <Box classes={{root: classes.root}}>
            <DeleteCarouselItemModal 
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                user={user}
                setSnackbar={setSnackbar}
                getAllCarouselItems={getAllCarouselItems}
            />
            {items.length > 0 ?
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items">
                        {(provided) => (
                            <Box classes={{root: classes.accountsBox}} 
                                style={{
                                    height: `${screenSizexxxl ? 9.2 * items.length : screenSizexxl ? 6.9 * items.length : 4.6 * items.length}rem`, minHeight: '5rem'
                                }} 
                                {...provided.droppableProps} 
                                ref={provided.innerRef}
                            >
                                {items.map((item, index) => 
                                    <Draggable key={item._id} draggableId={item._id} index={index}>
                                        {(provided) => (
                                            <Grid container display="flex" justifyContent='flex-start' alignItems='center' className={classes.item} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                                                    <Grid container display="flex" justifyContent='flex-start' alignItems='center'>
                                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                                            <Box classes={{root: classes.infosection}} >
                                                                <img 
                                                                    src={item.imageURL} 
                                                                    alt={`${item.title}`} 
                                                                    className={classes.image} 
                                                                    style={{
                                                                        borderRadius: `${screenSizexxxl ? item.borderRadius * 2 * (3 / item.size) : screenSizexxl ? item.borderRadius * 1.5 * (3 / item.size) : item.borderRadius * (3 / item.size)}rem`
                                                                    }} 
                                                                />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                                            <Box classes={{root: classes.infosection}}>
                                                                <p>{item.title}</p>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                    { user.administracija &&
                                                        <Box classes={{root: classes.trashsection}}>
                                                            <Box classes={{root: classes.endIconBox}} display='flex' justifyContent='center' alignItems='center'>
                                                                <Tooltip title='Redaguoti' placement="top" arrow>
                                                                    <div>
                                                                        <AiFillEdit 
                                                                            size={20} 
                                                                            className={classes.deleteIcon} 
                                                                            onClick={() => {
                                                                                setCarouselItemInfo({
                                                                                    id: item._id,
                                                                                    title: item.title,
                                                                                    bluetext: item.bluetext,
                                                                                    redtext: item.redtext,
                                                                                    productLink: item.productLink,
                                                                                    borderRadius: item.borderRadius,
                                                                                    size: item.size,
                                                                                    animation: item.animation,
                                                                                    image: null,
                                                                                    imageURL: item.imageURL,
                                                                                    imageOriginalName: item.imageOriginalName,
                                                                                    position: item.position
                                                                                }); 
                                                                                setCarouselView(1);
                                                                            }}
                                                                        /> 
                                                                    </div>
                                                                </Tooltip>
                                                            </Box> 
                                                        </Box>
                                                    }
                                                </Grid>
                                                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                    { user.administracija &&
                                                        <Box classes={{root: classes.trashsection}}>
                                                            <Box classes={{root: classes.endIconBox}} display='flex' justifyContent='center' alignItems='center'>
                                                                <Tooltip title='Ištrinti' placement="top" arrow>
                                                                    <div>
                                                                        <FaTrash size={20} className={classes.deleteIcon} onClick={(e) => openDeleteModal(e, item._id, item.title)}/> 
                                                                    </div>
                                                                </Tooltip>
                                                            </Box> 
                                                        </Box>
                                                    }
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Draggable>
                                )}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
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
                        <h3 className={classes.header} style={{margin: '1rem'}}>Karuselės elementų nėra.</h3>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default ListCarouselItems
