
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Login from './Pages/Login';
import Home from './Pages/Login/Home';
import User from './model/user.model';
import Post from "./Pages/Dashboard/Post";

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
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<Post />} />

      </Routes>
    </Router>


    
  );
  
};

export default  App;

