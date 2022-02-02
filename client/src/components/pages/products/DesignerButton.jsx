import { Button, CircularProgress } from '@material-ui/core'; 
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// var loadjs = require('loadjs');
// import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
    uploadButton: {
        width: '14rem',
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        // margin: '.5rem 0 1rem 0',
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            // margin: '.75rem 0 1.5rem 0',
            width: '18.5rem',
            height: '3.375rem',
            borderRadius: '7px',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            // margin: '1rem 0 2rem 0',
            width: '28rem',
            height: '5rem',
            borderRadius: '9px',
            fontSize: '1.8rem',
        },
    },
    uploadButtonLabel: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
    },
    spinner: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
}));

const DesignerButton = ({ userid, productID, productName, setSelectTemplateModalOpen, selectedTemplate, setSelectedTemplate, setFile }) => {

    const classes = useStyles();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const openApp = () => {
        // console.log('SHOW APP CLICKED');
        window.ppclient.showApp();	
    };

    const validateApp = () => {
        setIsSubmitting(true);
        /* eslint-disable-next-line */
        window.ppclient = new PitchPrintClient({
            apiKey: 'key_b81eacdf1beec537a9ad736dca46a35b',		//Kinldy provide your own APIKey
            designId: selectedTemplate,	//Change this to your designId
            // projectId: 'dcat_8ee05c87a84907db7a53d908ce0dbd31',
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
        // window.ppclient.on('after-close-app', clearSelectedTemplateId);
        window.ppclient.on('editor-shown', clearSelectedTemplateId);
    };

    var projectSaved = (_val) => {
        let _data = _val.data;									//You can console.log the _data varaible to see all that's passed down
        // if (_data && _data.previews && _data.previews.length) {
        //     _previewDiv.innerHTML = _data.previews.reduce((_str, _prev) => `${_str}<img src="${_prev}">`, '');		//Show the preview images
        // }
        // console.log('DATA => ', _data);
        // console.log('PREVIEWS ->', _data.previews);
        // console.log('VALUE => ', _val);
        setFile({
            src: null,
            URL: _data.previews[0],
            type: '',
            size: 0,
            name: ''
        });
    };

    const clearSelectedTemplateId = () => {
        setIsSubmitting(false);
        setSelectedTemplate('');
        setSelectTemplateModalOpen(false);
    };

    
    // useEffect(() => {

        
    //     // eslint-disable-next-line
    // }, []);


    return <div>

		<Button 
            variant="contained" 
            color="primary" 
            component="span"
            classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}} 
            onClick={() => validateApp()}
            disabled={selectedTemplate === ''}
        >
            {isSubmitting ? <CircularProgress size={20} className={classes.spinner}/> : "Kurti dizainą" }
        </Button>

    </div>;
};

export default DesignerButton;
