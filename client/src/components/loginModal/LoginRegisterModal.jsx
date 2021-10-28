import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { Modal, Container, Box, Backdrop, Fade, Tabs, Tab, Collapse, Grid } from '@material-ui/core';
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
  },
  root: {
    backgroundColor: theme.myTheme.trecia,
    fontFamily: theme.myTheme.sriftas,
    border: 'none',
    width: '25rem',
    outline: 'none',
    borderRadius: "7px",
    textAlign: "center",
    position: "absolute",  
    top: "15%",
    [theme.breakpoints.down('sm')]:{
      top: "5%",
    },
  },
  tabs: {
    marginBottom: "1rem",
    backgroundColor: theme.myTheme.pirma,
    borderRadius: "7px 7px 0px 0px",
    zIndex: '1',
    position: 'relative',
  },
  tab: {
    color: `${theme.myTheme.trecia} !important`,
    fontFamily: theme.myTheme.sriftas,
    fontWeight: "bold",
    zIndex: '10',
    width: '10rem'
  },
  tabFocused: {
    color: `${theme.myTheme.sriftoSpalva} !important`,
    fontFamily: theme.myTheme.sriftas,
    fontWeight: "bold",
    zIndex: '10',
    width: '10rem'
  },
  h2: {
    margin: ".5rem 0rem 1rem 0rem",
    color: theme.myTheme.sriftoSpalva,
    padding: "0px"
  },
  viewLink: {
    margin: '0',
    padding: '0',
    textDecoration: 'underline',
    color: theme.myTheme.antra,
    cursor: 'pointer',
  },
  indicator: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  bottomText: {
    color: theme.myTheme.sriftoSpalva,
    margin: '0 1rem 1rem .9rem'
  },
}));

export default function LoginRegisterModal({modalOpen, setModalOpen, setToken, setLoggedIn, setOAuthWindow, oAuthWindow, value, setValue, setUsername, setMoneySpent }) {
  const classes = useStyles();

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
  const [redirectPrivacy, setRedirectPrivacy] = useState(false)
  const [redirectTerms, setRedirectTerms] = useState(false)
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
    setRedirectPrivacy(true);
    setRedirectTerms(false);
  };

  const handleTermsOfServiceClick = (e) => {
    e.preventDefault();
    setModalOpen(false);
    setRedirectTerms(true);
    setRedirectPrivacy(false);
  };

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        disableScrollLock={true}
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
          setRedirectPrivacy(false);
          setRedirectTerms(false);
        }}>
          <Container classes={{root: classes.root}}>
            <Collapse 
              in={views.collapse} 
              collapsedSize={290}
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
                            <Grid container justifyContent="space-between" display='flex' alignItems='flex-end'>
                              <Grid item xl={1} xs={1} md={1} sm={1} lg={1}>
                                <Box style={{width: '100%', height: '.8rem', backgroundColor: 'transparent', borderRadius: "0 0 7px 0", boxShadow: '5px 5px 0 #F1FAEE'}}/>
                              </Grid>
                              <Grid item xl={10} xs={10} md={10} sm={10} lg={10}>
                                <Box style={{width: '100%', height: '3rem', backgroundColor: '#F1FAEE', borderRadius: "7px 7px 0px 0px",}}/>
                              </Grid>
                              <Grid item xl={1} xs={1} md={1} sm={1} lg={1}>
                                <Box style={{width: '100%', height: '.8rem', backgroundColor: 'transparent', borderRadius: "0 0 0 7px", boxShadow: '-5px 5px 0 #F1FAEE'}}/>
                              </Grid>
                            </Grid>
                          </div>
                        }}
                        centered
                        classes={{root: classes.tabs, indicator: classes.indicator}}
                      >
                          <Tab disableRipple={true} classes={{root: value === 'Prisijungti' ? classes.tabFocused : classes.tab}} value="Prisijungti" label="Prisijungti" />
                          <Tab disableRipple={true} classes={{root: value === 'Registruotis' ? classes.tabFocused : classes.tab}} value="Registruotis" label="Registruotis" />
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
                      <h3 className={classes.h2}>Greitas prisijungimas su:</h3>
                      <GoogleAuthButton setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} socialSubmitting={socialSubmitting} setSocialSubmitting={setSocialSubmitting} setOAuthWindow={setOAuthWindow} oAuthWindow={oAuthWindow}/>
                      <FacebookAuthButton setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} socialSubmitting={socialSubmitting} setSocialSubmitting={setSocialSubmitting} setOAuthWindow={setOAuthWindow} oAuthWindow={oAuthWindow}/>
                      <LinkedInAuthButton setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} socialSubmitting={socialSubmitting} setSocialSubmitting={setSocialSubmitting} setOAuthWindow={setOAuthWindow} oAuthWindow={oAuthWindow}/>
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
            {redirectPrivacy &&  <Redirect to="/privacypolicy" />}
            {redirectTerms &&  <Redirect to="/termsofservice" />}
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