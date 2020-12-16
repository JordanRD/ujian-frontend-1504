import Axios from 'axios'
import React, { Component } from 'react'
import { Card, Button, ButtonGroup, Modal, Col,Toast,Row } from 'react-bootstrap'
import CartProduct from '../component/cartproduct'
import showModal from '../component/modal'
import { connect } from 'react-redux'
import { login } from '../action'
export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataproduct: [],
            modal: false,
            qty: 1
            , indexshow: 0
        }
    }
    handlebuy = (i) => {
        console.log(this.props.email)
        if (!this.props.email) return alert('you need to login')
        this.setState({ modal: true, indexshow: i })

    }

    componentDidMount() {
        Axios.get('http://localhost:2000/products')
            .then((res) => {
                this.setState({ dataproduct: res.data })

            })
    }
    handlestock = (index, i) => {
        if (i === '+') { this.setState({ qty: (this.state.qty + 1) <= 1 ? 1 : (this.state.qty + 1) > this.state.dataproduct[index].stock ? this.state.dataproduct[index].stock : (this.state.qty + 1) }); return null }
        if (i === '-') { this.setState({ qty: (this.state.qty - 1) <= 1 ? 1 : (this.state.qty - 1) > this.state.dataproduct[index].stock ? this.state.dataproduct[index].stock : (this.state.qty - 1) }); return null }
        let val = i.target.value
        this.setState({ qty: val <= 1 ? 1 : val > this.state.dataproduct[index].stock ? this.state.dataproduct[index].stock : val })
    }
    handletocart = (i) => {
        const { dataproduct, indexshow } = this.state
        const { cart } = this.props
        let tempcart = cart
        let cartawal = {
            name: dataproduct[i].name,
            img: dataproduct[i].img,
            price: dataproduct[i].price,
            id: dataproduct[i].id,
            qty: this.state.qty,
            total: 0,
            notif:false
        }
        let idxcart = undefined
        tempcart.map((item, index) => {
            if (item.name === cartawal.name) {
                idxcart = index
            }
        })
        if (idxcart !== undefined) {
            tempcart[idxcart].qty = parseInt(tempcart[idxcart].qty) + this.state.qty
            tempcart[idxcart].total = parseInt(tempcart[idxcart].price) * tempcart[idxcart].qty
        } else {
            cartawal.total = parseInt(cartawal.qty) * parseInt(cartawal.price)
            tempcart.push(cartawal)
        }
        console.log(tempcart)
        Axios.patch(`http://localhost:2000/users/${this.props.id}`, { cart: tempcart })
            .then((res) => {
                Axios.get(`http://localhost:2000/users/${this.props.id}`)
                    .then((res) => {
                        this.setState({
                            modal: false,
                            qty: 1,
                            indexshow: 0,
                            notif:true
                        })
                        this.props.login(res.data)
                    })
            })
    }
    render() {
        console.log(this.state.indexshow)
        if (!this.state.dataproduct) return <div></div>
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                
                {this.state.dataproduct.map((item, index) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.img} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                                <Button onClick={(i) => this.handlebuy(index)} variant="primary">buy</Button>
                            </Card.Body>
                            <Modal
                                show={this.state.modal}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header onClick={() => this.setState({ modal: false })} closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">

                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ display: 'flex' }}>
                                    <div style={{ padding: '10px' }}>
                                        <img width='90%' src={this.state.dataproduct[this.state.indexshow].img} alt="shoes" />
                                    </div>
                                    <div>
                                        <h4>{this.state.dataproduct[this.state.indexshow].name}</h4>
                                        <p>
                                            stock:{this.state.dataproduct[this.state.indexshow].stock}<br />
                                            {this.state.dataproduct[this.state.indexshow].description}
                                        </p>
                                        <div>
                                            <Button onClick={() => this.handlestock(this.state.indexshow, '+')}>+</Button>
                                            <input value={this.state.qty} onChange={(i) => this.handlestock(this.state.indexshow, i)} type="number" />
                                            <Button onClick={() => this.handlestock(this.state.indexshow, '-')}>-</Button>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => this.handletocart(this.state.indexshow)}>Buy</Button>
                                </Modal.Footer>
                                
                            </Modal>
                            
                        </Card>
                    )
                })}
                            
            </div>
        )
    }
}

const mapStateToProps = (data) => {
    return {
        email: data.user.email,
        cart: data.user.cart,
        id: data.user.id
    }
}
export default connect(mapStateToProps, { login })(Home)
