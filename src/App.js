import React,{useEffect} from 'react';
import Layout from "./components/Layout/Layout";
import Burgerbuilder from "./containers/BurgerBuilder/burgerbuilder";
import {BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Checkout/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actionCreators from "./store/actions/auth";

function App(props) {

    useEffect(()=>{
        props.AuthCheckState()
    },[])

    let routes=(
        <Switch>
             <Route path='/' exact component={Burgerbuilder}/>
             <Route path='/auth' component={Auth}/>
             <Redirect to='/'/>
        </Switch>
    )
    if (props.token){
        routes=(
            <Switch>
                <Route path='/' exact component={Burgerbuilder}/>
                <Route path='/auth' component={Auth}/>
                <Route path='/checkout' component={Checkout} />
                <Route path='/orders' exact component={Orders}/>
                <Route path='/logout' exact component={Logout}/>
            </Switch>
        )}
  return (
        <BrowserRouter>
            <Layout>

                {routes}
            </Layout>
        </BrowserRouter>

  );
}
const mapStateToProps=(state)=>{
    return{
        token:state.Auth.idToken
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        AuthCheckState:() => dispatch(actionCreators.AuthCheckState()),

    };
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
