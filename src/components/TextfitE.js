import React, { Component } from "react";
import { Textfit } from "react-textfit";
import theme, { cssdata as classes } from "../util/theme";
import { Link } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

class TextfitE extends Component {
  render() {
    return (
      <center>
        <Textfit />
      </center>
    );
  }
}

export default TextfitE;
