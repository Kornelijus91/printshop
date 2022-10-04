import { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, InputAdornment } from '@material-ui/core';
import { IoIosSend } from "react-icons/io"; 
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx';
import Linkify from 'react-linkify';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '99%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 0,
        [theme.breakpoints.up('md')]: {
            marginTop: '1em',
        },
        [theme.breakpoints.up('xxl')]: {
            marginTop: '1.5em',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '4em',
        },
    },
    chatParent: {
        width: '100%',
        height: '100%',
        padding: '0 .5em 1em 0',
        [theme.breakpoints.up('md')]: {
            width: '50%',
            padding: '1em',
        },
    },
    roomsParent: {
        width: '100%',
        height: '100%',
        padding: '0 .5em 1em 0', 
        [theme.breakpoints.up('md')]: {
            width: '50%',
            padding: '1em',
        },
    },
    chatBox: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.myTheme.ketvirta,
        borderRadius: '5px',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
        },
    },
    roomsBox: {
        width: '100%',
        height: '100%',
        padding: '1em',
        // backgroundColor: theme.myTheme.antra,
        borderRadius: '5px',
        overflowY: 'auto',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
        },
    },
    chatWindowTop: {
        width: '100%',
        height: '10%',
        backgroundColor: theme.myTheme.sZalia.light,
        borderRadius: '5px 5px 0 0',
        display: 'flex',
        justifyContent: 'flex-start',
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
        height: '68%',
        overflowY: 'auto',
        backgroundColor: theme.myTheme.ruda.main,
        padding: '1em',
        [theme.breakpoints.up('md')]: {
            height: '78%',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '2em',
        },
    },
    chatWindowBottom: {
        width: '100%',
        height: '22%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0 0 5px 5px',
        padding: '0 0 0 1em',
        [theme.breakpoints.up('md')]: {
            height: '12%',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '0 0 7px 7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '0 0 9px 9px',
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
    textinput: {
        width: '100%',
    },
    input: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        paddingRight: '1.2em',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.3rem',
            paddingRight: '1.62em',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            paddingRight: '2.4em',
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
    customerName: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1.6em',
        margin: 0,
        padding: 0,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.14em',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3.2em',
        },
    },
    roomitem: {
        backgroundColor: theme.myTheme.tZalia.light,
        borderRadius: '5px',
        padding: '1em',
        marginBottom: '1em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
        },
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.myTheme.sZalia.main,
        }
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
    newDot: {
        width: '1rem',
        height: '1rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(230, 57, 70, 1)',
        marginRight: '1rem',
        animation: '$manoAnimacija 1s infinite',
        [theme.breakpoints.up('xxl')]: {
            width: '1.35rem',
            height: '1.35rem',
            marginRight: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '2rem',
            height: '2rem',
            marginRight: '2rem',
        },
    },
    "@keyframes manoAnimacija": {
        "0%": {
            boxShadow: '0 0 0 0 rgba(230, 57, 70, 0.5)',
        },
        "80%": {
            boxShadow: '0 0 0 10px rgba(230, 57, 70, 0.5)',
        },
        "100%": {
            boxShadow: '0 0 0 10px rgba(230, 57, 70, 0)',
        }
    },
}));

const Chat = ({ newChatrooms, newOrders, activeChatroom, setActiveChatroom, chat, setChat, sendMessage, message, setMessage }) => {

    const classes = useStyles();

    const handleTextinput = (e) => {
        setMessage(e.target.value);
    };

    const handleClickOnChatRoom = (id) => {
        var chatCopy = chat;
        
        chatCopy[id].new = false;
        setChat(chatCopy);
        setActiveChatroom(id);
    };

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noreferrer">
            {text}
        </a>
    );

    return (
        <Box classes={{root: classes.root}} >
            <Helmet defer={false}>
                <title>{newOrders + newChatrooms > 0 ? `(${newOrders + newChatrooms})` : ''} Pokalbiai | {ProjectName}</title>  
            </Helmet>
            <Box classes={{root: classes.chatParent}}>
                <Box classes={{root: classes.chatBox}}>
                    <Box classes={{root: classes.chatWindowTop}}>
                        {activeChatroom !== '' ?
                                <p className={classes.customerName}>{chat[activeChatroom].firstName}</p>
                            :
                                <p className={classes.customerName}>Nepasirinktas joks pokalbis.</p>
                        }
                    </Box>
                    <Box classes={{root: classes.chatWindowMiddle}}>
                        {activeChatroom !== '' && chat[activeChatroom].convo.length > 0 &&
                            <>
                                {chat[activeChatroom].convo.map((item) => 
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
                                                        backgroundColor: '#369693',
                                                    }
                                                :
                                                    {
                                                        backgroundColor: '#56c2bf',
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
                            </>
                        }
                        <AlwaysScrollToBottom />
                    </Box>
                    <Box classes={{root: classes.chatWindowBottom}}>
                        <TextField
                            id="filled-start-adornment"
                            classes={{root: classes.textinput}}
                            onChange={handleTextinput}
                            value={message}
                            multiline={true}
                            minRows={3}
                            disabled={activeChatroom === ''}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    sendMessage()
                                };
                            }}
                            placeholder='Žinutė...'
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><IoIosSend className={classes.iconsend} size={30} onClick={sendMessage}/></InputAdornment>, 
                                className: classes.input
                            }}
                            variant="outlined"
                        />
                    </Box>
                </Box>
            </Box>
            <Box classes={{root: classes.roomsParent}}>
                <Box classes={{root: classes.roomsBox}}>
                    {Object.entries(chat).length > 0 ? 
                        <>
                            {Object.entries(chat).map((item) =>
                                <Box 
                                    classes={{root: classes.roomitem}} 
                                    onClick={() => handleClickOnChatRoom(item[0])}
                                    style={activeChatroom === item[0] ?
                                            {boxShadow: '0 0 0 5px #0d2326'}
                                        :
                                            {boxShadow: 'none'}
                                    }
                                >
                                    <p className={classes.customerName}>{item[1].firstName}</p>
                                    {item[1].new && activeChatroom !== item[0] && //
                                        <Box classes={{root: classes.newDot}} />
                                    }
                                </Box>
                            )}
                        </>
                    :
                        <Box>
                            <p className={classes.customerName}>Pokalbių nėra.</p>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Chat
