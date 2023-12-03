import * as React from 'react';
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';
import '../Home.css'



export default function AddCaisse({closeEvent}) {
  const [Operation, setOperation] = useState("");
  const [DetailsOperation, setDetailsOperation] = useState("");
  const [Montant, setMontant] = useState("");
  const [TypeArgent, setTypeArgent] = useState("");
  const setRows = useAppStore((state) => state.setRows);
  const caiCollectionRef = collection(db, "caisses");

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  }
  const handleDetailsOperationChange = (event) => {
    setDetailsOperation(event.target.value);
  }

  const handleMontantChange = (event) => {
    setMontant(event.target.value);
  }

  const handleTypeArgentChange = (event) => {
    setTypeArgent(event.target.value);
  }

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];

 

  const createUser = async () => {
    await addDoc(caiCollectionRef, {
      Operation: Operation,
      DetailsOperation: DetailsOperation,
      TypeArgent: TypeArgent,
      Date: currentDateString,
      Montant: Montant
    });
  
    
    setOperation("");
    setDetailsOperation("");
    setTypeArgent("");
    setMontant("");
  
    getUsers();
    Swal.fire({
      title: "Submitted !",
      text: "Your file has been Submitted.",
      icon: "success",
      showConfirmButton: true,
      customClass: {
        container: 'swal-container',
      },
      onClose: () => {
        closeEvent();
      },
    });
  };
  

  const getUsers = async () => {
    const data = await getDocs(caiCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const currencies = [
    {
      value: 'Bankily',
      label: 'Bankily',
    },
    {
      value: 'Masrivi',
      label: 'Masrivi',
    },
    {
      value: 'Sadad',
      label: 'Sadad',
    },
    {
      value: 'Bamisdiji',
      label: 'Bamisdiji',
    },
    {
      value: 'Bimbank',
      label: 'Bimbank',
    },
    {
      value: 'Baridcash',
      label: 'Baridcash',
    },
    {
      value: 'Amanty',
      label: 'Amanty',
    },
    {
      value: 'Click',
      label: 'Click',
    },
    {
      value: 'Autres',
      label: 'Autres',
    },
  ];
  
  const Operations = [
    {
      value: 'Entrer Caisse',
      label: 'Entrer Caisse',
    },
    {
      value: 'Sortie Caisse',
      label: 'Sortie Caisse',
    },
  ];


  return (
    <>
        <Box sx={{ m: 2}} />
        <Typography variant="h5" align="center">
            Ajouter Opération
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
            <TextField id="outlined-basic" select label="Opération" size="small" variant="outlined" onChange={handleOperationChange} value={Operation} sx={{minWidth: "100%"}} >
            {Operations.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
            ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic"  label="Details Operation"  size="small" variant="outlined" onChange={handleDetailsOperationChange} value={DetailsOperation}  sx={{minWidth: "100%"}} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic" type='number' label="Montant"  size="small" variant="outlined" onChange={handleMontantChange} value={Montant}  sx={{minWidth: "100%"}} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic" select label="Type Argent" size="small" variant="outlined"  onChange={handleTypeArgentChange}  value={TypeArgent}  sx={{minWidth: "100%"}} >
            {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
            ))}
            </TextField>
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
