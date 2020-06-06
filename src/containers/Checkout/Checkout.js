import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route,Redirect} from "react-router";
import ContractData from "./ContractData/ContractData";
import {connect} from "react-redux";


const Checkout=(props)=>{
    let summary = <Redirect to='/'/>

    console.log(props.ig)
    if(props.ig){
      summary=(
            <div>
                <CheckoutSummary />
                <Route path={props.match.url+'/contract-data'} component={ContractData}/>
            </div>
      )
    }
    return summary


}

const mapStateToProps=(state)=>{
    return{
        ig:state.BurgerBuilder.Ingredients,
        price:state.BurgerBuilder.price
    }
}





export default connect(mapStateToProps)(Checkout)