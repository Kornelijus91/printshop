import { useState, useRef, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Box, Fade, TextField, InputAdornment, Badge } from '@material-ui/core';
import { IoChatboxEllipses } from "react-icons/io5"; 
import { IoMdClose, IoIosSend } from "react-icons/io"; 
import Treklama01 from '../../../media/Treklama01.png';
import {SocketContext} from '../../../socket';
import Linkify from 'react-linkify';
// import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    iconsend: {
        color: theme.myTheme.sriftoSpalva,
        '&:hover': {
            color: '#335d99',
            cursor: 'pointer'
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    topiconclose: {
        color: theme.myTheme.trecia,
        '&:hover': {
            color: '#e6e6e6',
            cursor: 'pointer'
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    fab: {
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: '20',
        backgroundColor: theme.myTheme.ketvirta,
        margin: 0,
        padding: 0,
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        '&:hover': {
            backgroundColor: theme.myTheme.antra,
        },
        [theme.breakpoints.up('xxl')]: {
            width: '4.05rem',
            height: '4.05rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '6rem',
            height: '6rem',
        },
    },
    chatWindow: {
        width: '20em',
        height: '35em',
        position: 'fixed',
        right: 20,
        bottom: 85,
        zIndex: '20',
        borderRadius: '5px',
        boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
        backgroundColor: theme.myTheme.ketvirta,
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            boxShadow: '0px 4px 7px -1.35px rgb(0 0 0 / 20%), 0px 8px 13px 0px rgb(0 0 0 / 14%), 0px 1.35px 24px 0px rgb(0 0 0 / 12%)',
            width: '27em',
            height: '47.25em',
            right: 27,
            bottom: 114,
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            boxShadow: '0px 6px 10px -2px rgb(0 0 0 / 20%), 0px 12px 20px 0px rgb(0 0 0 / 14%), 0px 2px 36px 0px rgb(0 0 0 / 12%)',
            width: '40em',
            height: '70em',
            right: 40,
            bottom: 170,
        },
    },
    chatWindowTop: {
        width: '100%',
        height: '10%',
        backgroundColor: theme.myTheme.pirma,
        borderRadius: '5px 5px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1em',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px 7px 0 0',
            padding: '0 1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px 9px 0 0',
            padding: '0 2em',
        },
    },
    chatWindowMiddle: {
        width: '100%',
        height: '78%',
        overflowY: 'auto',
        backgroundColor: theme.myTheme.trecia,
        padding: '1em',
        [theme.breakpoints.up('xxl')]: {
            padding: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '2em',
        },
    },
    chatWindowBottom: {
        width: '100%',
        height: '12%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0 0 5px 5px',
        padding: '0 0 0 1em',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '0 0 7px 7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '0 0 9px 9px',
        },
    },
    trlogo: {
        width: '80%',
        height: '80%',
        objectFit: 'contain',
    },
    textinput: {
        width: '100%',
    },
    input: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.3rem',
            paddingRight: '1em',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            paddingRight: '1em',
        },
    },
    messageParent: {
        width: '100%'
    },
    messageBox: {
        maxWidth: '80%',
        padding: '.5em',
        marginBottom: '1em',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        borderRadius: '5px 5px',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px 7px',
            fontSize: '1.3rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px 9px',
            fontSize: '2rem',
        },
    },
    timeBox: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        opacity: 0.75,
        fontSize: '.8rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.08rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.6rem',
        },
    },
    fabIconBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    badge: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '.67rem',
        backgroundColor: '#26a69a',
        transform:  'translate(1rem, -1rem)',
        boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
        [theme.breakpoints.up('xxl')]: {
            // fontSize: '.95rem',
            transform:  'translate(1.7rem, -1.7rem) scale(1.35)',
            // transform: 'scale(1.35)',
        },
        [theme.breakpoints.up('xxxl')]: {
            // fontSize: '1.34rem',
            transform:  'translate(2.7rem, -2.7rem) scale(2)',
            // transform: 'scale(1.35)',
        },
    },
    message: {
        margin: '0 0 .5em 0',
        padding: 0
    },
}));

