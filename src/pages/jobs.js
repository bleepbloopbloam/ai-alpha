import React, { Component } from "react";
import { Typography, Card, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import theme, { cssdata as classes } from "../util/theme";

export class jobs extends Component {
  render() {
    const { logged_in } = this.props;
    return (
      <div>
        <div style={classes.pageTitle}>
          <Typography variant="h6">
            <FormattedMessage id="drawer.jobs" />
          </Typography>
        </div>
        <hr />
        <br />
        <Grid
          container
          justify="center"
          alignItems="stretch"
          direction="row"
          spacing={4}
        >
          <Grid item sm={6}>
            <Card style={classes.jobsCard}>
              <FormattedHTMLMessage id="jobs.info" />
              <br />
              <br />
              {!logged_in ? (
                <FormattedMessage id="jobs.infoNotlg" />
              ) : (
                <Button component={Link} to="/stats">
                  <FormattedHTMLMessage id="jobs.infolg" />
                </Button>
              )}
            </Card>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <Grid
          container
          justify="center"
          alignItems="stretch"
          direction="row"
          spacing={4}
        >
          <Grid item sm={3}>
            <Card style={classes.jobsCard}>
              <img src={"/images/dirs.jpg"} style={classes.vacCardImg} />
              <br />
              <Typography variant="body2">
                <FormattedMessage id="jobs.definition" />
              </Typography>
              <br />
              <Button component={Link} to="/tasks">
                <FormattedMessage id="drawer.tasks" />
              </Button>
            </Card>
          </Grid>
          <Grid item sm={3}>
            <Card style={classes.jobsCard}>
              <img src={"/images/apl.png"} style={classes.vacCardImg} />
              <br />
              <Typography variant="body2">
                <FormattedMessage id="jobs.upload" />
              </Typography>
              <br />
              <Button component={Link} to="/make_tasks">
                <FormattedMessage id="drawer.maketasks" />
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

jobs.propTypes = {
  logged_in: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  logged_in: state.user.logged_in
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(jobs);
