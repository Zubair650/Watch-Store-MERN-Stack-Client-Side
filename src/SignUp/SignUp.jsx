import React, { createContext, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
const SignUp = () => {
    const { createUser } = useContext(AuthContext)
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const photo = form.photo.value;
        console.log(name, email, password, photo);
        const from = location?.state?.from?.pathname || '/';
        setError('');
        if (!/(?=.*[A-Z])/.test(password)) {
            setError("The string must contain at least 1 uppercase alphabetical character");
            return;
        }
        if (password !== confirmPassword) {
            setError("The passwords don't match");
            return;
        }
        const newUser = {name, email, photo}
        fetch('http://localhost:5000/users',
                {
                    method:'post',
                    headers:{'content-type':'application/json'},
                    body:JSON.stringify(newUser)
                })

        createUser(email, password)
            .then(result => {
                const createdUser = result.user;
                console.log(createdUser);
                updateUserData(result.user, name);
                
                let timerInterval
                Swal.fire({
                    title: '<span style="color: brown; ">Successfully Signed Up!</span>',
                    html: 'closing in <b></b> seconds.',
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                        navigate(from, { replace: true });
                    }
                })
                
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
            })

            const updateUserData = (user, name) => {
                updateProfile(user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => console.log("Profile updated"))
                    .catch(err => console.error(err))
            }
    }
    return (
        <form onSubmit={handleRegister}>
            <p className='font-bold text-3xl mt-5'>Sign Up</p>
            <input type="text" placeholder="Name" name="name" className="input input-bordered input-info w-full max-w-xs mt-5 mb-5" /> <br></br>
            <input type="email" placeholder="E-Mail" name="email" className="input input-bordered input-info w-full max-w-xs mb-5" /> <br></br>
            <input type="password" placeholder="Password" name="password" className="input input-bordered input-info w-full max-w-xs mb-5" /><br></br>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" className="input input-bordered input-info w-full max-w-xs mb-5" /><br></br>
            <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered input-info w-full max-w-xs mb-5" /> <br></br>
            <button className="btn btn-block btn-info max-w-xs">Sign Up</button>
            <p className=' mt-3'>Already have an account? <Link to='/Login' className='text-rose-500 mt-3 font-bold'> Login</Link></p>
        </form>

    );
};

export default SignUp;