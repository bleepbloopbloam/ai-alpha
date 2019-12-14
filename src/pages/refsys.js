import React, { Component } from "react";
import { Typography, Card } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getUserData } from "../redux/actions/userActions";
import theme, { cssdata as classes } from "../util/theme";

import {
  Twitter,
  Facebook,
  Google,
  Tumblr,
  Mail,
  Pinterest,
  Linkedin,
  Reddit,
  Xing,
  Whatsapp,
  HackerNews,
  VK,
  Telegram
} from "react-social-sharing";
import reduxStore from "../redux/store";

export class refsys extends Component {
  state = {
    value: localStorage.your_reflink,
    goals: localStorage.goals,
    copied: false
  };

  componentDidMount() {
    reduxStore.dispatch(getUserData());
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <div style={classes.pageTitle}>
          <Typography variant="h6">
            <FormattedMessage id="drawer.refsys_title" />
          </Typography>
        </div>

        <hr />
        {/* {JSON.parse(this.state.goals).map(k => {
          return (
            <Card>
              <Typography variant="h6">
                <FormattedMessage id="refsys.level" />
                {k.level}
              </Typography>
              <br />
              <Typography variant="h4">
                <FormattedMessage id="refsys.refs" /> : {k.length}
              </Typography>
            </Card>
          );
        })} */}
        <br />
        <Card>
          <div>
            <Card>
              <Twitter link={this.state.value} />
              <Facebook link={this.state.value} />
              <Google link={this.state.value} />
              <Tumblr link={this.state.value} />
              <Mail link={this.state.value} />
              <Pinterest link={this.state.value} />
              <Linkedin link={this.state.value} />
              <Reddit link={this.state.value} />
              <Xing link={this.state.value} />
              <Whatsapp link={this.state.value} />
              <HackerNews link={this.state.value} />
              <VK link={this.state.value} />
              <Telegram link={this.state.value} />
            </Card>

            <Typography variant="h6">
              {window.location.hostname + "/?reflink=" + this.state.value}
            </Typography>

            {this.state.copied ? (
              <span style={{ color: "green" }}>Copied.</span>
            ) : (
              <CopyToClipboard
                text={
                  window.location.hostname + "/?reflink=" + this.state.value
                }
                onCopy={() => this.setState({ copied: true })}
              >
                <button>Copy to clipboard with button</button>
              </CopyToClipboard>
            )}
          </div>
        </Card>
      </div>
    );
  }
}

refsys.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  getUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  data: state.data
});

const mapDispatchToProps = {
  getUserData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(refsys);
