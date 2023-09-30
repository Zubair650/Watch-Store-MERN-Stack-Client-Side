import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = (event) =>
    {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        setError('');
        const from = location?.state?.from?.pathname || '/';
        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500
        })
        setLoading(true)
        loggedUser(email, password)
            .then(result => {
                const loggedIn = result.user;
                console.log(loggedIn);
                setError('');
                setLoading(false)
                navigate(from, {replace: true});
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
            }
            )
    }
    return (
        <form onSubmit={handleLogin}>
           <p className='font-bold text-3xl mt-10'>Login</p>
           <input type="text" placeholder="E-Mail" name='email' className="input input-bordered input-info w-full max-w-xs mt-5 mb-5" /> <br></br>
           <input type="password" placeholder="Password"  name='password' className="input input-bordered input-info w-full max-w-xs " /><br></br>
           <p className='mt-1 mb-5' style={{marginLeft:'180px'}}><Link className='text-fuchsia-600 mt-3 font-semibold' to='/SignUp'>Forgot Password? </Link></p>
           <button className="btn btn-block btn-success max-w-xs">Login</button>
           <p className=' mt-3'>Create a new account. <Link className='text-fuchsia-500 mt-3 font-bold' to='/SignUp'>Sign Up</Link></p>
        </form>
       
    );
};

export default Login;