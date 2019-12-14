import React, { Component } from "react";
import { Typography, Card } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { CopyToClipboard } from "react-copy-to-clipboard";
import theme, { cssdata as classes } from "../util/theme";

export class profile extends Component {
  state = {
    value: localStorage.reflink,
    copied: false
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <div style={classes.pageTitle}>
          <Typography variant="h6">
            <FormattedMessage id="drawer.profile" />
          </Typography>
        </div>
        <hr />
        <img src={user.avatar} />
        <Typography variant="h3">{user.name}</Typography>
        <br />
      </div>
    );
  }
}

profile.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(profile);
