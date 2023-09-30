// import React from 'react';

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useOrders from "../hooks/useOrders";
// import useOrders from "../hooks/useOrders";
// import MyOrders, { orderContext } from "../MyOrders/MyOrders";

const Header = () => {
    const [isAdmin] = useAdmin();
    const [orderedWatches] = useOrders();
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut()
            .then()
            .catch(err => console.error(err))
    }
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        // setData('http://localhost:5000/watches');
        // setFilteredData('http://localhost:5000/watches');
        fetch('http://localhost:5000/watches')
            .then(res => res.json())
            .then(data => setData(data))
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
    
        const filteredResults = data.filter((item) =>
          item.brand.toLowerCase().includes(searchTerm)
        );
        setFilteredData(filteredResults);
    };
    // const orderedWatches = useOrders();
    return (
        <div>
            <div className="navbar bg-slate-300">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl font-bold text-slate-800" href="/">Watch Store</a>
                </div>
                <div className="me-5">
                    <p className="text-slate-900 font-bold">Ordered Watches: {orderedWatches.length}</p>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered" onChange={handleSearch} />

                    </div>
                    <div className="dropdown dropdown-end">

                        {user ? <><label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"} />
                            </div>
                        </label>

                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><Link to='/MyOrders'>My Orders</Link></li>
                                {isAdmin ?
                                    <><li><Link to='AddWatch'>Add a Watch</Link></li>
                                        <li><Link to='AllUsers'>All Users</Link>
                                        </li></>
                                    : ""}
                                <li><a onClick={handleLogout}>Logout</a></li>
                            </ul> </>
                            : <><label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"} />
                                </div>
                            </label>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link to='/Login'>Login</Link>
                                    </li>

                                </ul>
                            </>}
                    </div>
                </div>
            </div>
            <div style={{position: 'absolute', top: '100px', right:'270px', zIndex:'1', backgroundColor:'rgb(204, 204, 255)', color:'black'}}>
            <ul >
                {searchTerm && filteredData.length > 0 ? (
                    filteredData.map((item) => <li key={item._id} style={{borderBottom: '2px solid black', padding:'10px 25px'}}>{item.brand}</li>)
                ) : ""}
            </ul>
            </div>
        </div>
    ) 
};

export default Header;