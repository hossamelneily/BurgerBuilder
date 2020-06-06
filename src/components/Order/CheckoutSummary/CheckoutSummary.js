import React ,{useState,useEffect} from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Buttons/Buttons";
import classes from './CheckoutSummary.module.css'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";


const CheckoutSummary=(props)=> {
    // const [BurgerState, setBurgerState] = useState(
    //     {Ingredients:{}})

    // const query = new URLSearchParams(props.location.search)
    // console.log(query)
    // const Ingredients = {}
    // let price =0
    // for(let i of query.entries()){
    //     if(i[0]==='price'){
    //         price=<i></i>
    //     }else{
    //         Ingredients[i[0]]=+i[1]
    //     }
    //
    //
    // }


    const CancelHandler = () => {
        props.history.goBack()
    }

    const ContinueHandler = () => {
         props.history.replace('/checkout/contract-data')
    }

    return(


        <div className={classes.CheckoutSummary}>
            <h1>We Hope it taste well!!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger Ingredients={props.ig}/>
                <Button clicked={CancelHandler} btntype='Danger'>Cancel</Button>
                <Button clicked={ContinueHandler} btntype='Success'>Continue</Button>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        ig:state.BurgerBuilder.Ingredients,
        price:state.BurgerBuilder.price
    }
}

export default connect(mapStateToProps)(withRouter(CheckoutSummary))