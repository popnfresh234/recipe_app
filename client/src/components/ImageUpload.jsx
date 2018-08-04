import React, { Component } from 'react';
import { Image, Button, Input } from 'semantic-ui-react';
import axios from 'axios';


class ImageUpload extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      file: '',
      fileUrl: '',
    };
    this.handleChange = this.handleChange.bind( this );
    this.onSubmit = this.onSubmit.bind( this );
  }

  onSubmit( e ) {
    const fd = new FormData();
    fd.append( 'image', this.state.file );
    axios.post( '/api/test', { file: this.state.file } )
      .then( ( response ) => {
        console.log( response );
      } ).catch( ( err ) => {
        console.log( err );
      } );
  }

  handleChange( e ) {
    this.setState( {
      file: e.target.files[0],
      fileUrl: URL.createObjectURL( e.target.files[0] ),
    } );
  }


  render() {
    return (
      <div>
        <form
          ref="uploadForm"
          id="uploadForm"
          action="http://localhost:3001/api/test"
          method="post"
          encType="multipart/form-data"
        >
          <input type="file" name="image" />
          <input type="submit" value="Upload!" />
        </form>
      </div>
    );
  }
}

export default ImageUpload;

