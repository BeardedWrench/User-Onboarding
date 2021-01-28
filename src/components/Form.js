import React from 'react';

export default function Form( props ){
    const { values, submit, change, disabled, errors } = props;
    
    const onSubmit = event => {
        event.preventDefault();
        submit();
    }

    const onChange = event => {
        const { name, value, type, checked } = event.target;

        change( name, type === 'checkbox' ? checked : value );
    }

    return(

        <form onSubmit={ onSubmit } className="info-form">
            <h2>User Onboarding</h2>
            <label>
                First Name: 
                <input type="text" name="first_name" value={ values.first_name } onChange={ onChange } />
            </label>
            <label>
                Last Name: 
                <input type="text" name="last_name" value={ values.last_name } onChange={ onChange } />
            </label>
            <label>
                Email: 
                <input type="text" name="email" value={ values.email } onChange={ onChange } />
            </label>
            <label>
                Password: 
                <input type="password" name="password" value={ values.password } onChange={ onChange } />
            </label>
            <label>
                Terms of Service:
                <input type="checkbox" name="tos" value={ values.tos } onChange={ onChange } />
            </label>
            <button disabled={ disabled } id="submitButton">Submit</button>

            <div className="errors">
                <div>{ errors.first_name }</div>
                <div>{ errors.last_name }</div>
                <div>{ errors.email }</div>
                <div>{ errors.password }</div>
                <div>{ errors.tos }</div>
            </div>
        </form>
    );
}