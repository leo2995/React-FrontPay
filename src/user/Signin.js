import React from 'react'
import Layout from '../core/Layout'
import {Link, Redirect} from 'react-router-dom'
import { useState } from 'react'
import { signin, authenticate } from '../auth'


const Signin =()=>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading : false,
        redirectToReferrer: false,

    })

    const {email, password, loading, error, redirectToReferrer} = values

    const handlChange = name => event =>{
        setValues({...values, error: false, [name]:event.target.value})
    }

   

    const clickSubmit = (event)=>{
        event.preventDefault()
        setValues({...values, error:false, loading: true})
        signin({ email, password})
        .then(data =>{
            if(data.error){
                setValues({ ...values, error: data.error, loading: false})
            }else{
                authenticate( data, () => {
                    setValues({
                        ...values,
                       redirectToReferrer: true
                    })
                })
            }
        })
    }

    const signUpForm = ()=>(
        <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handlChange('email')} type='email' className='form-control'/>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handlChange('password')} type='password' className='form-control'/>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>
                submit
            </button>
        </form>
    )

    const ShowError = ()=>(
            <div className='alert alert-danger' style={{display : error? '': 'none'}}>
                {error}
            </div>
    )


    const ShowLoading = ()=>(
        loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>)
    )
    const redirectUser =()=>{
        if(redirectToReferrer){
            return <Redirect to="/" />
        }
    }

    return(
    <Layout title='Signin' description='Signin'
     className='container col-md-8 offset-md-2'>
        {ShowLoading()}
        {ShowError()}
        {signUpForm()}
        {redirectUser()}
    </Layout>
    )
}

export default Signin;