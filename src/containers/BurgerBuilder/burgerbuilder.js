import React , {useState,useEffect,useCallback,Fragment} from 'react';
import WithClass from "../../Hoc/Withclasses";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import instance from "../../Axios/axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as actionTypes from '../../store/actions/actionTypes'
import * as actionCreators from '../../store/actions/BurgerBuilder'

const Ingredients_Prices={
    salad:0.2,
    meat:0.5,
    bacon:3.4,
    cheese:2.1
}

const BurgerBuilder =(props)=> {


    const [purchasedState,setPurchased] = useState(false)
    const [ModalState,setModal]=useState(false)



    // useEffect(()=>{
    //     setTimeout(()=>instance.
    //             get('ingredients.json').
    //             then(response => setBurgerState({
    //             Ingredients:response.data,
    //             price:BurgerState.price,
    //             purchased:BurgerState.purchased,
    //             Modal:BurgerState.Modal,
    //             spinner:false
    //     })).
    //             catch(error => setBurgerState({
    //             Ingredients:BurgerState.Ingredients,
    //             price:BurgerState.price,
    //             purchased:BurgerState.purchased,
    //             Modal:BurgerState.Modal,
    //             spinner:false
    //     })),5000)
    //
    //     }
    //     ,[])

    useEffect(()=>
            props.SetInitIngredients()
    ,[])



    // const AddIngredientsHandler=(type)=>{
    //     BurgerState.Ingredients[type]++
    //     const NewIngredients = {...BurgerState.Ingredients}
    //     BurgerState.price = BurgerState.price+Ingredients_Prices[type]
    //     setBurgerState({Ingredients:NewIngredients,price: BurgerState.price,purchased:false,Modal:false,spinner: false})
    //    // console.log(BurgerState)
    //     PurchasesNowHandler()
    //
    // }
    //
    // const RemoveIngredientsHandler=(type)=>{
    //     BurgerState.Ingredients[type]--
    //
    //     const NewIngredients = {...BurgerState.Ingredients}
    //     BurgerState.price = BurgerState.price-Ingredients_Prices[type]
    //     setBurgerState({Ingredients:NewIngredients,price: BurgerState.price,purchased:BurgerState.purchased,Modal:false,spinner:false})
    //     // console.log(BurgerState)
    //     PurchasesNowHandler()
    // }

    const PurchasesNowHandler=(ingredients)=>{
        let sum
        if(ingredients){
            sum= Object.entries(ingredients).reduce((sum,value,index)=>(
            sum=sum+value[1]
        ),0)
        }

        return sum>0
    }

    const ModalHandler=()=> {

        if (!props.token) {
                props.history.push('/auth')

        }
         setModal(!ModalState)


    }


    const ContinueHandler= ()=> {
        props.history.push(
            {
                pathname:'/checkout',

            })
    }


    const disabledButton=()=>{
        const ZeroIngredients={...props.ig}
        for(let index in ZeroIngredients){
             ZeroIngredients[index] = ZeroIngredients[index]<=0
        }
        return ZeroIngredients
    }





    let orderSummary = (
        <OrderSummary price={props.price.toFixed(2)} clicked_D={ModalHandler} clicked_S={ContinueHandler} Ingredients={props.ig}/>
    )
    let ModalHtml = (<Modal click={ModalHandler} show={ModalState} >
                            {orderSummary}
                    </Modal>)


    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if(props.ig){

        burger = (
            <Fragment>
            <Burger Ingredients={props.ig} />
             <BuildControls
                add={props.AddIngredientsHandler}
                remove={props.RemoveIngredientsHandler}
                disabled={disabledButton()}
                price={props.price}
                purchased={PurchasesNowHandler(props.ig)}
                Modal={ModalHandler}
                token = {props.token}
                />
            </Fragment>)
    }
    return (
            <WithClass>


                {burger}
                {ModalState?ModalHtml:null}




            </WithClass>

    )
}

const mapStateToProps=(state)=>{
    return{
        ig:state.BurgerBuilder.Ingredients,
        price:state.BurgerBuilder.price,
        error:state.BurgerBuilder.error,
        token :state.Auth.idToken,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        AddIngredientsHandler: (ig) => dispatch(actionCreators.AddIngredientsHandler(ig,Ingredients_Prices)),
        RemoveIngredientsHandler: (ig) => dispatch(actionCreators.RemoveIngredientsHandler(ig,Ingredients_Prices)),
        SetInitIngredients: () => dispatch(actionCreators.initIngredients())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder)


