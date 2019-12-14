import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";

import theme, { cssdata } from "../util/theme";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Edit,
  Info,
  PhoneInTalkSharp,
  Work,
  School,
  LocalLibrary,
  GroupAdd,
  PartyMode,
  Assignment
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import token from "../util/Auth";

export class MyDrawer extends Component {
  render() {
    const {
      classes,
      open,
      setOpen,
      UI: { loading },
      logged_in,
      adminka
    } = this.props;

    function handleDrawerClose() {
      setOpen(false);
    }

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        transitionDuration={{ enter: 500, exit: 200 }}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        {logged_in && (
          <ListItem
            component={Link}
            to="/refsys"
            onClick={handleDrawerClose}
            button
            key="refsys"
          >
            <ListItemIcon>
              <GroupAdd />
            </ListItemIcon>
            <ListItemText primary={<FormattedMessage id="drawer.refsys" />} />
          </ListItem>
        )}
        {logged_in && (
          <ListItem
            component={Link}
            to="/stats"
            onClick={handleDrawerClose}
            button
            key="stats"
          >
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary={<FormattedMessage id="drawer.stats" />} />
          </ListItem>
        )}

        <ListItem
          component={Link}
          to="/news"
          onClick={handleDrawerClose}
          button
          key="news"
        >
          <ListItemIcon>
            <LocalLibrary />
          </ListItemIcon>
          <ListItemText primary={<FormattedMessage id="drawer.news" />} />
        </ListItem>

        <ListItem
          component={Link}
          to="/vacancies"
          onClick={handleDrawerClose}
          button
          key="vacancies"
        >
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary={<FormattedMessage id="drawer.vacancies" />} />
        </ListItem>
        <ListItem
          component={Link}
          to="/jobs"
          onClick={handleDrawerClose}
          button
          key="jobs"
        >
          <ListItemIcon>
            <School />
          </ListItemIcon>
          <ListItemText primary={<FormattedMessage id="drawer.jobs" />} />
        </ListItem>

        <Divider />

        <ListItem
          component={Link}
          to="/info"
          onClick={handleDrawerClose}
          button
          key="info"
        >
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary={<FormattedMessage id="drawer.info" />} />
        </ListItem>

        <ListItem
          component={Link}
          to="/recognition"
          onClick={handleDrawerClose}
          button
          key="rec"
        >
          <ListItemIcon>
            <PartyMode />
          </ListItemIcon>
          <ListItemText primary="Демонстрация ИИ" />
        </ListItem>

        {adminka && (
          <ListItem
            component={Link}
            to="/adminka"
            onClick={handleDrawerClose}
            button
            key="adminka"
          >
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Админка" />
          </ListItem>
        )}
      </Drawer>
    );
  }
}

MyDrawer.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,

  setOpen: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  logged_in: state.user.logged_in,
  adminka: state.user.adminka,

  UI: state.UI
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDrawer);
