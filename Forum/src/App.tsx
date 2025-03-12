
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Login from './Pages/Login/Login';
import Home from './Pages/Login/Home';
import User from './model/user.model';
import Post from "./Pages/Dashboard/Post";
import Report from "./Pages/Dashboard/Report";
import Comment from "./Pages/Dashboard/Comment";
import Profile from './Pages/Dashboard/Profile';
import UserList from './Pages/Dashboard/UserList';
import Logout from './Pages/Login/Logout';
import RegisterForm from './Pages/Dashboard/RegisterForm';


export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/report" element={<Report />} />
        <Route path="/commentreport" element={<Comment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterForm />} />

      </Routes>
    </Router>


    
  );
  
};

export default  App;

