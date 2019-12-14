import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getTask,
  sendAnswer,
  predictImage
} from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import Timer from "react-compound-timer";
import {
  CircularProgress,
  Typography,
  Grid,
  Button,
  Card,
  Link,
  CardContent,
  CardActions,
  Paper
} from "@material-ui/core";
import axios from "axios";
import reduxStore from "../redux/store";
import theme, { cssdata as classes } from "../util/theme";
import { FormattedMessage } from "react-intl";

export class tasks extends Component {
  canvasRef = React.createRef();

  componentWillMount() {
    this.props.getTask();
  }

  componentWillUpdate(props) {
    this.props = props;
  }

  answerSend = (id, itm) => {
    var formData = new FormData();
    formData.append("id", id);
    formData.append("answer", itm);
    reduxStore.dispatch(sendAnswer(formData));
  };

  getTask = () => {
    this.props.getTask();
  };

  checkit = () => {
    this.props.predictImage(document.getElementById("img"));
  };

  componentDidMount() {
    // const taskPreroll = document.createElement("script");
    // taskPreroll.src =
    //   "//szimh.com/banners600x300.php?b=a3add6cee8b94f69bb68c9a0ec2ff4eb";
    // taskPreroll.async = true;
    // document.getElementById("taskPreroll").appendChild(taskPreroll);
  }

  render() {
    const { task, loading, finscreen, answer, ai_prediction, UI } = this.props;
    return (
      <div>
        {/* <div id="taskPreroll" /> */}
        <div style={classes.pageTitle}>
          <Typography variant="h6">
            <FormattedMessage id="tasks.title" />
          </Typography>
        </div>
        <hr />
        {finscreen ? (
          <Typography variant="h6">
            <Timer
              initialTime={100}
              direction="backward"
              checkpoints={[
                {
                  time: 0,
                  callback: () => this.props.getTask()
                }
              ]}
            />
            <FormattedMessage id="tasks.loading_next_task" />
            <br />
            <CircularProgress size={30} />
          </Typography>
        ) : (
          <Card className={classes.card}>
            {task.tasks_remain && (
              <Typography variant="h6">
                <FormattedMessage id="tasks.tasks_remain" />:{task.tasks_remain}
              </Typography>
            )}
            <CardContent>
              <img
                id="img"
                height={300}
                crossOrigin="anonymous"
                src={`${axios.defaults.baseURL}${task.image}`}
              />
              <br />
              {!ai_prediction ? (
                UI.loading ? (
                  <Typography variant="h6">
                    <FormattedMessage id="tasks.loading_AI_prediction" />
                    <br />
                    <CircularProgress size={30} />
                  </Typography>
                ) : (
                  <Button onClick={() => this.checkit()}>
                    <FormattedMessage id="tasks.checkWithAI" />
                  </Button>
                )
              ) : (
                <Typography variant="h5">{ai_prediction}</Typography>
              )}
            </CardContent>
            <CardActions>
              <Grid container spacing={16}>
                <Grid item sm={2} xs={12} />
                <Grid item sm={8} xs={12}>
                  <Typography variant="h4">{task.definition}</Typography>
                  <br />
                  <br />
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Button onClick={() => this.answerSend(task.id, true)}>
                          <FormattedMessage id="app.yes" />
                        </Button>

                        <Button onClick={() => this.answerSend(task.id, false)}>
                          <FormattedMessage id="app.no" />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={2} xs={12} />
              </Grid>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}

tasks.propTypes = {
  ai_prediction: PropTypes.string.isRequired,
  answer: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  finscreen: PropTypes.bool.isRequired,
  getTask: PropTypes.func.isRequired,
  predictImage: PropTypes.func.isRequired,
  sendAnswer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ai_prediction: state.data.ai_prediction,
  answer: state.data.answer,
  task: state.data.task,
  loading: state.data.loading,
  UI: state.UI,
  finscreen: state.data.finscreen
});

const mapDispatchToProps = {
  getTask,
  sendAnswer,
  predictImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(tasks);
