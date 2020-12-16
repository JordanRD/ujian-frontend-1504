import React, { Component } from 'react'
import Axios from 'axios'
import { login } from '../action'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emverify: true,
            passverify: true
        }
    }
    handleClick = (event) => {
        event.preventDefault()
        this.setState({ emverify: true, passverify: true })
        let email = this.refs.email.value
        let password = this.refs.password.value
        let regexem = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let regexpass = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
        if (!regexem.test(email) || email === '' || !regexpass.test(password) || password.length < 6) {
            if (!regexpass.test(password) && regexem.test(email)) {
                this.setState({ emverify: false, passverify: false })
                return null

            }
            if (!regexem.test(email) || email === '') {
                this.setState({ emverify: false })
                return null
            }
            if (!regexpass.test(password) || password.length < 6) {
                this.setState({ passverify: false })
                return null

            }
            return null
        }
        this.setState({ emverify: true, passverify: true })
        let user = {
            password: password,
            cart: [],
            email: email,
            history: []
        }
        Axios.get(`http://localhost:2000/users?email=${email}`)
            .then((res) => {
                if (res.data.length) {
                    if (res.data[0].password !== password) {
                        this.setState({passverify: false})
                    } else {
                        this.props.login(res.data[0])
                        localStorage.email = res.data[0].email
                        console.log('oke')
                    }
                } else {
                    console.log('tidakada')
                    Axios.post('http://localhost:2000/users', user)
                        .then((res) => {
                            this.props.login(user)
                            localStorage.email = user.email
                        })
                }
            })
    }
    render() {
        if (this.props.user) return <Redirect to='/' />
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control ref='email' type='email' name='email' placeholder="Enter email" />
                        <Form.Text style={{ color: this.state.emverify ? 'black' : 'red', display: this.state.emverify ? 'none' : '' }}>
                            invalid email
    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref='password' />
                        <Form.Text style={{ color: this.state.passverify ? 'black' : 'red', display: this.state.emverify ? 'none' : '' }}>
                            invalid or wrong password
    </Form.Text>
                    </Form.Group>

                    <Button variant="primary" onClick={this.handleClick}>
                        Submit
  </Button>
                </Form>
                {/* <form>
                    <label  name='email'>Email</label>
                    <input ref='email' type='email' name='email'/>
                    <p style={{color:this.state.emverify?'':'red',display:this.state.emverify?'none':''}}>
                        invalid email
                    </p>
                    <label name='password'>Password</label>
                    <input ref='password' type='password' name='password'/>
                    <p style={{color:this.state.passverify?'':'red',display:this.state.passverify?'none':''}}>
                        invalid password,
                        password min 6char
                    </p>
                    <button onClick={this.handleClick}>
                        login
                    </button>
                </form> */}
            </div>
        )
    }
}
const mapStateToProps = (data) => {
    return {
        user: data.user.email
    }

}
export default connect(mapStateToProps, { login })(Login)
