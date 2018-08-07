/* eslint class-methods-use-this: 0 */ // --> OFF
import React, { Component } from 'react';
import { Input, Image as SemanticImage } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';


class ImageUpload extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      fileUrl: 'https://s3-us-west-2.amazonaws.com/big-cooking-recipe-images/place-holder.png',
    };
    this.handleChange = this.handleChange.bind( this );
    this.resize = this.resize.bind( this );
    this.resizeImage = this.resizeImage.bind( this );
  }

  handleChange( e ) {
    const file = e.target.files[0];
    const ext = file.name.replace( /^.*\./, '' );
    this.resize( file, 1000, 1000, ext, ( resizedDataUrl ) => {
      this.setState( {
        fileUrl: resizedDataUrl,
      } );
      const binary = atob( resizedDataUrl.split( ',' )[1] );
      const array = [];
      for ( let i = 0; i < binary.length; i++ ) {
        array.push( binary.charCodeAt( i ) );
      }
      const blob = new Blob( [new Uint8Array( array )], { type: `image/${ext}` } );
      const file = new File( [blob], `${uuidv4()}.${ext}`, { type: blob.type } );
      this.props.addImage( file );
    } );
  }

  resize( file, maxWidth, maxHeight, extension, fn ) {
    const reader = new FileReader();
    const { resizeImage } = this;
    reader.readAsDataURL( file );
    reader.onload = ( event ) => {
      const dataUrl = event.target.result;
      const image = new Image();
      image.src = dataUrl;
      image.onload = () => {
        const resizedDataUrl = resizeImage( image, maxWidth, maxHeight, 1, extension );
        fn( resizedDataUrl );
      };
    };
  }

  resizeImage( image, maxWidth, maxHeight, quality, extension ) {
    const canvas = document.createElement( 'canvas' );
    canvas.width = maxWidth;
    canvas.height = maxHeight;
    const ctx = canvas.getContext( '2d' );
    const sourceX = ( image.width / 2 ) - ( maxWidth / 2 );
    const sourceY = ( image.height / 2 ) - ( maxHeight / 2 );
    ctx.fillStyle = '#FFFFE0';
    ctx.fillRect( 0, 0, maxWidth, maxHeight );
    ctx.drawImage( image, sourceX, sourceY, maxWidth, maxHeight, 0, 0, maxWidth, maxHeight );
    return canvas.toDataURL( `image/${extension}`, quality );
  }


  render() {
    return (
      <div >
        <SemanticImage style={{ margin: '0 auto' }} size="medium" src={this.state.fileUrl} />
        <Input className="new-recipe-image-input" type="file" onChange={this.handleChange} />
      </div>
    );
  }
}

export default ImageUpload;

