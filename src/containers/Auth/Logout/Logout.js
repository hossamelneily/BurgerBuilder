import React,{useEffect} from "react";
import {Redirect} from "react-router";
import * as actionCreators from "../../../store/actions/auth";
import {connect} from "react-redux";

const Logout=(props)=>{
    useEffect(()=> {
        props.LogoutHandler()
    }
    ,[])

    return <Redirect to='/'/>

}
const mapDispatchToProps=(dispatch)=>{
    return{
        LogoutHandler:()=>dispatch(actionCreators.AuthLogout())
    };
}

export default connect(null,mapDispatchToProps)(Logout)