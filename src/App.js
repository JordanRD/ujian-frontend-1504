import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './page/login'
import Navigation from './component/navigation'
import Home from './page/home'
import {login}from'./action'
import {connect}from'react-redux'
import Axios from'axios'
import Cart from './page/cart'

export class App extends Component {

        componentDidMount(){
            if(localStorage.email){
                Axios.get(`http://localhost:2000/users?email=${localStorage.email}`)
    .then((res)=>{
        this.props.login(res.data[0])
    })
            }
        }
    
    render() {
        return (
            <div>
                <Navigation/>
                <Switch>
                    <Route path='/cart'component={Cart}/>
                <Route path='/login' component={Login}/>
                <Route path='/'exact component={Home}/>
                </Switch>
            </div>
        )
    }
}
export default connect(null,{login}) (App)
