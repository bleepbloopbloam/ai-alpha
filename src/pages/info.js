import React, { Component } from "react";
import theme, { cssdata as classes } from "../util/theme";
import { Typography } from "@material-ui/core";

export class info extends Component {
  render() {
    return (
      <div>
        <div style={classes.pageTitle}>
          <Typography variant="h6">
            {/* <FormattedMessage id="drawer.stats" /> */}
            info
          </Typography>
        </div>
        info
      </div>
    );
  }
}

export default info;
