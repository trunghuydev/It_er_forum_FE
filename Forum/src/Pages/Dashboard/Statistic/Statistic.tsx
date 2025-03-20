import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";



const Statistic: React.FC =() =>{
    const navigate = useNavigate();

    return(       
         <>
         <h1>WELL COME TO STATISTIC PAGE</h1>
        <SidebarMenu />





        </>
    );   
};

export default Statistic;