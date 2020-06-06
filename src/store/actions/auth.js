import * as actionTypes from './actionTypes'
import axios from 'axios'

export const AuthStart=()=>{
    return{
        type:actionTypes.Auth_Start
    }
}

export const AuthSuccess=(localId,idToken)=>{
    return{
        type:actionTypes.Auth_Success,
        localId:localId,
        idToken:idToken
    }
}

export const AuthFail=(error)=>{
    return{
        type:actionTypes.Auth_Fail,
        error:error
    }
}

export const AuthLogout=()=> {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('localId')
    return {
        type: actionTypes.Auth_Logout
    }
}

export  const checkTimeout=(expirationTime)=>{
    return dispatch =>{
       setTimeout(()=>dispatch(AuthLogout()),expirationTime * 1000)
    }
}


export const auth=(email,password,isSignUp)=>{
    return dispatch => {
        dispatch(AuthStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDN3Fp4VHWaQDeGnCkCEsrUzGLGHJ3rdA8'
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDN3Fp4VHWaQDeGnCkCEsrUzGLGHJ3rdA8'
        }
        axios.post(url,authData).
        then(
            response => {
                // console.log(response)
                const expirationDate = new Date(new Date().getTime()+response.data.expiresIn*1000)
                localStorage.setItem('token',response.data.idToken)
                localStorage.setItem('expirationDate',expirationDate)
                 localStorage.setItem('localId',response.data.localId)
                dispatch(AuthSuccess(response.data.localId,response.data.idToken))
                dispatch(checkTimeout(response.data.expiresIn))
            }).catch(err=> {
                // console.log(err)
                dispatch(AuthFail(err.response.data.error))
        })
    }
}

export const AuthCheckState=()=>{
    return dispatch =>{
        let token = localStorage.getItem('token')
        if(!token){
            dispatch(AuthLogout())
        }else{
            // console.log(typeof (localStorage.getItem('expirationDate')))
            let expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(new Date() <= expirationDate){
                let localId = localStorage.getItem('localId')
                dispatch(AuthSuccess(localId,token))
                dispatch(checkTimeout((expirationDate.getTime()-new Date().getTime())/1000))
            }else{
                 dispatch(AuthLogout())
            }
        }
    }
}

