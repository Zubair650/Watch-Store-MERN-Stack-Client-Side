import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';

const AllUsers = () => {

    const { data: users = [], refetch } = useQuery(['users'], 
    async () => {
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })

    const HandleMakeAdmin = (user) =>
    {
        fetch(`http://localhost:5000/users/${user._id}`,
        {
            method:'PATCH'
        })
        .then(res=> res.json())
        .then(data=>
            {
                console.log(data);
                if(data.modifiedCount)
                {
                    Swal.fire({
                        icon: 'success',
                        title: `${user.name} is Admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    }) 
                    refetch();
                }
            })

    }
    return (
        <div className='m-5'>
            <h2 className='text-2xl'>All Users</h2>
            <p>Number of users: {users.length}</p>
            <div style={{marginLeft:'250px', marginTop:'30px'}}>
                <table className="table" style={{width:'700px'}}>
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                            <th>&nbsp;&nbsp;Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            users.map(
                            u=><tr key={u._id}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={u.photo} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                   
                                </div>
                            </td>
                            <td>
                            {u.name}
                                <br />
                                
                            </td>
                            <td></td>
                            <th>{
                                u.role === 'admin'? <span> &nbsp;&nbsp;ADMIN</span>:
                                <button className="btn btn-ghost btn-xs " style={{color:'red'}} onClick={()=> HandleMakeAdmin(u)}>Make Admin</button>}
                            </th>
                        </tr>)}
                       
                    </tbody>
                   

                </table>
            </div>
        </div>
    );
};

export default AllUsers;