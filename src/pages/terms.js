import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import theme, { cssdata as classes } from "../util/theme";

export class terms extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div>
        <div style={classes.pageTitle}>
          <Typography variant="h6">
            <FormattedMessage id="terms.title" />
          </Typography>
        </div>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(terms);
