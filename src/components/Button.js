import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, googlelogin } from "../redux/actions/userActions";
import PropTypes from "prop-types";
import reduxStore from "../redux/store";
import GoogleLogin from "react-google-login";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FilledInput,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu
} from "@material-ui/core";
import theme, { cssdata as classes } from "../util/theme";
import ReactAvatar from "react-avatar";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Language } from "@material-ui/icons";

function lgOut() {
  reduxStore.dispatch(logoutUser());
}

export class LoginLogoutButton extends Component {
  signup = (res, type) => {
    let postData;
    if (type === "google" && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa,
        lang: navigator.language.split(/[-_]/)[0],
        reflink: Cookies.get("reflink")
      };

      reduxStore.dispatch(googlelogin(postData, this.props.history));
    }
  };

  render() {
    const { logged_in } = this.props;
    const googleCreds = {
      clientId:
        "719593059443-jfsl0pha62tu0ff5bajm67b6uav25092.apps.googleusercontent.com",
      secretKey: "a8NQ1GYmF-GfTqlNs4xmOcjR"
    };

    const responseGoogle = response => {
      this.signup(response, "google");
    };

    return logged_in ? (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {popupState => (
          <React.Fragment>
            <ReactAvatar
              {...bindTrigger(popupState)}
              size={35}
              round={true}
              src={localStorage.avatar}
              color="inherit"
            />
            <Menu {...bindMenu(popupState)}>
              <MenuItem>{localStorage.name}</MenuItem>
              <Divider />

              <MenuItem onClick={popupState.close} component={Link} to="/stats">
                <FormattedMessage id="drawer.stats" />
              </MenuItem>

              <MenuItem onClick={() => lgOut()}>
                <FormattedMessage id="drawer.exit" />
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    ) : (
      <GoogleLogin
        clientId={googleCreds.clientId}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
          <img
            style={{ maxWidth: 35 }}
            src={"/images/google-icon.png"}
            className={classes.googleLoginBtn}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          />
        )}
      />
    );
  }
}

LoginLogoutButton.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  logged_in: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  logged_in: state.user.logged_in
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginLogoutButton);
