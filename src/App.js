import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { spring, AnimatedSwitch } from "react-router-transition";
import "./App.css";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import { Textfit } from "react-textfit";
import { IntlProvider, FormattedMessage, addLocaleData } from "react-intl";
import locale_ru from "react-intl/locale-data/ru";
import locale_en from "react-intl/locale-data/en";
import messages_en from "./translations/en.json";
import messages_ru from "./translations/ru.json";

import Toolbar from "@material-ui/core/Toolbar";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { Provider } from "react-redux";
import { getUserData, logoutUser } from "./redux/actions/userActions";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import reduxStore from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import MyDrawer from "./components/Drawer";
import theme, { cssdata } from "./util/theme";

import homescreen from "./pages/homescreen";
import profile from "./pages/profile";
import jobs from "./pages/jobs";
import tasks from "./pages/tasks";
import make_tasks from "./pages/make_tasks";
import info from "./pages/info";
import token from "./util/Auth";
import AuthRoute from "./util/AuthRoute";
import LoginLogoutButton from "./components/Button";
import recognition from "./pages/ai/recognition";
import vacancies from "./pages/vacancies";
import stats from "./pages/stats";
import news from "./pages/news";
import loginscreen from "./pages/loginscreen";
import terms from "./pages/terms";
import adminka from "./pages/adminka";
import refsys from "./pages/refsys";
import Footer from "./components/Footer";

import Cookies from "js-cookie";
// import { GAInitiailizer } from "react-google-analytics";
import { YMInitializer, ym } from "react-yandex-metrika";
import { initializeFirebase } from "./util/push";
import { Grid } from "@material-ui/core";

const search = window.location.search; // could be '?foo=bar'
const params = new URLSearchParams(search);
const reflink = params.get("reflink"); // bar
if (reflink) {
  localStorage.setItem("reflink", reflink);
  Cookies.set("reflink", reflink);
}
const language = navigator.language.split(/[-_]/)[0];
const messages = {
  ru: messages_ru,
  en: messages_en
};
addLocaleData([...locale_ru, ...locale_en]);
axios.defaults.baseURL = "https://satoshiboom.com/back/tools/";

if (token) {
  axios.defaults.headers.common["Authorization"] = token;
  reduxStore.dispatch({ type: SET_AUTHENTICATED });
  reduxStore.dispatch(getUserData());
  initializeFirebase(token);
}
// else reduxStore.dispatch(logoutUser());

// console.log(axios.defaults.headers);

const useStyles = makeStyles(theme => cssdata);

function App() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  // we need to map the `scale` prop we define below
  // to the transform style property
  function mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`
    };
  }

  // wrap the `spring` helper to use a bouncy config
  function bounce(val) {
    return spring(val, {
      stiffness: 150,
      damping: 22
    });
  }

  // child matches will...
  const bounceTransition = {
    // start in a transparent, upscaled state
    atEnter: {
      opacity: 0,
      scale: 1.4
    },
    // leave in a transparent, downscaled state
    atLeave: {
      opacity: bounce(0),
      scale: bounce(0.2)
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
      opacity: bounce(1),
      scale: bounce(1)
    }
  };

  return (
    <div className="backgroundTile">
      <YMInitializer accounts={[54650470]} options={{ webvisor: true }} />
      <MuiThemeProvider theme={theme}>
        <Provider store={reduxStore}>
          <IntlProvider locale={language} messages={messages[language]}>
            <Router>
              <div className="App">
                <AppBar
                  position="static"
                  className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                  })}
                >
                  <Toolbar>
                    <IconButton
                      onClick={handleDrawerOpen}
                      edge="start"
                      className={clsx(classes.menuButton, open && classes.hide)}
                      color="inherit"
                      aria-label="Menu"
                    >
                      <MenuIcon />
                    </IconButton>

                    <Textfit
                      variant="h6"
                      className={classes.title}
                      mode="multi"
                      forceSingleModeWidth={true}
                    >
                      <Link className={classes.plink} to="/">
                        <FormattedMessage id="app.title" />
                      </Link>
                    </Textfit>

                    <Textfit
                      variant="h6"
                      className={classes.title2}
                      mode="multi"
                      max={70}
                      forceSingleModeWidth={true}
                    >
                      <Link className={classes.plink} to="/">
                        <FormattedMessage id="app.hometitle1" />
                      </Link>
                    </Textfit>

                    <LoginLogoutButton />
                  </Toolbar>
                </AppBar>
                <MyDrawer classes={classes} open={open} setOpen={setOpen} />
                <div>
                  <hr />
                  <AnimatedSwitch
                    atEnter={bounceTransition.atEnter}
                    atLeave={bounceTransition.atLeave}
                    atActive={bounceTransition.atActive}
                    mapStyles={mapStyles}
                    className="route-wrapper"
                  >
                    <Grid container direction="column" alignItems="stretch">
                      <Grid item style={{ minHeight: "80vh" }}>
                        <Route exact path="/" component={homescreen} />
                        <AuthRoute exact path="/profile" component={profile} />
                        <AuthRoute exact path="/stats" component={stats} />
                        <AuthRoute exact path="/refsys" component={refsys} />
                        <AuthRoute exact path="/adminka" component={adminka} />
                        <Route exact path="/login" component={loginscreen} />
                        <Route exact path="/jobs" component={jobs} />
                        <Route
                          exact
                          path="/make_tasks"
                          component={make_tasks}
                        />
                        <Route exact path="/tasks" component={tasks} />
                        <Route exact path="/info" component={info} />
                        <Route
                          exact
                          path="/recognition"
                          component={recognition}
                        />
                        <Route exact path="/news" component={news} />
                        <Route exact path="/vacancies" component={vacancies} />
                        <Route exact path="/terms" component={terms} />
                      </Grid>
                      <Grid item className={classes.footer}>
                        <br />
                        <br />

                        <Footer />
                      </Grid>
                    </Grid>
                  </AnimatedSwitch>
                </div>
              </div>
            </Router>
          </IntlProvider>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
