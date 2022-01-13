import { makeStyles } from '@material-ui/core/styles';
import { useState, useCallback, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import AdminPanelV2 from './components/AdminPanelV2';
import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100%',
    backgroundColor: theme.myTheme.sriftospalva,
    height: '100vh',
  },
}));

function App() {

  const classes = useStyles();

  const [user, setUser] = useState({
    token: null,
    loggedIn: false,
    username: '',
    personalas: false,
    administracija: false,
  });

  const socket = io("/valdovas"); 

  const verifyUser = useCallback(() => {
    fetch("/users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        if (data.personalas || data.administracija) {
          setUser({
            token: data.token,
            loggedIn: true,
            username: data.username,
            personalas: data.personalas,
            administracija: data.administracija,
          });
          const timer = setTimeout(() => {
            verifyUser();
          }, 3 * 60 * 60 * 1000);
          return () => {
            clearTimeout(timer);
          };
        } else {
          fetch("/users/logout/", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${data.token}`,
            },
          }).then(async response => {
            setUser({
              token: null,
              loggedIn: false,
              username: '',
              personalas: false,
              administracija: false,
            });
            window.localStorage.setItem("logout", Date.now())
          })
        }
      } else {
        setUser({
          token: null,
          loggedIn: false,
          username: '',
          personalas: false,
          administracija: false,
        });
      }
    })
  },[])

  useEffect(() => {
      verifyUser();
  }, [verifyUser]); 

  return (
    <div className={classes.body}>
      {(user.personalas || user.administracija) && user.loggedIn ? 
        
        <AdminPanelV2 
          user={user}
          setUser={setUser}
          socket={socket}
        />
      :
        <LoginForm setUser={setUser}/>
      } 
    </div>
  );
}

export default App;
