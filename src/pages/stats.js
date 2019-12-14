import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import theme, { cssdata as classes } from "../util/theme";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  CircularProgress,
  Paper,
  Grid,
  Menu,
  Popover,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Timer from "react-compound-timer";
import AnimationCount from "react-count-animation";
import "react-count-animation/dist/count.min.css";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import {
  AccountCircle,
  RadioButtonChecked,
  RadioButtonUnchecked,
  QuestionAnswer,
  Help
} from "@material-ui/icons";
import { getUserData } from "../redux/actions/userActions";

const statsRows = 5;

function refs(ref) {
  var arr = [];
  for (let index = 0; index < statsRows; index++) {
    var col =
      ref.length > index ? (ref[index].pause ? "red" : "green") : "gray";

    arr.push(
      <AccountCircle
        key={index}
        style={{ height: 50, width: 50, color: `${col}` }}
      />
    );
  }
  return arr;
}

function tasks(task) {
  var arr = [];
  for (let index = 1; index < statsRows + 1; index++) {
    statsRows - task < index
      ? arr.push(
          <RadioButtonUnchecked style={{ height: 50, width: 50 }} key={index} />
        )
      : arr.push(
          <RadioButtonChecked style={{ height: 50, width: 50 }} key={index} />
        );
  }
  return arr;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join(".");
}

