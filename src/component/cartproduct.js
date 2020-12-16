import React, { Component } from 'react'
import { Button,Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import {showModal}from'./modal'
export class CartProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             modal:false
        }
    }
    
    handlebuy = () => {
        console.log(this.props.email)
        if (!this.props.email) return alert('you need to login')
        
        this.setState({modal:true})
    }
    render() {
        const {dataproduct}=this.props
        return (
            <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={dataproduct.img} />
                        <Card.Body>
                    <Card.Title>{dataproduct.title}</Card.Title>
                            <Card.Text>
                                {dataproduct.description}
                            </Card.Text>
                            <Button onClick={this.handlebuy} variant="primary">buy</Button>
                </Card.Body>
                <showModal show={this.state.modal} onHide={()=>this.setState({modal:false})}/>
                    </Card>
        )
    }
}
const mapStateToProps = (data) => {
    return {
        email:data.user.email
    }
}
export default connect(mapStateToProps)(CartProduct)
