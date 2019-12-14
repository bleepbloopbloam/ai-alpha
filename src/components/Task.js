import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Task extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const { task } = this.props;
    console.log(task);
    return <div>{task}</div>;
  }
}

const mapStateToProps = state => ({
  UI: state.UI
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
