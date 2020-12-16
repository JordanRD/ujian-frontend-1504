import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

export class showModal extends Component {
    render() {
        return (
            <div>
                <Modal
                show='true'
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{this.props.products.title}</h4>
                    <p>
                        {this.props.products.description}
        </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                <div></div>
            </Modal>
            </div>
        )
    }
}

export default showModal
