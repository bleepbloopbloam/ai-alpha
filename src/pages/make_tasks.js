import React, { Component } from "react";
import Upload from "../components/Upload";
import axios from "axios";
import token from "../util/Auth";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import theme, { cssdata as classes } from "../util/theme";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

export class make_task extends Component {
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

  render() {
    const { loading, finscreen } = this.props;
    const { errors } = this.state;

    return (
      <div>
        {loading ? (
          <CircularProgress size={30} />
        ) : (
          <div>
            <div style={classes.pageTitle}>
              <Typography variant="h6">
                <FormattedMessage id="tasks.upload_title" />
              </Typography>
            </div>
            <Upload />
          </div>
        )}
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
)(make_task);
