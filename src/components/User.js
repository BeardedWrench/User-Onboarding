import React from 'react';

export default function User( props ){
    const { details } = props;

    if( !details ){
        return <h3>Fetching user details...</h3>
    }

    return(
        <div className="user-card">
            <p>Name: { details.first_name + " " + details.last_name }</p>
            <p>Email: { details.email }</p>
        </div>
    )

}