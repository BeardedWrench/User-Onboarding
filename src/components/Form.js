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

        <form onSubmit={ onSubmit } >
            <h2>User Onboarding</h2>
            <label>
                Name: 
                <input type="text" name="name" value={ values.name } onChange={ onChange } />
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
            <button disabled={ disabled }>Submit</button>

            <div className="errors">
                <div>{ errors.name }</div>
                <div>{ errors.email }</div>
                <div>{ errors.password }</div>
                <div>{ errors.tos }</div>
            </div>
        </form>
    );
}