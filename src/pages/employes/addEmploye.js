import * as React from 'react';
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
//import InputAdorment from "@mui/material/InputAdorment";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';



export default function AddEmploye({closeEvent}) {
  const [Nom, setNom] = useState("");
  const [NTel, setNTel] = useState("");
  const [Date, setDate] = useState("");
  const [Salaire, setSalaire] = useState("");
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "emplyees");

  const handleNomChange = (event) => {
    setNom(event.target.value);
  }
  const handleNTelChange = (event) => {
    setNTel(event.target.value);
  }
  const handleDateChange = (event) => {
    setDate(event.target.value);
  }

  const handleSalaireChange = (event) => {
    setSalaire(event.target.value);
  }

 

  const createUser = async() => {
    await addDoc(empCollectionRef, {
      Nom: Nom,
      NTel: NTel,
      Date: Date,
      Salaire: Salaire
    });
    getUsers();
    closeEvent();
    Swal.fire("Submitted!", "Your file has been Submitted.", "success");
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  return (
    <>
        <Box sx={{ m: 2}} />
        <Typography variant="h5" align="center">
            Ajouter Employe
        </Typography>
        <IconButton 
         style={{ position: "absolute", top: "0", right: "0"}}
         onClick={closeEvent}
         >
            <CloseIcon/>
        </IconButton>
        <Box height={20} />
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Nom" size="small" variant="outlined" onChange={handleNomChange} value={Nom} sx={{minWidth: "100%"}} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic"  label="Tel" type="phone" size="small" variant="outlined" onChange={handleNTelChange} value={NTel}  sx={{minWidth: "100%"}} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic"  label="" type="date"  size="small" variant="outlined" onChange={handleDateChange} value={Date}  sx={{minWidth: "100%"}} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic"  label="Salaire"  size="small" variant="outlined" onChange={handleSalaireChange} value={Salaire}  sx={{minWidth: "100%"}} />
          </Grid>
          <Grid item xs={12}>
           <Typography variant="h5" align="center">
            <Button variant="contained" onClick={createUser}>
              Submit
            </Button>
           </Typography>
          </Grid>
        </Grid>
        <Box sx={{ m: 4 }} />
    </>
  )
};