const Chat = ({ username, firstName }) => {  // socket

    const classes = useStyles();

    const socket = useContext(SocketContext);

    const [chatOpen, setChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [newstIncMsg, setNewstIncMsg] = useState({
        message: '',
        time: null
    });
    const [newMessageCount, setNewMessageCount] = useState(0);
    const [convo, setConvo] = useState([
        {
            from: 'them',
            message: 'Sveiki, kuo galėtume padėti?',
            time: new Date()
        }
    ]);

    const handleTextinput = (e) => {
        setMessage(e.target.value);
    };

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const sendMessage = () => {
        if (message !== '') {
            socket.emit('messageFromClient', {
                username: username,
                firstName: firstName,
                message: message
            });
            setConvo([
                ...convo,
                {
                    from: 'me',
                    message: message,
                    time: new Date()
                }
            ]);
            setMessage('');
        }
    };

    const handleincomingMessage = (msg) => {
        setNewstIncMsg({
            message: msg,
            time: new Date()
        });
    };

    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noreferrer">
            {text}
        </a>
    );

    useEffect(() => {
        socket.on('messageToClient', handleincomingMessage);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (newstIncMsg.message !== '') {
            if (!chatOpen) {
                setNewMessageCount(newMessageCount + 1);
            }
            setConvo([
                ...convo,
                {
                    from: 'them',
                    message: newstIncMsg.message,
                    time: newstIncMsg.time,
                }
            ]);
            setNewstIncMsg({
                message: '',
                time: null
            });

        }
        // eslint-disable-next-line
    }, [newstIncMsg]);

    useEffect(() => {
        if (chatOpen) {
            setNewMessageCount(0);
        }
        // eslint-disable-next-line
    }, [chatOpen]);

    return (
        <>
            <Fade in={chatOpen}>
                <Box classes={{root: classes.chatWindow}}>
                    <Box classes={{root: classes.chatWindowTop}}>
                        <img src={Treklama01} alt='Tavo reklama' className={classes.trlogo}/>
                        <IoMdClose className={classes.topiconclose} size={20} onClick={() => setChatOpen(false)}/>
                    </Box>
                    <Box classes={{root: classes.chatWindowMiddle}}>
                        {convo.map((item) => 
                            <Box 
                                classes={{root: classes.messageParent}} 
                                style={
                                    item.from === 'me' ?
                                        {
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }
                                    :
                                        {
                                            display: 'flex',
                                            justifyContent: 'flex-start'
                                        }
                                }
                            >
                                <Box 
                                    classes={{root: classes.messageBox}}
                                    style={
                                        item.from === 'me' ?
                                            {
                                                backgroundColor: '#7fcacc',
                                            }
                                        :
                                            {
                                                backgroundColor: '#A8DADC',
                                            }
                                    }
                                >
                                    <Linkify componentDecorator={componentDecorator}>{item.message}</Linkify>
                                    <Box 
                                        classes={{root: classes.timeBox}}
                                        style={
                                            item.from === 'me' ?
                                                {
                                                    display: 'flex',
                                                    justifyContent: 'flex-end'
                                                }
                                            :
                                                {
                                                    display: 'flex',
                                                    justifyContent: 'flex-start'
                                                }
                                        }
                                    >
                                        {`${('0' + (item.time.getHours())).slice(-2)}:${('0' + (item.time.getMinutes())).slice(-2)}`}
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        <AlwaysScrollToBottom />
                    </Box>
                    <Box classes={{root: classes.chatWindowBottom}}>
                        <TextField
                            id="filled-start-adornment"
                            classes={{root: classes.textinput}}
                            onChange={handleTextinput}
                            value={message}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    sendMessage()
                                };
                            }}
                            placeholder='Žinutė...'
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><IoIosSend className={classes.iconsend} size={20} onClick={sendMessage}/></InputAdornment>,
                                className: classes.input
                            }}
                            variant="outlined"
                        />
                    </Box>
                </Box>
            </Fade>
            <Fab aria-label="chat" variant='extended' classes={{root: classes.fab}} onClick={() => setChatOpen(!chatOpen)}>
                <Badge 
                    badgeContent={newMessageCount} 
                    invisible={chatOpen || newMessageCount <= 0} 
                    classes={{badge: classes.badge}}
                    anchorOrigin={{ 
                        vertical: 'top', 
                        horizontal: 'right'
                    }}
                >
                    <Box classes={{root: classes.fabIconBox}}>
                        {chatOpen ?
                            <IoMdClose className={classes.icon} size={25}/>
                        :
                            <IoChatboxEllipses className={classes.icon} size={25}/>
                        }
                    </Box>
                </Badge>
            </Fab>
        </>
    )
}

export default Chat
