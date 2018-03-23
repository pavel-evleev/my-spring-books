import React from 'react'
import { notify } from 'react-notify-toast'

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: null };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    // console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if (file.size >= 5242880) {
      notify.show("Size of image more then 5 mb", 'error', 5000)
      return
    } else {
      this.props.handleFile(file)
      reader.onloadend = () => {
        console.log(file.size > 5242880)
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
    }
  }
  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview, but size don't more then 5 mb</div>);
    }
    return (
      <div className={"previewComponent " + this.props.className} >
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <label className="file-input-btn" htmlFor="upload-img">Select img...</label>
          <input className="fileInput" id="upload-img"
            type="file" accept="image/*"
            onChange={(e) => {

              this._handleImageChange(e)

            }} />
          {/* <button className="submitButton"
            type="submit"
            onClick={(e) => this._handleSubmit(e)}>Upload Image</button> */}
        </form>
        {this.props.preview ?
          <div className="imgPreview">
            {imagePreviewUrl ? $imagePreview : (this.props.currentImg ? this.props.currentImg : $imagePreview)}
          </div> : ''}
      </div>
    )
  }
}


ImageUpload.defaultProps = {
  preview: true,
  currentImg: null
}

export default ImageUpload