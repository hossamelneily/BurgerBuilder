import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers , applyMiddleware , compose} from "redux";
import burgerBuilderReducer from "./store/reducers/BurgerBuilder";
import orderReducer from "./store/reducers/orders";
import AuthReducer from "./store/reducers/auth";
import {Provider} from 'react-redux'
import thunk from "redux-thunk";

const RootReducers=combineReducers (
        {
            BurgerBuilder: burgerBuilderReducer,
            Orders: orderReducer,
            Auth:AuthReducer
        }
    )


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;


const Store = createStore(RootReducers, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
