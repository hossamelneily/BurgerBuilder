import * as actionTypes from './actionTypes'
import instance from "../../Axios/axios";

export const AddIngredientsHandler=(ig,ig_prices)=>{
    return {
        type:actionTypes.AddIngredientsHandler,
        payload:{
            ig:ig,
            IngredientsPrices:ig_prices
        }

    }
}

export const RemoveIngredientsHandler=(ig,ig_prices)=>{
    return {
        type:actionTypes.RemoveIngredientsHandler,
        payload:{
            ig:ig,
            IngredientsPrices:ig_prices
        }
    }
}

const setInitig=(ig)=>{
    return {
        type:actionTypes.InitIngredients,
        ingredients:ig,
    }
}

const setError=()=>{
    return {
        type:actionTypes.ErrorFetching,
    }
}

export const initIngredients=()=>{
    return (dispatch)=>{
        instance.get('ingredients.json').
        then(response => dispatch(setInitig(response.data))).
        catch(error => dispatch(setError()))
    }

}




