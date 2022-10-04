import { forwardRef, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Slide, Button, Box } from '@material-ui/core';
import EmailEditor from 'react-email-editor';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backGroundColor: 'hotpink'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    button: {
        marginRight: '2rem',
        backgroundColor: theme.myTheme.tZalia.main,
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            height: '3.75rem',
            fontSize: '1.6rem',
            padding: '1.5rem',
            margin: '1rem 3rem 1rem 0',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '5rem',
            fontSize: '2rem',
            padding: '2rem',
            margin: '1.5rem 4rem 1.5rem 0',
            borderRadius: '9px'
        },
    },
    xIcon: {
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
            marginRight: '1rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem',
        },
    },
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
            emailEditorRef.current.editor.loadBlank({backgroundColor: '#ffffff'});
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
                            <CloseIcon className={classes.xIcon}/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <EmailEditor ref={emailEditorRef} appearance={{theme: 'dark'}} onLoad={onLoad} onReady={onReady} projectId={2}/>
        </Dialog>
    )
}

export default CreateEmailDialog
