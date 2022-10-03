import { Button, CircularProgress } from '@material-ui/core'; 
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    uploadButton: {
        fontSize: theme.myTheme.sizeM,
        width: '14em',
        height: '3em',
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.balta,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        '&.Mui-disabled': {
            backgroundColor: theme.myTheme.sZalia.light,
        },
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
}));

const DesignerButton = ({ userid, productID, productName, setSelectTemplateModalOpen, selectedTemplate, setSelectedTemplate, setFile }) => {

    const classes = useStyles();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const openApp = () => {
        window.ppclient.showApp();	
    };

    const validateApp = () => {
        setIsSubmitting(true);
        /* eslint-disable-next-line */
        window.ppclient = new PitchPrintClient({
            apiKey: 'key_b81eacdf1beec537a9ad736dca46a35b',		//Kinldy provide your own APIKey
            designId: selectedTemplate, 
            // projectId: file.projectId !== '' ? file.projectId : null,
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
        setSelectedTemplate('');
        setSelectTemplateModalOpen(false);
    };

    const appClosed = () => {
        document.body.style.overflow = "auto";
    };

    return <div>

		<Button 
            variant="contained" 
            color="primary" 
            component="span"
            classes={{
                root: classes.uploadButton, 
                label: classes.uploadButtonLabel, 
            }} 
            onClick={() => validateApp()}
            disabled={selectedTemplate === ''}
        >
            {isSubmitting ? <CircularProgress size={20} className={classes.spinner}/> : "Kurti dizainą" }
        </Button>

    </div>;
};

export default DesignerButton;
