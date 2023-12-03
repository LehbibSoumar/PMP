import React from "react"
import Sidenav from "../../components/Sidenav"
import Box from '@mui/material/Box';
import Navbar from "../../components/Navbar"
import ListEmploye from "./ListEmploye";
import '../Home.css'



export default function Employe() {
    return (
        <>
            <div className="bgcolor">
                <Navbar/>
                <Box height={70}/>
                <Box sx={{ display: 'flex' }}>
                    <Sidenav/>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <ListEmploye/>
                
                    </Box>
                </Box>
            </div>
        </>
    )
}