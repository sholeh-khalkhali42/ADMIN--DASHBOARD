import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './authSlice';
import { useNavigate } from 'react-router-dom';
import Products from '../products/Products'; 
import Navbar from '../../component/Navbar';


const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
   <>
<Navbar/>
<Products />
 
   </>
     

  );
};


export default Dashboard;

