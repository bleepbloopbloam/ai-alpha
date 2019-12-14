import "typeface-roboto";
import { createMuiTheme } from "@material-ui/core";
// import Background from "../images/5023.png";
// import googleIcon from "../images/google-icon.png";
// import BackgroundTitle from "../images/4094.jpg";

const progressheight = 50;
const drawerWidth = 240;

const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h2",
        h2: "h2",
        h3: "h2",
        h4: "h2",
        h5: "h2",
        h6: "h2",
        subtitle1: "h6",
        subtitle2: "h6",
        body1: "span",
        body2: "span"
      }
    }
  }
});
const cssdata = {
  root: {
    display: "flex",
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth

    // backgroundImage: `url(${Background})`
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  plink: {
    color: "inherit",
    fontFamily: "Roboto",
    textDecoration: "none"
  },
  newslink: {
    color: "black",
    fontFamily: "Roboto"
  },
  titleName: {
    marginTop: 50,
    marginBottom: 50
  },
  title: {
    flexGrow: 1,
    "@media screen and (orientation: portrait)": {
      margin: "auto 0 auto 0",
      left: 0,
      right: 0,
      display: "none"
    }
  },
  title2: {
    flexGrow: 1,
    "@media screen and (orientation: landscape)": {
      display: "none"
    }
  },
  cropper: {
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,

    "@media screen and (orientation: landscape)": {
      width: 500,
      height: 500
    },
    "@media screen and (orientation: portrait)": {
      width: 280,
      height: 280
    }
  },
  palette: {
    primary: {
      light: "#888",
      main: "#666",
      dark: "#222",
      contrastText: "#fff"
    },
    secondary: {
      light: "#567",
      main: "#456",
      dark: "#234",
      contrastText: "#000"
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center"
  },
  redText: {
    color: "red"
  },
  button: {
    margin: 20,
    backgroundColor: "#222"
  },
  progress: {
    margin: 20
  },
  iconImage: {
    maxWidth: 50,
    maxHeight: 50,
    margin: "10px auto 10px auto"
  },
  timerBack: {
    backgroundColor: "gray"
  },
  newsCardImg: {
    minWidth: 150,
    minHeight: 150,
    maxWidth: 200,
    maxHeight: 200,
    margin: 10,

    left: 0,
    top: 0,
    bottom: 0
  },
  newsGridCard: {
    padding: 10,
    margin: "auto",
    left: 0,
    right: 0,
    display: "grid",
    minHeight: 250,
    minWidth: 270,
    maxWidth: 900,
    gridTemplateRows: "1fr auto",
    gridGap: "8px",
    backgroundColor: "#92929222"
  },
  vacCardImg: {
    maxWidth: 250,
    maxHeight: 250,
    margin: "10px auto auto auto",
    left: 0,
    right: 0
  },
  jobsCard: {
    padding: 10,
    margin: "auto",
    left: 0,
    right: 0,
    height: "100%",
    alignItems: "center"
  },
  statCard: {
    padding: 10,
    margin: "auto",
    left: 0,
    right: 0,
    height: "100%",
    alignItems: "center",
    maxWidth: 800
  },
  vacGridCard: {
    padding: 10,
    margin: 10,
    display: "grid",

    height: "100%",
    gridTemplateRows: "1fr auto",
    gridGap: "8px"
  },
  vacInfo: {
    backgroundImage: `url(/images/vacInfo.jpg)`,
    backgroundSize: "cover"
  },
  cardActions: {
    margin: "auto",
    left: 0,
    right: 0
  },
  cardTitle: {
    backgroundImage: `url(/images/4094.jpg)`,
    backgroundSize: "cover"
  },
  googleLoginBtn: {
    maxWidth: 50,
    maxHeight: 50
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none"
  },
  pageTitle: {
    backgroundColor: "#efeff4"
  },
  progressActive: {
    color: "blue",
    height: progressheight
  },
  accCirc: {
    color: "red",
    height: 100,
    width: 100
  },
  progressNotActive: {
    color: "primary",
    height: progressheight
  },
  footer: {
    maxHeight: 100,
    bottom: 0
    // position: "absolute",
    // flex: "0 0 auto"
  },
  homecell: {
    minWidth: 300,
    minHeight: 300,
    maxWidth: 500,
    maxHeight: 500
  }
};

export default theme;
export { cssdata };
