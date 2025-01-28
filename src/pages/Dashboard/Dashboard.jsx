import React from 'react';
// import { FaBookAtlas, FaPeopleGroup, FaUtensils, FaList, FaHome, FaMoneyBill, FaUser } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { VscPreview } from "react-icons/vsc";
import useAdmin from '../../Hooks/useAdmin';
import { FaHome, FaUser } from 'react-icons/fa';


const Dashboard = () => {
    const [isAdmin] = useAdmin();

    
    return (
        <div className='flex'>
            {/* Sidebar */}
            <div className='w-64 min-h-screen bg-pink-800 text-white'>
                <ul className="menu">
                    {
                        isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminDashboard">
                                        <FaHome /> Admin Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageUsers">
                                        <FaUser /> Manage Users
                                    </NavLink>
                                </li>
                                
                                <li>
                                    <NavLink to="/dashboard/approveStatus">
                                        Approved Contact Request
                                    </NavLink>
                                </li>

                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/addData">
                                        Add Biodata
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/viewData">
                                        View Biodata
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/contact">
                                        My Contact Request
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/favourite">
                                        Favourites Biodata
                                    </NavLink>
                                </li>
                            </>
                        )
                    }
                    <div className="divider"></div>
                    <li>

                        <NavLink to="/"> <FaHome></FaHome> Home</NavLink>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className='flex-1 p-8'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
