import * as actionTypes from '../actions/actionTypes'
import UpdateObject from "../../utility";
const initialState={
        orders:[],
        spinner:false,
        purchased:false
    }
const InitPurchased=(state,action)=>{
    return UpdateObject(state,{purchased:true})
}
const PurchaseHandler=(state,action)=>{
    return UpdateObject(state,{spinner:true})
}
const PurchaseHandlersuccess=(state,action)=>{
     return UpdateObject(state,{spinner:false,purchased:true})
}
const PurchaseHandlerFail=(state,action)=>{
    return UpdateObject(state,{spinner:false})
}
const fetchstart=(state,action)=>{
     return UpdateObject(state,{spinner:true})
}
const fetchsuccess=(state,action)=>{
    return UpdateObject(state,{spinner:false,orders:action.data})
}
const fetchfail=(state,action)=>{
    return UpdateObject(state,{spinner:false})
}
const reducer=(state=initialState, action) =>{
    // const newState = {...state}

    switch(action.type) {
        case(actionTypes.INITPURCHASED):return InitPurchased(state,action)

            // newState.purchased=false
            // return newState
        case (actionTypes.purchaseHandlerStart):PurchaseHandler(state,action)

            // newState.spinner=true
            // return newState
        case(actionTypes.purchaseHandlerSuccess):return PurchaseHandlersuccess(state,action)

        //     newState.spinner=false
        //     newState.purchased = true
        //     // newState.orders=[...newState.orders,action.data]
        //      return newState
        case(actionTypes.purchaseHandlerFail):return PurchaseHandlerFail(state,action)

             // newState.spinner=false
             //    return newState
        case (actionTypes.FETCH_START):return fetchstart(state,action)

            // newState.spinner=true
            // return newState
        case(actionTypes.FETCH_SUCCESS):return fetchsuccess(state,action)

            // newState.spinner=false
            // // newState.orders=newState.orders.concat(action.data)
            // newState.orders = [...newState.orders,...action.data]
            // return newState
        case(actionTypes.FETCH_FAIL):return fetchfail(state,action)

            //  newState.spinner=false
            // return newState
        default:
            return state

    }

}

export default reducer