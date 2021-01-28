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
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  tos: false,
}
const initFormErrors = {
  first_name: '',
  last_name: '',
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
        setUsers( [ res.data, ...users ] ) 
      })
      .catch( err => console.log( err ) )
      .finally( setFormValues( initFormVal ) )
  }

  const inputChange = ( name, value ) => {
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
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
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

      <div className="container">
        {
          users.map( user => {
            return(
              <User details={ user } />
            )
          } )
        }
      </div>
    </div>
  );
}

export default App;
