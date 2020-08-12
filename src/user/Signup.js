import React from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import {signup} from '../auth'


const Signup =()=>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success : false
    })

    const {name, email, password, success, error} = values

    const handlChange = name => event =>{
        setValues({...values, error: false, [name]:event.target.value})
    }

   

    const clickSubmit = (event)=>{
        event.preventDefault()
        setValues({...values, error:false})
        signup({name, email, password})
        .then(data =>{
            if(data.error){
                setValues({ ...values, error: data.error, success: false})
            }else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true 
                })
            }
        })
    }

    const signUpForm = ()=>(
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handlChange('name')} type='text' className='form-control'/>
            </div>

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


    const ShowSuccess = ()=>(
        <div className='alert alert-info' style={{display : success? '': 'none'}}>
            Nova conta criada. Faça <Link to='/signin'>Login</Link>
        </div>
    )

    return(
    <Layout title='Signung' description='Signup' className='container col-md-8 offset-md-2'>
        {ShowSuccess()}
        {ShowError()}
        {signUpForm()}
    </Layout>
    )
}

export default Signup;