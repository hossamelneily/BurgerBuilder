import React , {useState,useEffect,useCallback} from 'react';
import WithClass from "../../Hoc/Withclasses";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import instance from "../../Axios/axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as actionTypes from '../../store/actions'

const Ingredients_Prices={
    salad:0.2,
    meat:0.5,
    bacon:3.4,
    cheese:2.1
}

const BurgerBuilder =(props)=> {




    const [BurgerState, setBurgerState] = useState(
        {Ingredients:{
        salad:0,
        meat:0,
        bacon:0,
        cheese:0
    },price:0,purchased:false,Modal:false,spinner:false})
// instance.
//     get('https://burgerbuilder-efc4e.firebaseio.com/ingredients.json').
//     then(response => console.log(response)).
//     catch(error => console.log(error))
//     useEffect(
//         () => console.log('a'),[])
    const AddIngredientsHandler=(type)=>{
        BurgerState.Ingredients[type]++
        const NewIngredients = {...BurgerState.Ingredients}
        BurgerState.price = BurgerState.price+Ingredients_Prices[type]
        setBurgerState({Ingredients:NewIngredients,price: BurgerState.price,purchased:false,Modal:false,spinner: false})
       // console.log(BurgerState)
        PurchasesNowHandler()

    }

    const RemoveIngredientsHandler=(type)=>{
        BurgerState.Ingredients[type]--

        const NewIngredients = {...BurgerState.Ingredients}
        BurgerState.price = BurgerState.price-Ingredients_Prices[type]
        setBurgerState({Ingredients:NewIngredients,price: BurgerState.price,purchased:BurgerState.purchased,Modal:false,spinner:false})
        // console.log(BurgerState)
        PurchasesNowHandler()
    }

    const PurchasesNowHandler=(ingredients)=>{
        const sum= Object.entries(ingredients).reduce((sum,value,index)=>(
            sum=sum+value[1]
        ),0)
        return sum>0
        // let NewPurchased = false
        // for(let i in props.ig){
        //      NewPurchased = props.ig[i] > 0
        //
        //     if(NewPurchased){
        //         break
        //     }
        // }
        // setBurgerState({Ingredients:props.ig,price: props.price,purchased:NewPurchased,Modal:false,spinner:false})
    }

    const ModalHandler=()=>(
        setBurgerState({Ingredients:props.ig,price: props.price,purchased:BurgerState.purchased,Modal:!BurgerState.Modal,spinner:false})

    )

    const ContinueHandler= ()=> {


        var queryparams = []
        for(let i in props.ig){
            queryparams.push(encodeURIComponent(i)+'='+encodeURIComponent(props.ig[i]))
        }
        queryparams.push('price='+props.price)

        props.history.push(
            {
                pathname:'/checkout',
                search:'?'+queryparams.join('&')
            }
            )
    }
    const ZeroIngredients={...props.ig}
    for(let index in ZeroIngredients){
        ZeroIngredients[index] = ZeroIngredients[index]<=0
    }
    let ModalHtml =null
    let SpinnerHtml =(<OrderSummary price={props.price.toFixed(2)} clicked_D={ModalHandler} clicked_S={ContinueHandler} Ingredients={props.ig}/>)

    if(BurgerState.spinner){
        SpinnerHtml=(<Spinner/>)
    }
    if(BurgerState.Modal){
        ModalHtml=(
            <Modal click={ModalHandler} show={BurgerState.Modal} >
                 {SpinnerHtml}

            </Modal>
        )
    }

    return (
            <WithClass>

            <Burger Ingredients={props.ig} />

                {ModalHtml}

            <BuildControls
                add={props.AddIngredientsHandler}
                remove={props.RemoveIngredientsHandler}
                disabled={ZeroIngredients}
                price={props.price}
                purchased={PurchasesNowHandler(props.ig)}
                Modal={ModalHandler}

            />
            </WithClass>

    )
}

const mapStateToProps=(state)=>{
    console.log(state.Ingredients)
    return{
        ig:state.Ingredients,
        price:state.price
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        AddIngredientsHandler: (ig) => dispatch({type:actionTypes.AddIngredientsHandler,
            payload:{
            ig:ig,
            IngredientsPrices:Ingredients_Prices
            }}),
        RemoveIngredientsHandler: (ig) => dispatch({type:actionTypes.RemoveIngredientsHandler,
             payload:{
            ig:ig,
            IngredientsPrices:Ingredients_Prices
            }}),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder)