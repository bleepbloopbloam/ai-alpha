import React, { Component } from "react";
import Upload from "../components/Upload";
import axios from "axios";
import token from "../util/Auth";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";

export class task_finished extends Component {
  constructor() {
    super();
    this.state = {
      handle: "",
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
    this.setState({
      loading: true
    });
    const newUserData = {
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes, loading, finscreen } = this.props;
    const { errors } = this.state;

    return (
      <div>
        task_finished
        {loading && <CircularProgress size={30} />}
        <Upload />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
  loading: state.user.loading,
  finscreen: state.data.finscreen
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(task_finished);
