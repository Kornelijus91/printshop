import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ImgsViewer from "react-images-viewer";
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeM,
        marginTop: '2em',
    },
    header: {
        color: theme.myTheme.juoda,
        margin: '0 1em 0 0',
        padding: 0,
        fontSize: theme.myTheme.sizeXL,
    },
    galerijaBox: {
        width: '100%',
    },
    imageBox: {
        fontSize: theme.myTheme.sizeM,
        width: '50%',
        padding: '1em',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
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
