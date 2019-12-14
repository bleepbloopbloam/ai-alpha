import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};
class Note extends Component {
  render() {
    dayjs.extend(relativeTime);
    const { classes, note } = this.props;
    let date = new Date(note.created);
    return (
      <Card className={classes.card}>
        <CardMedia
          image={note.userImage}
          title="img"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${note.author}`}
            color="primary"
          >
            {note.author}
          </Typography>
          <Typography variant="body1">{note.text}</Typography>

          <Typography variant="body2" color="textSecondary">
            {dayjs(date).fromNow()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Note);
