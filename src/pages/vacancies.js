import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Grid, Card, Paper, Button } from "@material-ui/core";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import theme, { cssdata as classes } from "../util/theme";
import { Link } from "react-router-dom";

export class vacancies extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const { logged_in } = this.props;

    return (
      <div>
        <div style={classes.pageTitle}>
          <Typography variant="h6">
            <FormattedMessage id="drawer.vacancies" />
          </Typography>
        </div>
        <hr />
        <div className={classes.cardTitle} />
        <br />
        <Typography variant="body1">
          <FormattedMessage id="vacancies.infotext0" />
          <br />
          <br />
          <FormattedMessage id="vacancies.infotext1" />
        </Typography>
        <br />
        <br />
        <Card>
          <Grid
            container
            justify="center"
            alignItems="stretch"
            direction="row"
            spacing={4}
          >
            <Grid item sm={3} xs={10}>
              <img src={"/images/2.jpg"} style={classes.vacCardImg} />
              <Typography variant="subtitle2">
                <FormattedMessage id="vacancies.infotext2" />
              </Typography>
            </Grid>
            <Grid item sm={3} xs={10}>
              <img src={"/images/3.jpg"} style={classes.vacCardImg} />
              <Typography variant="subtitle2">
                <FormattedMessage id="vacancies.infotext3" />
              </Typography>
            </Grid>
            <Grid item sm={3} xs={10}>
              <img src={"/images/4.png"} style={classes.vacCardImg} />
              <Typography variant="subtitle2">
                <FormattedMessage id="vacancies.infotext4" />
              </Typography>
            </Grid>
          </Grid>
        </Card>

        <br />
        <Card>
          <Typography variant="h6">
            <FormattedMessage id="vacancies.infotext5" />
          </Typography>
          <Typography variant="subtitle2">
            <FormattedMessage id="vacancies.infotext6" />
          </Typography>
          <br />
          <Typography variant="h6">
            <FormattedMessage id="vacancies.infotext7" />
          </Typography>
          <br />
          <Typography variant="subtitle2">
            <FormattedMessage id="vacancies.infotext8" />
          </Typography>
          <br />
          <Typography variant="body1" align="left">
            <FormattedMessage id="vacancies.infotext9" />
          </Typography>
          <br />
          <Typography variant="body1" align="left">
            <FormattedMessage id="vacancies.infotext10" />
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="subtitle2" align="right">
            <FormattedHTMLMessage id="vacancies.infotext11" />
          </Typography>
        </Card>
        <br />

        <Button
          className={!logged_in ? "blinking" : "ord"}
          component={Link}
          to={logged_in ? "/jobs" : "/login"}
        >
          <FormattedHTMLMessage id="vacancies.goJob" />
        </Button>
      </div>
    );
  }
}

vacancies.propTypes = {
  logged_in: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  logged_in: state.user.logged_in
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(vacancies);
