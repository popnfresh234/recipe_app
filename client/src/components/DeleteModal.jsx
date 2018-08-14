import { Button, Modal, Header, Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeleteModal extends Component {
  constructor( props ) {
    super( props );
    this.handleDeleteButton = this.handleDeleteButton.bind( this );
    this.handleOpen = this.handleOpen.bind( this );
    this.handleClose = this.handleClose.bind( this );
    this.state = {
      modalOpen: false,
    };
  }
  handleOpen() {
    this.setState( {
      modalOpen: true,
    } );
  }
  handleClose() {
    this.setState( {
      modalOpen: false,
    } );
  }

  handleDeleteButton() {
    this.props.onDelete();
    this.handleClose();
  }
  render() {
    return (
      <Modal
        className="delete-modal"
        dimmer="blurring"
        size="small"
        open={this.state.modalOpen}
        trigger={
          <Button negative onClick={this.handleOpen}>Delete</Button>}
      >
        <Header><Icon name="question circle" />Are you sure you want to delete this recipe?</Header>
        <Modal.Actions>
          <Button onClick={this.handleClose}>
            Back
          </Button>
          <Button negative onClick={this.handleDeleteButton}>
            <Icon name="trash" /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteModal;
