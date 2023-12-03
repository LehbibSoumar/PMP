import React from "react"
import { useEffect, useState } from "react";
import Sidenav from "../components/Sidenav"
import Navbar from "../components/Navbar"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import './Home.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const [totalClients, setTotalClients] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const totalCorbeilles = 1000 - totalClients;
    const navigate = useNavigate();


    useEffect(() => {
        const fetchTotalClients = async () => {
            const clientsCollectionRef = collection(db, "clients");
            const clientsQuerySnapshot = await getDocs(clientsCollectionRef);
            setTotalClients(clientsQuerySnapshot.size);
        };
        
        const fetchTotalEmployees = async () => {
            const employeesCollectionRef = collection(db, "emplyees");
            const employeesQuerySnapshot = await getDocs(employeesCollectionRef);
            setTotalEmployees(employeesQuerySnapshot.size);
        };

        fetchTotalClients();
        fetchTotalEmployees();
    }, []);
    return (
        <>
        <div className="bgcolor">
            <Navbar/>
            <Box height={70}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <Stack spacing={2} direction="row">
                        <Card sx={{ minWidth: 49 + "%" , height: 150 }} className = "card1" onClick={() => navigate('/client')}>
                            <CardContent>
                                <div className="cli">
                                    <PeopleOutlineIcon/>
                                </div>
                                <Typography gutterBottom variant="h5" component="div"  className="cli">
                                {totalClients}
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                Total Clients
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 49 + "%" , height: 150 }} className = "card2">
                            <CardContent>
                                <div className="corb">
                                    <DeleteIcon/>
                                </div>
                                <Typography gutterBottom variant="h5" component="div" className="corb">
                                {totalCorbeilles}
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                Total Corbeilles
                                </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                    </Grid>
                    <Grid item xs={4}>
                    <Stack spacing={2}>
                        <Card sx={{ minWidth: 345 }}>
                            <Stack spacing={2} direction="row" className="card2">
                                <div className = "iconStyle1">
                                    <LocalShippingIcon/>
                                </div>
                               <div className = "vehicule">
                                <span className = "vehiculenb1">4</span>
                                <br/>
                                <span className = "vehiculeto1">Total Vehicules</span>
                               </div>
                            </Stack>
                        </Card>
                        <Card sx={{ minWidth: 345 }} onClick={() => navigate('/employe')}>
                            <Stack spacing={2} direction="row">
                                <div class = "iconStyle2">
                                    <SupervisedUserCircleIcon/>
                                </div>
                               <div className = "vehicule">
                                <span className = "vehiculenb2">{totalEmployees}</span>
                                <br/>
                                <span className = "vehiculeto2">Total Employes</span>
                               </div>
                            </Stack>
                        </Card>
                    </Stack>
                    </Grid>
                </Grid>
                <Box height={20}/>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Card sx={{ height: 60 + "vh" }}>
                            <CardContent>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ height: 60 + "vh" }}>
                            <CardContent>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                </Box>
            </Box>
        </div>
        </>
    )
}