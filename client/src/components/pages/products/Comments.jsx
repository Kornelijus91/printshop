import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Rating, Pagination } from '@material-ui/lab';
import { IoClose } from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeM,
        marginTop: '3em',
    },
    header: {
        fontSize: theme.myTheme.sizeXL,
        color: theme.myTheme.juoda,
        margin: '0 1em 0 0',
        padding: 0,
    },
    header2: {
        color: theme.myTheme.juoda,
        margin: '0 1em 0 0',
        padding: 0,
        fontSize: theme.myTheme.sizeMM,
    },
    atsiliepimuNera: {
        color: theme.myTheme.juoda,
        opacity: 0.5,
        fontSize: theme.myTheme.sizeMM,
        // [theme.breakpoints.up('xxl')]: {
        //     fontSize: '1.89rem',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     fontSize: '2.8rem',
        // },
    },
    atsiliepimoTekstas: {
        color: theme.myTheme.juoda,
        opacity: 0.75,
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        overflowWrap: 'break-word',
    },
    commentHR: {
        opacity: 0.5,
    },
    leaveCoomentTopBox: {
        fontSize: theme.myTheme.sizeM,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '.7em',
    },
    vardas: {
        fontSize: theme.myTheme.sizeM,
        border: `1px solid ${theme.myTheme.juoda}`,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        width: '100%',
        margin: '0 0 1em 0',
        [theme.breakpoints.up('md')]: {
            width: '30%',
            margin: '0 1em 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            border: `1.4px solid ${theme.myTheme.juoda}`,
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `2px solid ${theme.myTheme.juoda}`,
        },
    },
    pastaba: {
        fontSize: theme.myTheme.sizeM,
        border: `1px solid ${theme.myTheme.juoda}`,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        width: '100%',
        marginBottom: '.7em',
        [theme.breakpoints.up('xxl')]: {
            border: `2px solid ${theme.myTheme.juoda}`,
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `2px solid ${theme.myTheme.juoda}`,
        },
    },
    cssOutlinedInput: theme.myTheme.cssOutlinedInput,
    cssFocused: {
        border: 'none',
        outline: 'none',
    },
    notchedOutline: {
        border: 'none',
        outline: 'none',
    },
    ratingBox: {
        display: 'inline-block'
    },
    button: theme.myTheme.button,
    buttonDisabled: {
        backgroundColor: theme.myTheme.tZalia.dark,
    },
    loadingIcon: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    accountsBoxPagination: {
        fontSize: theme.myTheme.sizeM,
        marginTop: '.2em',
        padding: '0 0 .5em .2em',
        // [theme.breakpoints.up('xxl')]: {
        //     marginTop: '.3rem',
        //     padding: '0 0 .75rem .3rem',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     marginTop: '.4rem',
        //     padding: '0 0 1rem .4rem',
            
        // },
    },
    pagination:{
        
    },
    paginationel: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
    },
    ratingScale: {
        fontSize: theme.myTheme.sizeXL,
    },
    ratingScaleSmall: {
        fontSize: theme.myTheme.sizeMM,
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

const Comments = ({ product, firstName, personalas, token }) => {

    const classes = useStyles();

    const [vardas, setVardas] = useState('');
    const [komentaras, setKomentaras] = useState('');
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [page, setPage] = useState(1);
    const [comments, setComments] = useState({
        items: [],
        totalItems: 0,
        itemLimit: 0,
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        nextPage: null,
        hasPrevPage: false,
        prevPage: null,
        pagingCounter: 0,
        totalRating: 0
    });

    const handleVardasChange = (e) => {
        setVardas(e.target.value);
    };

    const handlePastabaChange = (e) => {
        setKomentaras(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const sendComment = async () => {
        setSubmitting(true);
        if (vardas !== '' && komentaras !== '') {
            try{
                const res = await fetch("/users/sendComment/", {
                    method: "POST",
                    credentials: "include",
                    headers:
                    {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: vardas,
                        comment: komentaras,
                        rating: rating,
                        product: product.name,
                    }),
                });
                const response = await res.json();
                if (response.success) {
                    setSubmitting(false); 
                    var arrayCopy1 = comments.items;
                    if (arrayCopy1.length === comments.itemLimit) {
                        arrayCopy1.splice(arrayCopy1.length - 1, 1);
                    }
                    arrayCopy1.unshift(response.comment); 
                    setComments({
                        ...comments,
                        items: arrayCopy1,
                        totalItems: comments.totalItems + 1,
                        totalRating: comments.totalRating + response.comment.rating,
                    });
                    setKomentaras('');
                    setRating(5);
                    
                } else {
                    setSubmitting(false); 
                }
            } catch (error){

            }
        } else {
            setSubmitting(false);
        }
    };

    const getComments = async (commentPage) => {
        try {
            const res = await fetch("/users/getComments/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product: product.name,
                    page: commentPage,
                }),
            });
            const response = await res.json();
            if (response.success) {
                setComments({
                    items: response.items,
                    totalItems: response.totalItems,
                    itemLimit: response.itemLimit,
                    currentPage: response.currentPage,
                    totalPages: response.totalPages,
                    hasNextPage: response.hasNextPage,
                    nextPage: response.nextPage,
                    hasPrevPage: response.hasPrevPage,
                    prevPage: response.prevPage,
                    pagingCounter: response.pagingCounter,
                    totalRating: response.totalRating
                });
            } 
        } catch (error) {
            
        }
    };

    const deleteComment = async (commentID) => {
        try {
            const req = await fetch("/users/deleteComment/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    commentID: commentID,
                }),
            });
            const response = await req.json();
            if (response.success) {
                if (comments.items.length === 1) {
                    if (comments.totalPages > 1) {
                        setPage(page - 1);
                    } else {
                        getComments(1);
                    }
                } else {
                    getComments(page);
                }
            } 
        } catch (error) {
            
        }
    };

    useEffect(() => {
        if (product.name) {
            getComments(page);
        }
        // eslint-disable-next-line
    }, [page, product])

    useEffect(() => {
        setVardas(firstName);
        // eslint-disable-next-line
    }, [firstName]);

    return (
        <Box classes={{root: classes.root}}>
            {product.name &&
                <>
                    <Box classes={{root: classes.leaveCoomentTopBox}}>
                        <h1 className={classes.header}>Atsiliepimai</h1>
                        <Rating 
                            name="totals" 
                            defaultValue={4} 
                            size="large" 
                            readOnly 
                            precision={0.5}
                            value={comments.totalRating / comments.totalItems}
                            classes={{root: classes.ratingScale}}
                        />
                        <h2 className={classes.atsiliepimuNera}>({comments.items.length > 0 ? (comments.totalRating / comments.totalItems).toFixed(1) : 0 }) ({comments.totalItems})</h2>
                    </Box>
                    <hr />
                    {comments.totalItems > 0 ?
                        <>
                            {comments.items.map((comment, i, row) => 
                                <>
                                    <Box classes={{root: classes.leaveCoomentTopBox}}>
                                        <h2 className={classes.header2}>{comment.name}</h2>
                                        <Rating 
                                            name="totals" 
                                            defaultValue={4} 
                                            size="medium" 
                                            readOnly 
                                            value={comment.rating}
                                            classes={{root: classes.ratingScaleSmall}}
                                        />
                                        {personalas.administracija &&
                                            <IoClose size={25} onClick={() => deleteComment(comment._id)} className={classes.icon}/>
                                        }
                                    </Box>
                                    <p className={classes.atsiliepimoTekstas}>{comment.comment}</p>
                                    {i + 1 !== row.length &&
                                        <hr className={classes.commentHR}/>
                                    }
                                </>
                            )}
                            { comments.totalPages > 1 &&
                                <Box classes={{root: classes.accountsBoxPagination}}>
                                    <Pagination 
                                        classes={{root: classes.pagination, ul: classes.paginationel}}
                                        count={comments.totalPages} 
                                        page={page} 
                                        onChange={handlePageChange} 
                                        // hideNextButton={true}
                                        // hidePrevButton={true}
                                    />
                                </Box>
                            }
                        </>
                    :
                        <h2 className={classes.atsiliepimuNera}>Atsiliepimų nėra</h2>
                    }
                    <hr />
                    <h2 className={classes.header2}>Palikite atsiliepimą:</h2>
                    <Box classes={{root: classes.leaveCoomentTopBox}}>
                        <TextField 
                            id="vardas" 
                            variant="outlined" 
                            classes={{root: classes.vardas}}
                            placeholder='Vardas'
                            value={vardas}
                            onChange={handleVardasChange}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                            }}
                        />
                        <div className={classes.ratingBox}>
                            <Rating 
                                name="size-large" 
                                defaultValue={5} 
                                size="large" 
                                onChange={handleRatingChange} 
                                value={rating}
                                classes={{root: classes.ratingScale}}
                            />
                        </div>
                        
                    </Box>
                    <TextField 
                        id="pastaba" 
                        variant="outlined" 
                        classes={{root: classes.pastaba}}
                        multiline
                        rows={3}
                        placeholder='Atsiliepimas'
                        value={komentaras}
                        onChange={handlePastabaChange}
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                        }}
                    />
                    <Button variant="contained" color="primary" component="span" classes={{root: classes.button, disabled: classes.buttonDisabled}} onClick={() => sendComment()}>
                        {submitting ? <CircularProgress size={20} className={classes.loadingIcon}/> : 'Siųsti'}
                    </Button>
                </> 
            }
        </Box>
    )
}

export default Comments
