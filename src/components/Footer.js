import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import theme, { cssdata as classes } from "../util/theme";
import { Grid, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { Textfit } from "react-textfit";

export class Footer extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#3f51b5",
          color: "white",
          fontFamily: "Roboto"
        }}
      >
        <hr />
        <br />
        <Grid container direction="column">
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item sm={3}>
                <Textfit
                  variant="subtitle2"
                  className={classes.title2}
                  mode="multi"
                  max={70}
                  forceSingleModeWidth={true}
                >
                  <FormattedMessage id="footer.copyright" />
                </Textfit>
              </Grid>
              <Grid item sm={6}>
                {/* info */}
              </Grid>
              <Grid item sm={3}>
                <a
                  style={{ color: "white" }}
                  href="mailto:ceo.aisiic@gmail.com"
                >
                  <FormattedMessage id="footer.feedback" />
                </a>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item>
            <Grid container direction="row">
              <Grid item sm={1}>
                <a
                  href="https://metrika.yandex.ru/stat/?id=54650470&from=informer"
                  target="_blank"
                  rel="nofollow"
                >
                  <img
                    src="https://informer.yandex.ru/informer/54650470/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
                    style={{ width: 88, height: 31, border: 0 }}
                    alt="Яндекс.Метрика"
                    title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
                    className="ym-advanced-informer"
                    data-cid="54650470"
                    data-lang="ru"
                  />
                </a>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
