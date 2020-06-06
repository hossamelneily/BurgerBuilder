import * as actionTypes from '../actions/actionTypes'
import UpdateObject from "../../utility";

const initialState={
        idToken:null,
        localId:null,
        spinner:false,
        error:null
    }

const Authstart=(state,action)=>{
    return UpdateObject(state,{spinner:true,error:null})
}
const AuthSuccess=(state,action)=>{
     return UpdateObject(state,{spinner:false,idToken:action.idToken,localId:action.localId,error:null})
}
const Authfail=(state,action)=>{
     return UpdateObject(state,{spinner:false,error:action.error})
}
const Authlogout=(state,action)=>{
     return UpdateObject(state,{spinner:false,idToken:null,localId:null,error:null})
}
const reducer=(state=initialState, action) =>{
    const newState = {...state}

    switch(action.type) {
        case(actionTypes.Auth_Start):return Authstart(state,action)

            // newState.spinner=true
            // newState.error=null
            // return newState
        case (actionTypes.Auth_Success):return AuthSuccess(state,action)

            // newState.spinner=false
            // newState.idToken = action.idToken
            // newState.localId = action.localId
            // newState.error = null
            // return newState
        case(actionTypes.Auth_Fail):return Authfail(state,action)

        //     newState.spinner=false
        //     newState.error = action.error
        // return newState
        case(actionTypes.Auth_Logout):return Authlogout(state,action)

            // newState.spinner=false
            // newState.idToken = null
            // newState.localId = null
            // newState.error = null
            // return newState
        default:
            return state

    }

}

export default reducer