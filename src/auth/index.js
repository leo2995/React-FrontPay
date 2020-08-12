import {API} from '../config'


export const signin = user =>{
    return   fetch(`${API}/signin`, {
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


  export const signup = user =>{
    return   fetch(`${API}/signup`, {
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

  export const authenticate =(data, next) =>{
      if(typeof window !== 'undefined'){
          localStorage.setItem('jwt', JSON.stringify(data))
          next()
      }
  }

  export const signout = (next) =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`, {
            method: "GET"
        }).then(response =>{
            console.log('signou', response)
        }).catch(err => console.log(err))
    }
  }