import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useOrders from '../hooks/useOrders';
import { Link, useNavigate } from 'react-router-dom';


const MyOrders = () => {

    
    // const { user, logOut, loading } = useContext(AuthContext);
    const [orderedWatches] = useOrders();

    const calculateTotalCost = () => {
        return orderedWatches.reduce((total, item) => total + parseInt(item.price), 0);
    }
   

    // const [orderedWatches, setOrders] = useState([]);
    // const navigate = useNavigate()
    // const url = `http://localhost:5000/orderWatch?email=${user?.email}`;
    // useEffect(() => {
    //     fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             authorization: `Bearer ${localStorage.getItem('access-token')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (!data.error) {
    //                 setOrders(data)
    //             }
    //             else {
    //                 logOut();
    //                 navigate('/Login')
    //             }
    //         })
    // }, [url, navigate])
    return (
        <div>
            <p className='pt-3 text-2xl'>Number of watches: {orderedWatches.length}</p>
            <p className='pt-3 text-xl'>Total Cost: <span className='font-bold'>{calculateTotalCost()} BDT</span></p>
            
            <div className='grid grid-cols-3 ms-4 mt-5'>

                {orderedWatches.map(watch =>
                    <div key={watch._id} className="card card-compact w-96 bg-slate-300 shadow-xl mb-4">
                        <img src={watch.photo} style={{ height: '270px', width: '100%' }} alt="watches" />
                        <div className="card-body">
                            <h2 className="card-title text-slate-800 font-bold">{watch.brand}</h2>
                            <p className='text-left text-lg text-slate-600 font-semibold'>Price: {watch.price} BDT</p>

                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default MyOrders;