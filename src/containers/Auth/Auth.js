import React,{useState,Fragment} from "react";
import Input from "../../components/UI/input/input";
import Button from "../../components/UI/Buttons/Buttons";
import classes from './Auth.module.css'
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/auth";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router";

const Auth=(props)=>{

     const [InputState,setInputstate]=useState(
        {
            controls: {
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Enter Your Email'
                    },
                    value:''
                },
                password: {
                    elementType:'input',
                    elementConfig:{
                        type:'password',
                        placeholder:'Enter Your password'
                    },
                    value:''
                },

            }})
    const [isSignup,setisSignup] = useState(true)
    let FormElements = []
    for (let ele in InputState.controls){
        FormElements.push({
            ele:ele,
            config:InputState.controls[ele]
        })
    }
    let Form =null
    Form =FormElements.map((ele,index)=>(
        <Input key={index}
            changed={(event)=>ChangeHandler(event,ele.ele)}
            elementconfig={ele.config.elementConfig}/>
    ))



    const ChangeHandler=(event,ele)=>{
        const new_controls = {...InputState.controls}
        const new_ele_config = {...new_controls[ele]}
        new_ele_config.value = event.target.value
        new_controls[ele] = new_ele_config
        setInputstate({controls: new_controls})
    }

    const submitHandler=(event)=>{
        event.preventDefault()
        props.AuthHandler(InputState.controls.email.value,InputState.controls.password.value,isSignup)
    }

    const SwitchHandler=()=>{
        setisSignup(prevState => !prevState)
    }
    let ErrorMessage = null
    if(props.error){
         ErrorMessage = <p>{props.error.message}</p>
    }

    Form = props.spinner ? <Spinner/> : Form

    let redirectHtml = null
    if(props.token){
        let path='/'
        let sum= Object.entries(props.ig).reduce((sum,value,index)=>(
            sum=sum+value[1]
        ),0)
        if(sum != 0){
            path='/checkout'
        }
        redirectHtml = <Redirect to={path}/>

    }else{
        redirectHtml =(
                    <div className={classes.Submit}>
                        {ErrorMessage}
                       <form onSubmit={submitHandler}>
                                {Form}
                                <Button btntype='Success' >Submit</Button>

                       </form>
                        <Button clicked={SwitchHandler}
                                btntype='Danger' >SWITCH TO {isSignup ? 'SignIN': 'SignUp' }
                        </Button>
                    </div>
        )
    }
    return redirectHtml
}

const mapStateToProps=(state)=>{
    return{
        spinner:state.Auth.spinner,
        error:state.Auth.error,
        token : state.Auth.idToken,
        ig:state.BurgerBuilder.Ingredients

    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        AuthHandler:(email,password,isSignUp)=>dispatch(actionCreators.auth(email,password,isSignUp))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth)