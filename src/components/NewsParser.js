import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Grid, Typography } from "@material-ui/core";
import theme, { cssdata as classes } from "../util/theme";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export class NewsParser extends Component {
  constructor() {
    super();
    this.state = {
      recentBlogPost: [
        {
          title: "",
          link: "",
          description: "",
          content: "",
          image: ""
        }
      ]
    };
  }
  componentWillMount(props) {
    this.FetchDataFromRssFeed(props);
  }
  FetchDataFromRssFeed = () => {
    var url =
      navigator.language.split(/[-_]/)[0] === "ru"
        ? // "http://ai-news.ru/rss.php"
          "https://elementy.ru/rss/news/it"
        : "https://www.artificial-intelligence.blog/news?format=rss";

    let rss = [];
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        var myObj = JSON.parse(request.responseText);
        if (this.props.num) {
          rss.push({
            title: myObj.items[this.props.num - 1].title,
            link: myObj.items[this.props.num - 1].link,
            description: myObj.items[this.props.num - 1].description,
            content: myObj.items[this.props.num - 1].content,
            image: myObj.items[this.props.num - 1].enclosure.link
          });
        } else
          for (var i = 0; i < myObj.items.length; i++) {
            rss.push({
              title: myObj.items[i].title,
              link: myObj.items[i].link,
              description: myObj.items[i].description,
              content: myObj.items[i].content,
              image: myObj.items[i].enclosure.link
            });
          }
        this.setState({ recentBlogPost: rss });
      }
    };
    request.open(
      "GET",
      "https://api.rss2json.com/v1/api.json?rss_url=" + url,
      true
    );
    request.send();
  };

  render() {
    return !this.state.recentBlogPost ? (
      <br />
    ) : (
      this.state.recentBlogPost.map(k => {
        return (
          <div key={k.link}>
            <br />
            <Card style={classes.newsGridCard}>
              <Grid container direction="row">
                <Grid item sm={3}>
                  <img src={k.image} style={classes.newsCardImg} />
                </Grid>
                <Grid item sm={1} />
                <Grid item sm={8}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography
                        align="left"
                        variant="h6"
                        style={classes.newslink}
                      >
                        <a
                          href={k.link}
                          style={classes.newslink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {k.title}
                        </a>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <br />
                      <div dangerouslySetInnerHTML={{ __html: k.content }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsParser);
