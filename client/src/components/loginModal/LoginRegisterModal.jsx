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
    backgroundColor: theme.myTheme.ruda.main,
    fontFamily: theme.myTheme.sriftas,
    border: 'none',
    width: 'clamp(25rem, 20vw, 50rem)',
    outline: 'none',
    borderRadius: theme.myTheme.sizeBorderRadiusSmall,
    textAlign: "center",
    position: "absolute",  
    top: "15%",
    [theme.breakpoints.down('sm')]:{
      top: "5%",
      width: '20rem',
    },
  },
  tabs: {
    width: '100%',
    
    marginBottom: theme.myTheme.sizeMM,
    backgroundColor: theme.myTheme.juoda,
    borderRadius: "6px 6px 0px 0px",
    zIndex: '1',
    position: 'relative',
    height: 'clamp(3rem, 2.4vw, 6rem)',
    [theme.breakpoints.up('xxl')]:{
      borderRadius: "8.4px 8.4px 0px 0px",
    },
    [theme.breakpoints.up('xxxl')]:{
      borderRadius: "12px 12px 0px 0px",
    },
  },
  tab: {
    color: `${theme.myTheme.balta} !important`,
    transition:'color .4s ease', 
    fontFamily: theme.myTheme.sriftas,
    fontWeight: "bold",
    zIndex: '10',
    width: 'clamp(10rem, 8vw, 20rem)',
    fontSize: theme.myTheme.sizeM,
    marginTop: theme.myTheme.sizeXXXS,
    [theme.breakpoints.up('xxl')]:{
      marginTop: theme.myTheme.sizeXXS,
    },
    [theme.breakpoints.up('xxxl')]:{
      fontSize: theme.myTheme.sizeS,
    },
  },
  tabFocused: {
    color: `${theme.myTheme.juoda} !important`,
    transition:'color .4s ease', 
    fontFamily: theme.myTheme.sriftas,
    fontWeight: "bold",
    zIndex: '10',
    width: 'clamp(10rem, 8vw, 20rem)',
    fontSize: theme.myTheme.sizeM,
    marginTop: theme.myTheme.sizeXXXS,
    [theme.breakpoints.up('xxl')]:{
      marginTop: theme.myTheme.sizeXXS,
    },
    [theme.breakpoints.up('xxxl')]:{
      fontSize: theme.myTheme.sizeS,
    },
  },
  tablabel: {

  },
  TabLeft: {
    width: '100%', 
    height: theme.myTheme.sizeS,
    backgroundColor: 'transparent', 
    borderRadius: "0 0 7px 0", 
    boxShadow: '5px 5px 0 #dddfd4',
    [theme.breakpoints.up('xxl')]:{
      borderRadius: "0 0 9.8px 0", 
      boxShadow: '8px 10px 0 #dddfd4',
    },
    [theme.breakpoints.up('xxxl')]:{
      borderRadius: "0 0 14px 0", 
      boxShadow: '10px 10px 0 #dddfd4',
    },
  },
  Tabmiddle: {
    width: '100%', 
    height: 'clamp(3rem, 2.4vw, 6rem)',
    backgroundColor: theme.myTheme.ruda.main,
    borderRadius: "7px 7px 0px 0px",
    [theme.breakpoints.up('xxl')]:{
      borderRadius: "9.8px 9.8px 0px 0px",
    },
    [theme.breakpoints.up('xxxl')]:{
      borderRadius: "14px 14px 0px 0px",
    },
  },
  tabmiddlegriditem: {
    backgroundColor: theme.myTheme.ruda.main,
    borderRadius: "7px 7px 0px 0px",
    [theme.breakpoints.up('xxl')]:{
      borderRadius: "9.8px 9.8px 0px 0px",
      boxShadow: '0 10px 0 #dddfd4',
    },
    [theme.breakpoints.up('xxxl')]:{
      borderRadius: "14px 14px 0px 0px",
      boxShadow: '0 15px 0 #dddfd4',
    },
  },
  TabRight: {
    width: '100%', 
    height: theme.myTheme.sizeS,
    backgroundColor: 'transparent', 
    borderRadius: "0 0 0 7px", 
    boxShadow: '-5px 5px 0 #dddfd4',
    [theme.breakpoints.up('xxl')]:{
      borderRadius: "0 0 0 9.8px", 
      boxShadow: '-7px 7px 0 #dddfd4',
    },
    [theme.breakpoints.up('xxxl')]:{
      borderRadius: "0 0 0 14px", 
      boxShadow: '-10px 10px 0 #dddfd4',
    },
  },
  h2: {
    margin: 0,
    color: theme.myTheme.juoda,
    padding: 0,
    width: '22ch',
    fontSize: theme.myTheme.sizeM,

  },
  viewLink: {
    margin: '0',
    padding: '0',
    textDecoration: 'underline',
    color: theme.myTheme.sZalia.main,
    cursor: 'pointer',
    fontSize: theme.myTheme.sizeS,
  },
  indicator: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  bottomText: {
    color: theme.myTheme.juoda,
    fontSize: theme.myTheme.sizeS,
    marginTop:0,
    marginBottom: theme.myTheme.sizeM,
  },
  backdropp: {
    overflow: 'hidden !important'
  },
  sideHr: {
    width: '30%',
    height: theme.myTheme.sizeXXXS,
    backgroundColor: theme.myTheme.sZalia.main,
    borderRadius: theme.myTheme.sizeBorderRadiusLarge,
  },
  hr: {
    width: '100%',
    height: theme.myTheme.sizeXXXS,
    backgroundColor: theme.myTheme.sZalia.main,
    borderRadius: theme.myTheme.sizeBorderRadiusLarge,
    marginBottom: theme.myTheme.sizeXS,
  },
  greitasprisijungimasBox: {
    width: '100%',
    paddingTop: theme.myTheme.sizeXS,
  },
  greitasPrisijungimasPaernt: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: theme.myTheme.sizeM,
    paddingLeft: theme.myTheme.sizeM,
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
              collapsedSize={screenSizexxxl ? 560 : screenSizexxl ? 370 : 300 }
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
                          <div className={classes.sideHr}/>
                          <h3 className={classes.h2}>Greitas prisijungimas:</h3>
                          <div className={classes.sideHr}/>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                          <GoogleAuthButton setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} socialSubmitting={socialSubmitting} setSocialSubmitting={setSocialSubmitting} setOAuthWindow={setOAuthWindow} oAuthWindow={oAuthWindow}/>
                          <FacebookAuthButton setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} socialSubmitting={socialSubmitting} setSocialSubmitting={setSocialSubmitting} setOAuthWindow={setOAuthWindow} oAuthWindow={oAuthWindow}/>
                          <LinkedInAuthButton setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} socialSubmitting={socialSubmitting} setSocialSubmitting={setSocialSubmitting} setOAuthWindow={setOAuthWindow} oAuthWindow={oAuthWindow}/>
                        </Box>
                        <div className={classes.hr}/>
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