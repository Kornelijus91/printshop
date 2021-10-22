import { forwardRef, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Slide, Button, Box } from '@material-ui/core';
import EmailEditor from 'react-email-editor';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    button: {
        marginRight: '2rem',
        backgroundColor: theme.myTheme.sriftoSpalva,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        '&:hover': {
            backgroundColor: '#132339',
        },
    }
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateEmailDialog = ({ modal, setModal, setLetter, letter }) => {

    const classes = useStyles();

    const emailEditorRef = useRef(null);

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            // console.log(design);
            // console.log(typeof data);
            setLetter({
                ...letter,
                HTML: html,
                JSON: design
            });
            setModal(false);
        });
    };

    const onLoad = () => {
        // console.log('onLoad');
        
        // emailEditorRef.current.editor.addEventListener(
        //     'design:loaded',
        //     onDesignLoad
        // );
        
        // emailEditorRef.current.editor.loadDesign(template);
        // emailEditorRef.current.editor.loadBlank({backgroundColor: '#e7e7e7'});
    }
    
    
    const onReady = () => {
        // editor is ready
        // console.log('onReady');
        if (letter.HTML !== '') {
            emailEditorRef.current.editor.loadDesign(letter.JSON);
        } else {
            emailEditorRef.current.editor.loadBlank({backgroundColor: '#F1FAEE'});
        }
        
    };

    const handleClose = () => {
        setModal(false);
    };

    return (
        <Dialog fullScreen open={modal} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Box style={{width: '100%'}} display="flex" justifyContent='flex-end' alignItems='center'>
                        <Button autoFocus color="inherit" onClick={exportHtml} className={classes.button}>
                            Sukurti
                        </Button>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <EmailEditor ref={emailEditorRef} appearance={{theme: 'dark'}} onLoad={onLoad} onReady={onReady} projectId={2}/>
        </Dialog>
    )
}

export default CreateEmailDialog
