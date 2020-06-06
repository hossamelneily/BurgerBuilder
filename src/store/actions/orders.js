import * as actionTypes from '../actions/actionTypes'
import instance from "../../Axios/axios";
import {FETCH_SUCCESS} from "../actions/actionTypes";
import {FETCH_FAIL} from "../actions/actionTypes";
import Orders from "../../containers/Checkout/Orders/Orders";

const submitHandler=(data)=>{
    return {
        type:actionTypes.purchaseHandlerSuccess,
        data:data,
    }
}

const ErrorHandler=(error)=>{
    return {
        type:actionTypes.purchaseHandlerFail,
        error:error
    }
}
export const purchaseHandler=(order,token)=>{
    return dispatch => {
        instance.post('/orders.json?auth='+token,order).then( response =>{
            console.log(response.data)
          dispatch(submitHandler(response.data))
        })
        .catch( error => {
            dispatch(ErrorHandler(error))
        })
    }
}

export const purchaseHandlerStart=()=>{
    return{
        type:actionTypes.purchaseHandlerStart
    }
}

export const fetch_start=()=>{
    return{
        type:actionTypes.FETCH_START
    }
}

export const fetch_success=(orders)=>{
    return{
        type:actionTypes.FETCH_SUCCESS,
        data:orders
    }
}

export const fetch_fail=()=>{
    return{
        type:actionTypes.FETCH_FAIL
    }
}

export const FetchHandler=(token,userId)=>{
    return dispatch  => {
        const querparam ="?auth="+token+'&'+`orderBy="userID"&equalTo="${userId}"`
    instance.get('/orders.json'+querparam).then(
        (response) => {
            console.log(response.data)
             const Orders=[]
            const Orders_for_userId  = Object.entries(response.data).filter(([key,value],index)=>{
                return value.userID == userId
            })
            Orders_for_userId.map(([key,value],index) => {
                Orders.push({
                   ...value,
                    id:key

                })
            })
            // console.log(Orders)
            dispatch(fetch_success(Orders))
        }).catch(
        (error)=>{
            dispatch(fetch_fail(error))
    })
    }
}


