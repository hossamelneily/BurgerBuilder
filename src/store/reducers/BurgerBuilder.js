import * as actionTypes from '../actions/actionTypes'
import UpdateObject from "../../utility";
const initialState={
        Ingredients: null,
        price:0,
        error:false,
    }


const AddInge =(state,action)=>{
    return  UpdateObject(state,
               {
               Ingredients:{
               ...state.Ingredients,
               [action.payload.ig] : state.Ingredients[action.payload.ig] +1
               },
               price:state.price+action.payload.IngredientsPrices[action.payload.ig]
           })
}

const RemoveInge=(state,action)=>{
    return   UpdateObject(state,
               {
               Ingredients:{
               ...state.Ingredients,
               [action.payload.ig] : state.Ingredients[action.payload.ig] -1
               },
               price:state.price-action.payload.IngredientsPrices[action.payload.ig]
                })
}

const InitInge=(state,action)=>{
    return UpdateObject(state,{Ingredients:action.ingredients,price:0,error:false})
}

const ErrorFetch=(state,action)=>{
     return UpdateObject(state,{error:false})
}
const burgerBuilder=(state=initialState, action) =>{
    const newState = {...state}
    const new_ig = {...newState.Ingredients}
    switch(action.type) {
        case(actionTypes.AddIngredientsHandler):return AddInge(state,action)

            // new_ig[action.payload.ig]++
            // newState.price = newState.price+action.payload.IngredientsPrices[action.payload.ig]
            // newState.Ingredients= new_ig
            // newState.building=true
            // return newState
        case(actionTypes.RemoveIngredientsHandler):return RemoveInge(state,action)



            // new_ig[action.payload.ig]--
            // newState.price = newState.price-action.payload.IngredientsPrices[action.payload.ig]
            // newState.Ingredients= new_ig
            // newState.building = true
            // return newState

        case (actionTypes.InitIngredients):return InitInge(state,action)

            // newState.Ingredients=action.ingredients
            // newState.price=0
            // newState.error=false
            // // newState.building=false
            // return newState
        case (actionTypes.ErrorFetching):return ErrorFetch(state,action)

                // newState.error=true
            // return newState
        default:
            return state

    }

}

export default burgerBuilder