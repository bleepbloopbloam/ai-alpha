import React, { Component } from "react";
import { connect } from "react-redux";
import theme, { cssdata as classes } from "../util/theme";
import { Typography, Grid } from "@material-ui/core";
import { getAdminData } from "../redux/actions/dataActions";

export class adminka extends Component {
  componentDidMount() {
    this.interval = setInterval(() => this.props.getAdminData(), 5 * 60 * 1000);
    this.props.getAdminData();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentWillReceiveProps(props) {
    this.props = props;
  }

  render() {
    console.log(this.props);
    const { users, loading } = this.props;
    return (
      <div>
        <div style={classes.pageTitle}>
          <Typography variant="h6">админка</Typography>
        </div>
        <hr />
        {/* <Grid container direction="column"> */}

        <Grid container direction="row">
          <Grid item sm={1}>
            ID
          </Grid>
          <Grid item sm={3}>
            Имя
          </Grid>
          <Grid item sm={3}>
            Пауза с{" "}
          </Grid>
          <Grid item sm={1}>
            Определений осталось{" "}
          </Grid>
          <Grid item sm={1}>
            Загрузок осталось{" "}
          </Grid>
          <Grid item sm={3}>
            Рефералов{" "}
          </Grid>
        </Grid>
        <br />
        {!loading &&
          users.map((user, index) => {
            return (
              <Grid key={index} container direction="row">
                <Grid item sm={1}>
                  {user[0].ID}
                </Grid>
                <Grid item sm={3}>
                  {user[0].display_name}
                </Grid>
                <Grid item sm={3}>
                  {user[0].pause_reward_program}
                </Grid>
                <Grid item sm={1}>
                  {user[0].tasks_remain}
                </Grid>
                <Grid item sm={1}>
                  {user[0].tasks_upload_remain}
                </Grid>
                <Grid item sm={3}>
                  {user[0].referrals.length}
                </Grid>
              </Grid>
            );
          })}

        {/* </Grid> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.data.users
});

const mapDispatchToProps = { getAdminData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminka);
