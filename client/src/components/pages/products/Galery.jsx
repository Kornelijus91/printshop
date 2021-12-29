import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ImgsViewer from "react-images-viewer";
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2em',
        [theme.breakpoints.up('xxl')]: {
            marginTop: '2.7em',
        }, 
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '4em',
        }, 
    },
    header: {
        color: theme.myTheme.sriftoSpalva,
        margin: '0 1em 0 0',
        padding: 0,
        fontSize: '1.6rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.16rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3.2rem',
        },
    },
    galerijaBox: {
        width: '100%',
    },
    imageBox: {
        width: '50%',
        padding: '1em',
        borderRadius: '5px',
        '&:hover': {
            cursor: 'pointer'
        },
        [theme.breakpoints.up('sm')]: {
            width: '33.33%',
        }, 
        [theme.breakpoints.up('md')]: {
            width: '25%',
        }, 
        [theme.breakpoints.up('lg')]: {
            width: '20%',
        }, 
        [theme.breakpoints.up('xxl')]: {
            padding: '1.35em',
            borderRadius: '7px',
        }, 
        [theme.breakpoints.up('xxxl')]: {
            padding: '2em',
            borderRadius: '10px',
        }, 
    },
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
    },
}));

const Galery = ({ product }) => {

    const classes = useStyles();

    const [imgViewer, setImgViewer] = useState({
        open: false,
        currentImage: 0,
        images: []
    });

    useEffect(() => {
        var imgArray = [];
        for (const image of product.galerija) {
            imgArray.push({src: image});
        }
        setImgViewer({
            ...imgViewer,
            images: imgArray
        });
        // eslint-disable-next-line
    }, [product]);

    return (
        <Box classes={{root: classes.root}}>
            <h1 className={classes.header}>Galerija</h1>
            <hr />
            <Box display='flex' flexWrap='wrap' justifyContent='flex-start' alignItems='center' classes={{root: classes.galerijaBox}}>
                {product.galerija.map((item, index) => 
                    <Box key={index} classes={{root: classes.imageBox}} onClick={() => setImgViewer({ ...imgViewer, open: true, currentImage: index})}>
                        <img src={item} alt='' className={classes.image}/>
                    </Box>
                )}
            </Box>
            <ImgsViewer
                imgs={imgViewer.images}
                isOpen={imgViewer.open}
                currImg={imgViewer.currentImage}
                onClickPrev={() => setImgViewer({ ...imgViewer, currentImage: imgViewer.currentImage - 1})}
                onClickNext={() => setImgViewer({ ...imgViewer, currentImage: imgViewer.currentImage + 1})}
                onClose={() => setImgViewer({ ...imgViewer, open: false })}
            />
        </Box>  
    )
}

export default Galery
