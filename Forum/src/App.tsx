
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


export const App: React.FC = () => {
  


//  let arrUser: User[] = [];

//  const [user, setUser] = useState<User[]>([]);


//   useEffect( () => {
//     // Thay localhost bằng địa chỉ IP của máy chủ
//     const fetchData = async () => {  
//       try {  
//         const response = await fetch('http://10.11.77.106:3000/api/v1/user');  
//         const result = await response.json();  
//         arrUser.push(result)
//         console.log(arrUser);
        
//       } catch (error) {  
//         console.error('Error fetching data:', error);  
//       }  };

//       fetchData();  // Call the function immediately after rendering
      
    
//   }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/report" element={<Report />} />
        <Route path="/commentreport" element={<Comment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </Router>


    
  );
  
};

export default  App;

