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
  Divider
} from "@material-ui/core";
import theme, { cssdata as classes } from "../util/theme";
import ReactAvatar from "react-avatar";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";

const language = navigator.langu;
export class DotsComplete extends Component {
  lgOut = () => {
    this.props.logoutUser();
  };

  signup = (res, type) => {
    let postData;

    if (type === "google" && res.w3.U3) {
      // console.log(res);
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa,
        reflink: Cookies.get("reflink")
      };

      reduxStore.dispatch(googlelogin(postData));
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
      <FormControl
        defaultComponent="ReactAvatar"
        variant="filled"
        className={classes.formControl}
      >
        <InputLabel htmlFor="filled-age-simple">
          <ReactAvatar
            size={40}
            round={true}
            src={localStorage.avatar}
            color="inherit"
          />
        </InputLabel>
        <Select
          value={
            <FilledInput>
              <ReactAvatar
                size={40}
                round={true}
                src={localStorage.avatar}
                color="inherit"
              />
            </FilledInput>
          }
        >
          <MenuItem>{localStorage.name}</MenuItem>
          <Divider />
          <MenuItem>
            <Button component={Link} to="/stats">
              <FormattedMessage id="drawer.stats" />
            </Button>
          </MenuItem>
          {/* <MenuItem>
            <Button component={Link} to="/profile">
              <FormattedMessage id="drawer.profile" />
            </Button>
          </MenuItem> */}
          <MenuItem>
            <Button onClick={() => this.lgOut()}>
              <FormattedMessage id="drawer.exit" />
            </Button>
          </MenuItem>
        </Select>
      </FormControl>
    ) : (
      <GoogleLogin
        clientId={googleCreds.clientId}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
          <img
            style={{ maxWidth: 30 }}
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

DotsComplete.propTypes = {
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
)(DotsComplete);
