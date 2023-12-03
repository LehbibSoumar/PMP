import React from "react"
import Sidenav from "../../components/Sidenav"
import Box from '@mui/material/Box';
import Navbar from "../../components/Navbar"
import ListClient from "./ListClient";
import '../Home.css'



export default function Client() {
    return (
        <>
            <div className="bgcolor">
                <Navbar/>
                <Box height={70}/>
                <Box sx={{ display: 'flex' }}>
                    <Sidenav/>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <ListClient/>
                
                    </Box>
                </Box>
            </div>
        </>
    )
}