export class stats extends Component {
  componentDidMount() {
    this.interval = setInterval(() => this.props.getUserData(), 5 * 60 * 1000);
    this.props.getUserData();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentWillReceiveProps(props) {
    this.props = props;
  }

  render() {
    const {
      user: {
        name,
        avatar,
        loading,
        referrals,
        start_reward_program,
        pause_reward_program,
        tasks_remain,
        tasks_upload_remain
      }
    } = this.props;
    // console.log(this.props);
    let isParticipant = pause_reward_program < 1;

    const date = new Date(start_reward_program * 1000);
    const dateFinish = date.getTime() + 1000 * 60 * 60 * 24 * 30;
    const today = new Date().getTime();

    const endMoney = 140;
    const startMoney =
      (endMoney / (dateFinish - date.getTime())) *
      (isParticipant
        ? today - date.getTime()
        : pause_reward_program * 1000 - date.getTime());

    const moneyCounter = {
      start: startMoney,
      count: isParticipant ? endMoney : startMoney,
      duration: dateFinish - today,
      decimals: 2,
      useGroup: true,
      animation: "up"
    };

    return (
      <div>
        <div style={classes.pageTitle}>
          <Typography variant="h6">
            <FormattedMessage id="drawer.stats" />
          </Typography>
        </div>
        <hr />
        <br />

        <Card style={classes.statCard}>
          <img src={avatar} />
          <Typography variant="h5">{name}</Typography>
          <Typography variant="subtitle2">
            <FormattedMessage id="stats.started" />
            {formatDate(date.toDateString())}
          </Typography>
        </Card>
        <br />
        {loading ? (
          <CircularProgress size={30} />
        ) : (
          <div>
            <Card style={classes.statCard}>
              На сегодня ваша цель выполнить {tasks_remain} определений и{" "}
              {tasks_upload_remain} загрузок. Как только вы выполните все
              вышеперечисленные условия можно будет вывести средства.
            </Card>
            <br />
            <Paper style={classes.statCard}>
              <Typography variant="h6">
                <Button component={Link} to="/refsys">
                  <FormattedMessage id="stats.invited" />
                </Button>
                <PopupState variant="popover" popupId="popup-stats-help0">
                  {popupState => (
                    <React.Fragment>
                      <Help
                        {...bindTrigger(popupState)}
                        style={{ width: 15 }}
                      />
                      <Menu {...bindMenu(popupState)}>
                        <div>
                          <Typography varinat="subtitle2">
                            <FormattedMessage id="stats.green" /> <br />
                            <FormattedMessage id="stats.red" /> <br />
                            <FormattedMessage id="stats.gray" /> <br />
                          </Typography>
                        </div>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
                <br />
                {refs(referrals)}
              </Typography>
            </Paper>
            <br />
            <Card style={classes.statCard}>
              <Typography variant="h6">
                <Button component={Link} to="/tasks">
                  <FormattedMessage id="stats.definition" />
                </Button>
                <PopupState variant="popover" popupId="popup-stats-help1">
                  {popupState => (
                    <React.Fragment>
                      <Help
                        {...bindTrigger(popupState)}
                        style={{ width: 15 }}
                      />
                      <Menu {...bindMenu(popupState)}>
                        <div>
                          <Typography varinat="subtitle2">
                            <FormattedMessage id="stats.helpdefinition" />
                            {tasks_remain}
                          </Typography>
                        </div>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </Typography>
              {tasks(tasks_remain)}
            </Card>
            <br />
            <Card style={classes.statCard}>
              <Typography variant="h6">
                <Button component={Link} to="/make_tasks">
                  <FormattedMessage id="stats.upload" />
                </Button>
                <PopupState variant="popover" popupId="popup-stats-help2">
                  {popupState => (
                    <React.Fragment>
                      <Help
                        {...bindTrigger(popupState)}
                        style={{ width: 15 }}
                      />
                      <Menu {...bindMenu(popupState)}>
                        <div>
                          <Typography varinat="subtitle2">
                            <FormattedMessage id="stats.helpupload" />
                            {tasks_upload_remain}
                          </Typography>
                        </div>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </Typography>

              {tasks(tasks_upload_remain)}
            </Card>
            {!isParticipant && (
              <Typography style={{ color: "red" }} variant="h6">
                <br />
                <FormattedMessage id="stats.pleaseinvite" />
              </Typography>
            )}
            <br />
            <Card style={classes.statCard}>
              <Typography variant="h6">
                <FormattedMessage id="stats.timetopay" />
              </Typography>
              <Timer
                startImmediately={isParticipant}
                initialTime={
                  isParticipant
                    ? dateFinish - today
                    : dateFinish - pause_reward_program * 1000
                }
                direction="backward"
                checkpoints={[
                  {
                    time: 0,
                    callback: () => this.props.getTask()
                  }
                ]}
              >
                {() => (
                  <React.Fragment>
                    <Grid container direction="row" spacing={2}>
                      {[
                        {
                          descr: <FormattedMessage id="app.days" />,
                          time: <Timer.Days />
                        },
                        {
                          descr: <FormattedMessage id="app.hours" />,
                          time: <Timer.Hours />
                        },
                        {
                          descr: <FormattedMessage id="app.minutes" />,
                          time: <Timer.Minutes />
                        },
                        {
                          descr: <FormattedMessage id="app.seconds" />,
                          time: <Timer.Seconds />
                        }
                      ].map((i, index) => {
                        return (
                          <Grid
                            key={index}
                            item
                            sm={3}
                            style={{ margin: "auto", left: 0, right: 0 }}
                          >
                            <Paper
                              style={
                                isParticipant
                                  ? {
                                      backgroundColor: "green",
                                      border: "3px solid #005c0f"
                                    }
                                  : {
                                      backgroundColor: "gray",
                                      border: "3px solid #5a5a5a"
                                    }
                              }
                            >
                              <Typography
                                style={{ color: "white" }}
                                variant="h4"
                              >
                                {i.time}
                              </Typography>
                            </Paper>
                            <Typography variant="subtitle2">
                              {i.descr}
                            </Typography>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </React.Fragment>
                )}
              </Timer>
              <LinearProgress
                color="primary"
                variant="determinate"
                value={
                  isParticipant
                    ? (today * 100) / dateFinish
                    : (pause_reward_program * 1000 * 100) / dateFinish
                }
              />
              <Typography className="title" variant="h6">
                <FormattedMessage id="stats.money" />
              </Typography>
              <Typography
                style={{ color: !isParticipant ? "red" : "green" }}
                variant="h4"
              >
                <div
                  style={{
                    display: "inline-flex",
                    left: 0,
                    right: 0,
                    margin: "auto"
                  }}
                >
                  $<AnimationCount {...moneyCounter} />
                </div>
              </Typography>
            </Card>
            <br />
            <Card style={classes.statCard}>
              <Button
                disabled
                style={{
                  color: "white",
                  backgroundColor: "gray",
                  height: 70,
                  width: "100%"
                }}
              >
                <Typography variant="h5">Вывести средства</Typography>
              </Button>
            </Card>
          </div>
        )}
        {/* {JSON.parse(this.state.goals).map(k => {
          const should = Math.pow(statsRows, k.level);
          const value = (k.length / should) * 100;
          return (
            <div>
              <Typography variant="h6">{should}</Typography>
              {k.length}
              <br />
              <LinearProgress
                key={k.level}
                className={classes.progressActive}
                valueBuffer={70}
                value={value}
                variant="determinate"
              />
              <br />
            </div>
          );
        })} */}
      </div>
    );
  }
}

stats.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapDispatchToProps = { getUserData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(stats);
