import React, { Component } from "react";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import { googlelogin } from "../redux/actions/userActions";
import reduxStore from "../redux/store";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Typography } from "@material-ui/core";
import theme, { cssdata as classes } from "../util/theme";
import { FormattedMessage } from "react-intl";

export class loginscreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  state = {
    name: null,
    avatar: null
  };

  signup = (res, type) => {
    let postData;

    if (type === "google" && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
      reduxStore.dispatch(googlelogin(postData, this.props.history));
    }
  };

  render() {
    const {
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    const googleCreds = {
      clientId:
        "719593059443-jfsl0pha62tu0ff5bajm67b6uav25092.apps.googleusercontent.com",
      secretKey: "a8NQ1GYmF-GfTqlNs4xmOcjR"
    };

    const responseGoogle = response => {
      // console.log("google console");
      // console.log(response);
      this.signup(response, "google");
    };

    return (
      <div>
        <br />
        <Card style={classes.statCard}>
          <div style={classes.pageTitle}>
            <Typography variant="body1">
              <FormattedMessage id="loginscreen.allowPush" />
            </Typography>
          </div>
          <br />
          <br />
          <GoogleLogin
            className="blinking"
            clientId={googleCreds.clientId}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </Card>
      </div>
    );
  }
}

loginscreen.propTypes = {
  googlelogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapDispatchToProps = {
  googlelogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(loginscreen);
