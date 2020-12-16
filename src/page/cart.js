import Axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import {login} from '../action'
export class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             indexedit:false,
             editqty:1
        }
    }
    handleQty = (i) => {
        if (i === '+') { this.setState({ editqty: this.state.editqty + 1 });return null}
        if (i === '-') { this.setState({ editqty: this.state.editqty < 2 ? 1 : this.state.editqty - 1 }); return null }
        this.setState({editqty:i.target.value<1?i:i.target.value})
    }
    
    buttondelete = (i,y) => {
        let cart = this.props.cart
        Axios.get(`http://localhost:2000/products/${y}`)
            .then((res) => {
                        cart.splice(i, 1)
                Axios.patch(`http://localhost:2000/users/${this.props.id}`, { cart: cart })
                    .then((res) => {
                        Axios.get(`http://localhost:2000/users/${this.props.id}`)
                            .then((res) =>{
                            this.props.login(res.data)
                        })
                    })
        })
    }
    render() {
        return (
            <div>
                {this.props.cart.map((item, index) => {
                    if (this.state.indexedit === index) {
                        return (
                            <div style={{width:'80%',display:'flex'}}>
                    <div style={{padding :'20px',width:'300px'}}>
                        <img style={{width:'90%'}} src={item.img} alt=""/>
                    </div>
                    <p>
                        {item.name}<br/>
                                    <Button onClick={()=>this.handleQty('+')}>+</Button>
                                    <input onChange={this.handleQty} type="number"value={this.state.editqty} name="qty" id=""/>
                        <Button onClick={()=>this.handleQty('-')}>-</Button><br/>
                        {item.price}<br/>
                        </p>
                        <Button >Save</Button>
                        <Button onClick={()=>this.setState({indexedit:false})}>Cancel</Button>
                    </div>
                        )
                    }
                    return (<div style={{width:'80%',display:'flex'}}>
                    <div style={{padding :'20px',width:'300px'}}>
                        <img style={{width:'90%'}} src={item.img} alt=""/>
                    </div>
                    <p>
                        {item.name}<br/>
                        {item.qty}<br/>
                        {item.price}<br/>
                        </p>
                        <Button onClick={(i)=>this.setState({indexedit:index})}>Edit</Button>
                        <Button onClick={()=>this.buttondelete(index,item.id)}>Delete</Button>
                    </div>)
                })
                }
            </div>
        )
    }
}
const mapStateToProps = (data) => {
    return {
        cart: data.user.cart,
        id:data.user.id
    }
}
export default connect(mapStateToProps,{login})(Cart)
