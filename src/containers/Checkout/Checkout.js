import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router";
import ContractData from "./ContractData/ContractData";


const Checkout=(props)=>(

    <div>
        <CheckoutSummary />
        <Route path={props.match.url+'/contract-data'} component={ContractData}/>
    </div>
)


export default Checkout