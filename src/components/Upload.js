import React, { Component, PureComponent } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Timer from "react-compound-timer";
import AvatarEditor from "react-avatar-editor";

import token from "../util/Auth";
import { FormattedMessage } from "react-intl";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { sendImage, loadUploadTask } from "../redux/actions/dataActions";
import { Typography, CircularProgress, Card, Slider } from "@material-ui/core";
import theme, { cssdata as classes } from "../util/theme";

const initialState = {
  border: 100,
  scale: 1.5,
  src: null
};

export class Upload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  setEditorRef = editor => {
    if (editor) {
      this.editor = editor;
    }
  };
  componentWillMount() {
    this.props.loadUploadTask();
  }
  getNewUploadTask = () => {
    this.props.loadUploadTask();
    this.setState(initialState);
  };

  componentWillReceiveProps(props) {
    this.props = props;
  }

  onSelectFile = files => {
    // console.log("drop");
    // if (e.target.files && e.target.files.length > 0) {
    //   const reader = new FileReader();
    //   reader.addEventListener("load", () =>
    //     this.setState({ src: reader.result })
    //   );
    //   reader.readAsDataURL(e.target.files[0]);
    // }
    this.setState({ src: files[0] });
    // console.log(document.querySelector("#imgtmp").width);
  };

  dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  onClickHandler = () => {
    var formData = new FormData();
    var imagefile = document.querySelector("#file");

    var file = this.dataURLtoFile(
      this.editor.getImageScaledToCanvas().toDataURL("image/png"),
      "a.png"
    );

    // formData.append("fileToUpload", imagefile.files[0]);
    formData.append("fileToUpload", file);
    formData.append("user", token);
    formData.append("definition", document.querySelector("#definition").value);

    this.props.sendImage(formData);
  };

  render() {
    const { crop, scale, src } = this.state;
    const {
      errors,
      task,
      UI: { loading },
      image_response: { status }
    } = this.props;
    let adaptiveSize = window.innerHeight > window.innerWidth ? 260 : 500;

    return (
      <div>
        {loading ? (
          <Typography variant="h6">
            <Timer
              initialTime={3000}
              direction="backward"
              checkpoints={[
                {
                  time: 0,
                  callback: () => this.getNewUploadTask()
                }
              ]}
            />
            <FormattedMessage id="tasks.loading_next_task" />
            <br />
            <CircularProgress size={30} />
          </Typography>
        ) : (
          <Card>
            {task && (
              <Typography variant="h6">
                <FormattedMessage id="tasks.tasks_upload_remain" />: {task}
              </Typography>
            )}
            {src ? (
              <div>
                <br />
                <AvatarEditor
                  ref={ref => this.setEditorRef(ref)}
                  image={src}
                  width={adaptiveSize}
                  height={adaptiveSize}
                  className="cropper"
                  border={20}
                  style={classes.cropper}
                  scale={this.state.scale}
                />
                <br />
                <Slider
                  onChange={(e, val) => {
                    this.setState({ scale: val });
                  }}
                  aria-label="Zoom"
                  defaultValue={1}
                  min={0.7}
                  max={3}
                  step={0.1}
                  style={{ width: "80%", maxWidth: 500 }}
                />
                <TextField
                  id="definition"
                  name="definition"
                  type="text"
                  label={<FormattedMessage id="tasks.definition" />}
                  helperText={<FormattedMessage id="tasks.definition_helper" />}
                  fullWidth
                />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onClickHandler}
                >
                  <FormattedMessage id="tasks.upload" />
                </Button>
              </div>
            ) : (
              <DropzoneArea
                id="file"
                filesLimit={1}
                acceptedFiles={["image/*"]}
                onChange={this.onSelectFile.bind(this)}
              />
            )}
          </Card>
        )}
      </div>
    );
  }
}
Upload.propTypes = {
  image_response: PropTypes.object.isRequired,
  loadUploadTask: PropTypes.func.isRequired,
  sendImage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  image_response: state.data.image_response,
  task: state.data.task.tasks_upload_remain,
  UI: state.UI
});

const mapDispatchToProps = {
  sendImage,
  loadUploadTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
