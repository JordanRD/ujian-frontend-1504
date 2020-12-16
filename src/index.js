import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider} from 'react-redux'
import { createStore} from 'redux'
import allReducer from './reducer'
 
 
 
 
const globalState = createStore(allReducer)
globalState.subscribe(()=>console.log('globalState : '+globalState.getState()))
ReactDOM.render(
<Provider store={globalState}>
<Router>
<App />
</Router>
</Provider>,
document.getElementById('root')
)