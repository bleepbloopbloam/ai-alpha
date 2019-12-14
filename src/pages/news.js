import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Card, Grid } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import theme, { cssdata as classes } from "../util/theme";
import { NewsParser } from "../components/NewsParser";

export class news extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div style={classes.pageTitle}>
          <Typography variant="h6">
            <FormattedMessage id="drawer.news" />
          </Typography>
        </div>
        <hr />
        <NewsParser />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(news);
