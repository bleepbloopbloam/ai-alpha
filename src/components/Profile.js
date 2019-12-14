import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// import styles from "../util/theme";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";

import { connect } from "react-redux";
import { Paper, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import dayjs from "dayjs";
import { uploadImage, logoutUser } from "../redux/actions/userActions";

const styles = theme1 => ({
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: theme1.palette.primary.main
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture=()=> {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  render(){
    const {
      classes,
      user: {
        loading,
        logged_in,
        credentials: { name, created, imageUrl, bio, website, location }
      }
    } = this.props;

    let profileMarkup = loading ? (
      <p>Loading...</p>
    ) : logged_in ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onInput={this.handleImageChange}
            />
            <Tooltip title="Change pic" placement="bottom">
              <IconButton
                onClick={this.handleEditPicture}
                // btnClassName="button"
              >
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${name}`}
              color="primary"
              variant="h5"
            >
              @{name}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary">
                  <span>{location}</span>
                </LocationOn>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary">
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {"  "} WebSite{" "}
                  </a>
                </LinkIcon>
                <hr />
              </Fragment>
            )}
            <CalendarToday>
              Since {dayjs(created).format("MM YYYY")}
            </CalendarToday>
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body1" align="center">
          Not logged in!
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </div>
      </Paper>
    );

    return profileMarkup;
  }
}
const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
