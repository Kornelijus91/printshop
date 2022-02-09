import { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, Modal, Container, Box, Backdrop, Fade, Tabs, Tab, Collapse, Grid } from '@material-ui/core';
import LoginRegisterForm from './LoginRegisterForm';
import GoogleAuthButton from './GoogleAuthButton';
import FacebookAuthButton from './FacebookAuthButton';
import LinkedInAuthButton from './LinkedInAuthButton';
import ResetPasswordForm from './ResetPasswordForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'scroll',
    [theme.breakpoints.up('md')]:{
      overflow:'hidden',
    },
  },
  root: {
    backgroundColor: theme.myTheme.trecia,
    fontFamily: theme.myTheme.sriftas,
    border: 'none',
    width: '25rem',
    outline: 'none',
    borderRadius: "6px",
    textAlign: "center",
    position: "absolute",  
    top: "15%",
    [theme.breakpoints.down('sm')]:{
      top: "5%",
      width: '20rem',
    },
    [theme.breakpoints.up('xxl')]:{
      width: '33.75rem',
      borderRadius: "9px",
    },
    [theme.breakpoints.up('xxxl')]:{
      width: '50rem',
      borderRadius: "14px",
    },
  },
  tabs: {
    marginBottom: "1.2rem",
    backgroundColor: theme.myTheme.pirma,
    borderRadius: "6px 6px 0px 0px",
    zIndex: '1',
    position: 'relative',
    [theme.breakpoints.up('xxl')]:{
      marginBottom: "1.35rem",
      borderRadius: "9.45px 9.45px 0px 0px",
      height: '3.8rem',
    },
    [theme.breakpoints.up('xxxl')]:{
      marginBottom: "2rem",
      borderRadius: "14px 14px 0px 0px",
      height: '6rem',
    },
  },
  tab: {
    color: `${theme.myTheme.trecia} !important`,
    fontFamily: theme.myTheme.sriftas,
    fontWeight: "bold",
    zIndex: '10',
    width: '10rem',
    [theme.breakpoints.up('xxl')]:{
      width: '13.5rem',
      fontSize: '1.15rem',
      marginTop: '.5rem',
    },
    [theme.breakpoints.up('xxxl')]:{
      width: '20rem',
      fontSize: '1.6rem',
      marginTop: '1.2rem',
    },
  },
  tabFocused: {
    color: `${theme.myTheme.sriftoSpalva} !important`,
    fontFamily: theme.myTheme.sriftas,
    fontWeight: "bold",
    zIndex: '10',
    width: '10rem',
    [theme.breakpoints.up('xxl')]:{
      marginTop: '.5rem',
      width: '13.5rem',
      fontSize: '1.15rem',
    },
    [theme.breakpoints.up('xxxl')]:{
      width: '20rem',
      fontSize: '1.6rem',
      marginTop: '1.2rem',
    },
  },
  tablabel: {

  },
  TabLeft: {
    width: '100%', 
    height: '.8rem', 
    backgroundColor: 'transparent', 
    borderRadius: "0 0 7px 0", 
    boxShadow: '5px 5px 0 #F1FAEE',
    [theme.breakpoints.up('xxl')]:{
      height: '1.3rem', 
      borderRadius: "0 0 10px 0", 
      boxShadow: '8px 10px 0 #F1FAEE',
    },
    [theme.breakpoints.up('xxxl')]:{
      height: '1.6rem', 
      borderRadius: "0 0 14px 0", 
      boxShadow: '10px 10px 0 #F1FAEE',
    },
  },
  Tabmiddle: {
    width: '100%', 
    height: '3rem', 
    backgroundColor: theme.myTheme.trecia,
    borderRadius: "7px 7px 0px 0px",
    [theme.breakpoints.up('xxl')]:{
      height: '3.82rem', 
    },
    [theme.breakpoints.up('xxxl')]:{
      height: '6rem', 
    },
  },
  tabmiddlegriditem: {
    backgroundColor: theme.myTheme.trecia,
    borderRadius: "7px 7px 0px 0px",
    [theme.breakpoints.up('xxl')]:{
      borderRadius: "10px 10px 0px 0px",
      boxShadow: '0 5px 0 #F1FAEE',
    },
    [theme.breakpoints.up('xxxl')]:{
      borderRadius: "14px 14px 0px 0px",
    },
  },
  TabRight: {
    width: '100%', 
    height: '.8rem', 
    backgroundColor: 'transparent', 
    borderRadius: "0 0 0 7px", 
    boxShadow: '-5px 5px 0 #F1FAEE',
    [theme.breakpoints.up('xxl')]:{
      height: '1.3rem', 
      borderRadius: "0 0 0 10px", 
      boxShadow: '-8px 10px 0 #F1FAEE',
    },
    [theme.breakpoints.up('xxxl')]:{
      height: '1.6rem', 
      borderRadius: "0 0 0 14px", 
      boxShadow: '-10px 10px 0 #F1FAEE',
    },
  },
  h2: {
    margin: 0,
    color: theme.myTheme.sriftoSpalva,
    padding: 0,
    width: '22ch',
    [theme.breakpoints.up('xxl')]:{
      fontSize: '1.4rem',
      
    },
    [theme.breakpoints.up('xxxl')]:{
      fontSize: '2rem',
      
    },
  },
  viewLink: {
    margin: '0',
    padding: '0',
    textDecoration: 'underline',
    color: theme.myTheme.antra,
    cursor: 'pointer',
    [theme.breakpoints.up('xxl')]:{
      fontSize: '1.2rem'
    },
    [theme.breakpoints.up('xxxl')]:{
      fontSize: '1.7rem'
    },
  },
  indicator: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  bottomText: {
    color: theme.myTheme.sriftoSpalva,
    margin: '0 1rem 1rem .9rem',
    [theme.breakpoints.up('xxl')]:{
      margin: '0 1.35rem 1.35rem 1.215rem',
      fontSize: '1.2rem'
    },
    [theme.breakpoints.up('xxxl')]:{
      margin: '0 2rem 2rem 1.8rem',
      fontSize: '1.7rem'
    },
  },
  backdropp: {
    overflow: 'hidden !important'
  },
  sideHr: {
    width: '30%',
    borderTop: '1px solid rgba(29, 53, 87, 0.7)',
    [theme.breakpoints.up('xxxl')]:{
      borderTop: '2px solid rgba(29, 53, 87, 0.7)',
    },
  },
  hr: {
    width: '100%',
    borderTop: '1px solid rgba(29, 53, 87, 0.7)',
    [theme.breakpoints.up('xxl')]:{
      marginBottom: '1rem'
    },
    [theme.breakpoints.up('xxxl')]:{
      borderTop: '2px solid rgba(29, 53, 87, 0.7)',
    },
  },
  greitasprisijungimasBox: {
    width: '100%',
    paddingTop: '.5rem',
    [theme.breakpoints.up('xxl')]:{
      paddingTop: '.75rem',
    },
    [theme.breakpoints.up('xxxl')]:{
      paddingTop: '1rem',
    },
  },
  greitasPrisijungimasPaernt: {
    width: '100%',
    padding: '0 1rem',
    [theme.breakpoints.up('xxl')]:{
      padding: '0 1.35rem',
    },
    [theme.breakpoints.up('xxxl')]:{
      padding: '0 2rem',
    },
  },
}));

