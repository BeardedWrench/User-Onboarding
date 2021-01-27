import React from 'react';

export default function User( props ){
    const { details } = props;

    if( !details ){
        return <h3>Fetching user details...</h3>
    }

    return(
        <div>
            <h2>Name: { details.first_name + " " + details.last_name }</h2>
            <p>Email: { details.email }</p>
        </div>
    )

}