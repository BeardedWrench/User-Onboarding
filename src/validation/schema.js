import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string()
        .required( 'Your name is required.' )
        .min( 2, 'Username must have be atleast 2 characters long.' ),

    email: yup.string()
        .email( 'Must be a valid email.' )
        .required( 'Email is required.' ),

    password: yup.string()
        .required( 'Password is required.' ),

    tos: yup.boolean()
        .required( 'You are required to accept the TOS before proceeding.' ),
})