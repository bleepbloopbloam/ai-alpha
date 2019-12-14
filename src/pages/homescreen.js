import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Typography,
  Grid,
  List,
  ListItemIcon,
  ListItem,
  Card,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Textfit from "react-textfit/lib/Textfit";
import { Check } from "@material-ui/icons";
import { FormattedHTMLMessage } from "react-intl";
import { cssdata as classes } from "../util/theme";
import { NewsParser } from "../components/NewsParser";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export class homescreen extends Component {
  // state = { newsForHomescreen: [] };

  componentWillMount() {
    // var arr = [];
    // for (let index = 1; index < 5; index++) {
    //   arr.push(<NewsParser num={index} />);
    // }
    // this.setState({ newsForHomescreen: arr });
    // console.log(arr);
  }
  componentDidMount() {
    // //footer
    // const advBottomLine12 = document.createElement("script");
    // advBottomLine12.src =
    //   "//szimh.com/o5eke89122917i92917bji97tq2lvi/ke8/9i7x9fuvq/kpyiu1e2j436f42f1ab42a14ce8827599cd962ab82d";
    // advBottomLine12.async = true;
    // document.getElementById("advert1").appendChild(advBottomLine12);
    // const popupLeftBottom = document.createElement("script");
    // popupLeftBottom.src =
    //   "http://yqwfo.com/30vbw8qt2lonilvqvu8bw2tq/79aj459fxjb7vil5j4/q2tbw8i50kz7d7334f7d59d4d7d984632c97cb07a79";
    // popupLeftBottom.async = true;
    // document.body.appendChild(popupLeftBottom);
    // ////center row middle
    // // const centerAdsMiddle1 = document.createElement("script");
    // // centerAdsMiddle1.src =
    // //   "//szimh.com/e8oe8k912/21979i291jb77i9tq2vlik8e7i9x9fqvu/kypiu1hobe2e6e0dc3b545e295e573a79598529a";
    // // centerAdsMiddle1.async = true;
    // // document.getElementById("centerAdsMiddle1").appendChild(centerAdsMiddle1);
    // //right column
    // const rightVertBanner1 = document.createElement("script");
    // rightVertBanner1.src =
    //   "//szimh.com/yu2w8b/tq2/onlvli/qvuwb8t2q/a97j549xf7jbvli45j2tq8wbo2le9cef26537441924528b31cf9ed3f8cdf72";
    // rightVertBanner1.async = true;
    // document.getElementById("vertAdsRight1").appendChild(rightVertBanner1);
    // const rightVertBanner2 = document.createElement("script");
    // rightVertBanner2.src =
    //   "//szimh.com/9oc8wbtq2onl/vli/uqv/bw82qt97a54j9xf/jb7ivl/54j/2qtb8wowd7ra3d09676321014f14a6205bc17bee4651";
    // rightVertBanner2.async = true;
    // document.getElementById("vertAdsRight2").appendChild(rightVertBanner2);
    // const rightVertBanner3 = document.createElement("script");
    // rightVertBanner3.src =
    //   "//szimh.com/96vb8w/t2qnol/vilqvuw8bt2qa79/45jf9xjb7vilj54/2tqb8wwl20f15bb727cf437fb5390e115097a843";
    // rightVertBanner3.async = true;
    // document.getElementById("vertAdsRight3").appendChild(rightVertBanner3);
  }
  render() {
    const { logged_in } = this.props;

    return (
      <div>
        <Card style={classes.cardTitle}>
          <center>
            <Textfit
              variant="h6"
              style={classes.titleName}
              mode="multi"
              forceSingleModeWidth={true}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignContent: "bottom",
                  alignItems: "bottom"
                }}
              >
                <Typography variant="h2" style={{ fontWeight: 600 }}>
                  <FormattedHTMLMessage id="app.hometitle1" />
                </Typography>
                <Typography style={{ marginTop: 3 }} variant="subtitle1">
                  <br />
                  .com
                </Typography>
              </div>
              <br />
              <Typography variant="overline" style={{ color: "gray" }}>
                <FormattedHTMLMessage id="app.hometitle2" />
              </Typography>
            </Textfit>
          </center>
        </Card>
        <br />
        <Card style={{ padding: 10 }}>
          <Grid container>
            <Grid item sm={1} xs={12} />
            <Grid item sm={7} xs={12}>
              <Typography variant="subtitle1" align="left">
                <FormattedHTMLMessage id="app.text" />
              </Typography>
            </Grid>
            <br />

            <Grid item sm={4} xs={12}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  <Typography variant="body1">
                    <FormattedHTMLMessage id="app.hometext1" />
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  <Typography variant="body1">
                    <FormattedHTMLMessage id="app.hometext2" />
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  <Typography variant="body1">
                    <FormattedHTMLMessage id="app.hometext3" />
                  </Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Card>
        {!logged_in && (
          <div>
            <br />

            <Button className="blinking" component={Link} to="/vacancies">
              <FormattedHTMLMessage id="app.hometext6" />
            </Button>
          </div>
        )}
        <br />
        <div id="centerAdsMiddle1" />
        {/* <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={3000}
          // centerMode={true}
          draggable
          focusOnSelect={false}
          infinite
          slidesToSlide={1}
          swipeable
          customTransition="all 1500ms"
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 1,
              paritialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 270
              },
              items: 1,
              paritialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 1,
              paritialVisibilityGutter: 30
            }
          }}
        >
          {this.state.newsForHomescreen}
        </Carousel> */}
        <br />
        <Grid
          container
          justify="center"
          alignItems="stretch"
          direction="column"
        >
          <br />
          <Grid container justify="center" alignItems="stretch" direction="row">
            <Grid item sm={2}>
              <div id="vertAdsLeft1" />
              <div id="vertAdsLeft2" />
              <div id="vertAdsLeft3" />
            </Grid>
            <Grid item sm={4}>
              <Card style={classes.vacGridCard}>
                <img src={"/images/money.jpeg"} style={classes.vacCardImg} />
                <br />
                <Typography variant="body1">
                  <FormattedHTMLMessage id="app.hometext4" />
                </Typography>
                <br />
                <Button component={Link} to="/vacancies">
                  <FormattedHTMLMessage id="app.hometext6" />
                </Button>
              </Card>
            </Grid>
            <Grid item sm={4}>
              <Card style={classes.vacGridCard}>
                <img src={"/images/ai2.jpeg"} style={classes.vacCardImg} />
                <br />
                <Typography variant="body1">
                  <FormattedHTMLMessage id="app.hometext5" />
                </Typography>
                <br />
                <Button component={Link} to="/jobs">
                  <FormattedHTMLMessage id="app.hometext6" />
                </Button>
              </Card>
            </Grid>
            <Grid item sm={2}>
              <div id="vertAdsRight1" />
              <div id="vertAdsRight2" />
              <div id="vertAdsRight3" />
            </Grid>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <div id="advert1" />
      </div>
    );
  }
}

homescreen.propTypes = {
  logged_in: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  logged_in: state.user.logged_in
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(homescreen);
