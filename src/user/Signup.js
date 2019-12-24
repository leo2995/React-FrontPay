import React from 'react'
import Layout from '../core/Layout'
import { useState } from 'react'
import {API} from '../config'


const Signup =()=>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success : false
    })

    const {name, email, password} = values

    const handlChange = name => event =>{
        setValues({...values, error: false, [name]:event.target.value})
    }

    const signup = user =>{
        fetch(`${API}/signup`, {
            method: "post",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response =>{
            return response.json()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const clickSubmit = (event)=>{
        event.preventDefault()
        signup({name, email, password})
    }

    const signUpForm = ()=>(
        <form>
            <div className='form-group'>
                <label className='text-muted'>Names</label>
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
    return(
    <Layout title='Signung' description='Signup' className='container col-md-8 offset-md-2'>
        {signUpForm()}
        {JSON.stringify(values)}
    </Layout>
    )
}

export default Signup;