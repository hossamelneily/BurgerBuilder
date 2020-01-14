import React , {useState,useEffect,useCallback} from 'react';
import WithClass from "../../Hoc/Withclasses";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import instance from "../../Axios/axios";
import Spinner from "../../components/UI/Spinner/Spinner";

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
    useEffect(
        () => console.log('a'),[])
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

    const PurchasesNowHandler=()=>{
        let NewPurchased = false
        for(let i in BurgerState.Ingredients){
             NewPurchased = BurgerState.Ingredients[i] > 0

            if(NewPurchased){
                break
            }
        }
        setBurgerState({Ingredients:BurgerState.Ingredients,price: BurgerState.price,purchased:NewPurchased,Modal:false,spinner:false})
    }

    const ModalHandler=()=>(
        setBurgerState({Ingredients:BurgerState.Ingredients,price: BurgerState.price,purchased:BurgerState.purchased,Modal:!BurgerState.Modal,spinner:false})

    )

    const ContinueHandler= ()=> {

        // alert('Continue!!')
        const order = {
            ingredients: {...BurgerState.Ingredients},
            price: BurgerState.price
        }
        setBurgerState({Ingredients:BurgerState.Ingredients,price: BurgerState.price,purchased:BurgerState.purchased,Modal:BurgerState.Modal,spinner:true})

        instance.post('/orders.json',order).then( response =>
            // console.log(response)
            setBurgerState({Ingredients:BurgerState.Ingredients,price: BurgerState.price,purchased:BurgerState.purchased,Modal:false,spinner:false})
        )
        .catch( error =>
            // console.log(error)
           setBurgerState({Ingredients:BurgerState.Ingredients,price: BurgerState.price,purchased:BurgerState.purchased,Modal:false,spinner:false})

        )
    }
    const ZeroIngredients={...BurgerState.Ingredients}
    for(let index in ZeroIngredients){
        ZeroIngredients[index] = ZeroIngredients[index]<=0
    }
    let ModalHtml =null
    let SpinnerHtml =(<OrderSummary price={BurgerState.price.toFixed(2)} clicked_D={ModalHandler} clicked_S={ContinueHandler} Ingredients={BurgerState.Ingredients}/>)

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

            <Burger Ingredients={BurgerState.Ingredients} />

                {ModalHtml}

            <BuildControls
                add={AddIngredientsHandler}
                remove={RemoveIngredientsHandler}
                disabled={ZeroIngredients}
                price={BurgerState.price}
                purchased={BurgerState.purchased}
                Modal={ModalHandler}

            />
            </WithClass>

    )
}

export default BurgerBuilder