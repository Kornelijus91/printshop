import { Button, CircularProgress } from '@material-ui/core'; 
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaPaintBrush } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
    uploadButton: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        backgroundColor: theme.myTheme.tZalia.main,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.baltas,
        height: '3em',
    },
    uploadButtonLabel: {
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
    },
    spinner: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    icon: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem'
        },
    },
}));

const EditDesignButtom = ({ userid, productID, productName, file, setFile }) => {

    const classes = useStyles();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const openApp = () => {
       
        window.ppclient.showApp();	
    };

    const validateApp = () => {
        setIsSubmitting(true);
        /* eslint-disable-next-line */
        window.ppclient = new PitchPrintClient({
            apiKey: 'key_b81eacdf1beec537a9ad736dca46a35b',		
            // designId: selectedTemplate, 
            projectId: file.projectId,
            mode: 'edit',
            custom: true,
            product: {
                id: productID, 
                title: productName
            },
            // langCode: 'lt',
            userId: userid !== '' ? userid : null,

        });
        window.ppclient.on('app-validated', openApp);
        window.ppclient.on('project-saved', projectSaved);
        window.ppclient.on('after-close-app', appClosed);
        window.ppclient.on('editor-shown', clearSelectedTemplateId);
    };

    var projectSaved = (_val) => {
        let _data = _val.data;	
        console.log('REDAGUOTI SAVED !!!');								
        console.log(_val);
        console.log('PREVIEW LINK', _data.previews[0])
        setFile({
            src: null,
            URL: _data.previews[0],
            type: '',
            size: 0,
            name: '',
            projectPreviewArray: _data.previews,
            projectId: _data.projectId
        });
    };

    const clearSelectedTemplateId = () => {
        setIsSubmitting(false);
    };

    const appClosed = () => {
        document.body.style.overflow = "auto";
    };

    return <div>

		<Button 
            variant="contained" 
            color="primary" 
            component="span"
            classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} 
            onClick={() => validateApp()}
            disabled={file.projectId === ''}
            startIcon={<FaPaintBrush size={20} className={classes.icon}/>}
        >
            {isSubmitting ? <CircularProgress size={20} className={classes.spinner}/> : "Redaguoti dizainą" }
        </Button>

    </div>;
};

export default EditDesignButtom;
