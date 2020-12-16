import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../action'
import { Navbar, Form, Button,Dropdown, Nav, FormControl, Badge } from 'react-bootstrap'
export class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            check: false,
            value: false,

        }
    }
    handleChange = (i) => {
                this.props.logout()
                localStorage.clear()
        }
    
    render() {
        return (

            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to='/'>Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/cart'>cart<Badge variant="light">{(this.props.cart.length||0)}</Badge></Nav.Link>
                        <Nav.Link as={Link} to='/history'>history</Nav.Link>
                    </Nav>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.props.email?this.props.email:'username'}
  </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                this.props.email ?
                                <Dropdown.Item onClick={this.handleChange}>Logout</Dropdown.Item>
                                    :
                                <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>

            
        )
    }
}
const mapStateToProps = (data) => {
    return {
        email: data.user.email,
        cart :data.user.cart
    }
}
export default connect(mapStateToProps, { logout })(Navigation)