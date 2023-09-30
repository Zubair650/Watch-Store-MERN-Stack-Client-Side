import React, { useContext, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import useWatches from '../hooks/useWatches';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const AllWatches = () => {

    const { user } = useContext(AuthContext);
    const [watches] = useWatches();
    const HandleCart = (watch) => {
        if (user && user.email) {
            const orderItem = { id: watch.id, brand: watch.brand, price: watch.price, photo: watch.photo, email: user.email }
            fetch('http://localhost:5000/orderWatch',
                {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(orderItem)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Ordered Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
    }

    
    return (
        <div>
            <p className='pt-3 text-2xl font-bold'>Number of watches: {watches.length}</p>
            <div className='grid grid-cols-3 ms-4 mt-5'>

                {watches.map(watch =>
                    <div key={watch._id} className="card card-compact w-96 bg-slate-300 shadow-xl mb-4">
                        <img src={watch.photo} style={{ height: '270px', width: '100%' }} alt="watches" />
                        <div className="card-body">
                            <h2 className="card-title text-slate-800 font-bold">{watch.brand}</h2>
                            <p className='text-left text-lg text-slate-600 font-semibold'>Price: {watch.price} BDT</p>
                            {user ? <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={()=>HandleCart(watch)}>Buy Now</button>
                            </div>: <p className="card-actions justify-start text-blue-800 font-bold">Login to order</p>}
                        </div>
                    </div>
                )}
            </div></div>

    );
};

export default AllWatches;