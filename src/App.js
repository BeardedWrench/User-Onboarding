import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios'
import * as yup from 'yup';
/**
 * CUSTOM IMPORTS
 */

import Form from './components/Form';
import schema from './validation/schema';
import User from './components/User';

const initFormVal = {
  name: '',
  email: '',
  password: '',
  tos: false,
}
const initFormErrors = {
  name: '',
  email: '',
  password: '',
  tos: false,
}
const initialUsers = [];
const initialDisabled = true

function App() {
  const [ users, setUsers ] = useState( initialUsers );
  const [ formValues, setFormValues ] = useState( initFormVal );
  const [ formErrors, setFormErrors ] = useState( initFormErrors );
  const [ disabled, setDisabled ] = useState( initialDisabled );


  const fetchUsers = () =>{
    axios.get( `https://reqres.in/api/users` )
      .then( res => {
        setUsers( res.data.data ) 
      })
      .catch( err => console.log( err ) )
  }

  const addUser = newUser => {
    axios.post( `https://reqres.in/api/users`, newUser )
      .then( res => {
        setUsers( [ res.data.data, ...users ] ) 
      })
      .catch( err => console.log( err ) )
      .finally( () => setFormValues( initFormVal ) )
  }

  const inputChange =( name, value ) => {
    yup.reach( schema, name )
    .validate( value )
    .then( () =>{
      setFormErrors( {
        ...formErrors,
        [ name ]: "",
      })
    })
    .catch( err => {
      setFormErrors( {
        ...formErrors,
        [ name ]: err.errors[0],
      })
    })
    setFormValues({
      ...formValues,
      [ name ]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos,
    }
    addUser( newUser );
  }

  useEffect( () => {
    fetchUsers()
    
  }, [])

  useEffect( () => {
    schema.isValid( formValues ).then( valid => setDisabled( !valid ) )
  }, [ formValues ])

  return (
    <div className="App">
      <Form 
      values={ formValues }
      change={ inputChange }
      submit={ formSubmit }
      errors={ formErrors }
      disabled={ disabled }
      />

      {
        
        users.map( user => {
          return(
            <User details={ user } />
          )
        } )
      
     
      }
    </div>
  );
}

export default App;
