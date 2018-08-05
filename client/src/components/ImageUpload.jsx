import React, { Component } from 'react';
import { Image, Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';


class ImageUpload extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      fileUrl: '',
    };
    this.handleChange = this.handleChange.bind( this );
  }


  handleChange( e ) {
    const file = e.target.files[0];
    const newName = `${uuidv4()}.${file.name.replace( /^.*\./, '' )}`;
    const renamedFile = new File( [file], newName, { type: file.type } );
    this.setState( {
      fileUrl: URL.createObjectURL( renamedFile ),
    } );
    this.props.addImage( renamedFile );
  }


  render() {
    return (
      <div>
        <Image src={this.state.fileUrl} />
        <Input type="file" onChange={this.handleChange} />
      </div>
    );
  }
}

export default ImageUpload;

