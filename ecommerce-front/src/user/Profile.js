import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser'

const Profile = ({match}) =>{
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false
  });
  const {name,email, password, error, success} = values;

  const init = (userId) =>{
    read(userId, token).then(data =>{
      if(data.error){
        setValues({
          ...values,
          error: true,
          success: false
        })
      } else {
          setValues(data);
          // let newData = data;
          // console.log(values)
          setValues({
            name: data.name,
            email: data.email,
            password: data.password,
            error: false,
            success: false

          })


      }
    })
  }

  const {token} = isAuthenticated();


  const profileUpdate = (name, email, password) => {
    return(
      <form action="
        ">
        <div className="form-group">
          <label htmlFor="" className="text-muted">Name: </label>
          <input type="text" value={name} className="form-control" onChange={handleChange('name')}/>
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">Email: </label>
          <input type="email" value={email} className="form-control" onChange={handleChange('email')}/>
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">Password: </label>
          <input type="password" value={password} className="form-control" onChange={handleChange('password')}/>
        </div>

        <button className="btn btn-primary" onClick={clickSubmit}>
           Submit
        </button>


      </form>
    )
  }

  const handleChange = param => e =>{
    setValues(
      {...values,
        error: false,
        [param]: e.target.value
      }
  )


  }

  const clickSubmit = e =>{
    e.preventDefault();
    console.log(values);
    update(match.params.userId, token, {
    name, email, password})
    .then(data=>{
      if(data.error){
        console.log(data.error)
      } else {
        console.log(data)
        updateUser(data, ()=>{
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true

          })
        })
      }
    })
  }

  const redirectUser = success =>{
    if(success){
      return <Redirect to="/"/>
    }
  }

  useEffect(()=>{
    init(match.params.userId)
  }, [])


  return(
    <Layout
      title="Update Profile"
      >
        <h2>Profile Update</h2>
        {JSON.stringify(values)}
        {profileUpdate(name, email, password)}
        {redirectUser(success)}


    </Layout>

  )

}

export default Profile
