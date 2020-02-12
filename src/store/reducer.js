import * as actionTypes from './actions'

const initialState={
        Ingredients: {
        salad:0,
        meat:0,
        bacon:0,
        cheese:0
        },
        price:0
    }

const reducer=(state=initialState,action) =>{
    const newState = {...state}
    switch(action.type) {
        case(actionTypes.AddIngredientsHandler):
            newState.Ingredients[action.payload.ig]++
            console.log(newState.Ingredients)
            newState.price = newState.price+action.payload.IngredientsPrices[action.payload.ig]
            return newState
        case(actionTypes.RemoveIngredientsHandler):
            newState.Ingredients[action.payload.ig]--
            newState.price = newState.price+action.payload.IngredientsPrices[action.payload.ig]
            return newState
        default:
                return state

    }

}

export default reducer