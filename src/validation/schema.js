import * as yup from 'yup';

export default yup.object().shape({
    first_name: yup.string()
        .required( 'Your first name is required.' ),
        
    last_name: yup.string()
        .required( 'Your last name is required.' ),

    email: yup.string()
        .email( 'Must be a valid email.' )
        .required( 'Email is required.' ),

    password: yup.string()
        .required( 'Password is required.' ),

    tos: yup.boolean()
        .required( 'You are required to accept the TOS before proceeding.' ),
})