export default function LoginRegisterModal({modalOpen, setModalOpen, setToken, setLoggedIn, setOAuthWindow, oAuthWindow, value, setValue, setUsername, setMoneySpent }) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const screenSizexxl = useMediaQuery(theme.breakpoints.up('xxl'));
  const screenSizexxxl = useMediaQuery(theme.breakpoints.up('xxxl'));

  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
    cofirmPass: '',
  });

  const [registerValues, setRegisterValues] = useState({
      email: '',
      password: '',
      cofirmPass: '',
  });

  const [error, setError] = useState("")
  const [views, setViews] = useState({
    loginView: true,
    loginViewFade: true,
    collapse: true,
    resetViewFade: false
  });
  
  const [socialSubmitting, setSocialSubmitting] = useState({
    someone: false,
    google: false,
    facebook: false,
    linkedIn: false
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setError('');
    setLoginValues({
      email: '',
      password: '',
      cofirmPass: '',
    });
    setRegisterValues({
      email: '',
      password: '',
      cofirmPass: '',
    });
  };

  const handleClose = () => {
    setModalOpen(false);
    setError('');
  };

  const handlePrivacyPolicyClick = (e) => {
    e.preventDefault();
    setModalOpen(false);
    history.push('/privatumopolitika');
  };

  const handleTermsOfServiceClick = (e) => {
    e.preventDefault();
    setModalOpen(false);
    history.push('/pirkimotaisykles');
  };

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        disableScrollLock={true}
        // disablePortal={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{}}
    >
        <Fade in={modalOpen} onExited={() => {
          setViews({
            loginView: true,
            loginViewFade: true,
            collapse: true,
            resetViewFade: false
          });
          setValue("Prisijungti");
        }}>
          <Container classes={{root: classes.root}}>
            <Collapse 
              in={views.collapse} 
              collapsedSize={screenSizexxxl ? 580 : screenSizexxl ? 391 : 290 }
            >
                {views.loginView ?
                  <Fade 
                    in={views.loginViewFade} 
                    onExited={() => setViews({...views, loginView: false, resetViewFade: true})}
                  >
                    <Box>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        // textColor="secondary"
                        TabIndicatorProps={{ children: 
                          <div>
                            <Grid container display='flex' justifyContent="center" alignItems='flex-end'>
                              <Grid item xl={1} xs={1} md={1} sm={1} lg={1}>
                                <Box classes={{root: classes.TabLeft}}/>
                              </Grid>
                              <Grid item xl={10} xs={10} md={10} sm={10} lg={10} className={classes.tabmiddlegriditem}>
                                <Box classes={{root: classes.Tabmiddle}}/>
                              </Grid>
                              <Grid item xl={1} xs={1} md={1} sm={1} lg={1}>
                                <Box classes={{root: classes.TabRight}}/>
                              </Grid>
                            </Grid>
                          </div>
                        }}
                        centered
                        classes={{root: classes.tabs, indicator: classes.indicator}}
                      >
                          <Tab disableRipple={true} classes={{root: value === 'Prisijungti' ? classes.tabFocused : classes.tab, wrapper: classes.tablabel}} value="Prisijungti" label="Prisijungti" />
                          <Tab disableRipple={true} classes={{root: value === 'Registruotis' ? classes.tabFocused : classes.tab, wrapper: classes.tablabel}} value="Registruotis" label="Registruotis" />
                      </Tabs>
                      <Box display="flex" justifyContent="center">
                        <LoginRegisterForm 
                          setToken={setToken} 
                          setModalOpen={setModalOpen} 
                          setLoggedIn={setLoggedIn} 
                          value={value}
                          error={error}
                          setError={setError}
                          setOAuthWindow={setOAuthWindow} 
                          oAuthWindow={oAuthWindow}
                          loginValues={loginValues}
                          setLoginValues={setLoginValues}
                          registerValues={registerValues}
                          setRegisterValues={setRegisterValues}
                          setUsername={setUsername}
                          setMoneySpent={setMoneySpent}
                        />  
                      </Box>
                      <Collapse in={value === "Prisijungti"}>
                        <p onClick={() => {setError(''); setViews({...views, loginViewFade: false, collapse: false});}} className={classes.viewLink}>
                          Pamiršote slaptažodį?
                        </p> 
                      </Collapse>
                      <Box classes={{root: classes.greitasPrisijungimasPaernt}}>
                        <Box display='flex' justifyContent='center' alignItems='center' className={classes.greitasprisijungimasBox}>
                          <hr className={classes.sideHr}/>
                          <h3 className={classes.h2}>Greitas prisijungimas:</h3>
                          <hr className={classes.sideHr}/>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                          <GoogleAuthButton setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} socialSubmitting={socialSubmitting} setSocialSubmitting={setSocialSubmitting} setOAuthWindow={setOAuthWindow} oAuthWindow={oAuthWindow}/>
                          <FacebookAuthButton setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} socialSubmitting={socialSubmitting} setSocialSubmitting={setSocialSubmitting} setOAuthWindow={setOAuthWindow} oAuthWindow={oAuthWindow}/>
                          <LinkedInAuthButton setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} socialSubmitting={socialSubmitting} setSocialSubmitting={setSocialSubmitting} setOAuthWindow={setOAuthWindow} oAuthWindow={oAuthWindow}/>
                        </Box>
                        <hr className={classes.hr}/>
                      </Box>
                    </Box> 
                  </Fade>
                  :
                  <Fade in={views.resetViewFade} 
                    onExited={() => setViews({...views, loginView: true, loginViewFade: true, collapse: true,})}
                  >
                    <Box >
                      <ResetPasswordForm setModalOpen={setModalOpen}/>
                      <p onClick={()=> setViews({
                          ...views,
                          resetViewFade: false, 
                      })} className={classes.viewLink}>
                        Atgal
                      </p> 
                    </Box>
                  </Fade>
                }
            </Collapse>
            <Collapse in={views.collapse}>
              <p className={classes.bottomText}>
                Užsiregistruodami sutinkate su mūsų svetainės <a href="/" onClick={(e)=> handleTermsOfServiceClick(e)} className={classes.viewLink}>naudojimosi sąlygomis</a> ir <a href="/" onClick={(e)=> handlePrivacyPolicyClick(e)} className={classes.viewLink}> privatumo politika</a>.
              </p> 
            </Collapse>
          </Container>
        </Fade>
    </Modal>
  );
}