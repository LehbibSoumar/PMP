import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import {
  updateDoc,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';



export default function EditCaisse({ fid, closeEvent}) {
    const [Operation, setOperation] = useState("");
    const [DetailsOperation, setDetailsOperation] = useState("");
    const [Date, setDate] = useState("");
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

  useEffect(() => {
    console.log("FID: " + fid.id);
    setOperation(fid.Operation);
    setDetailsOperation(fid.DetailsOperation);
    setDate(fid.Date);
    setMontant(fid.Montant);
    setTypeArgent(fid.TypeArgent);
  }, []);

  const loadFirebaseValues = async () => {
    if (fid) {
      const userDoc = doc(db, "caisses", fid.id);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setOperation(data.Operation || '');
        setDetailsOperation(data.DetailsOperation || '');
        setDate(data.Date || '');
        setMontant(data.Montant || '');
        setTypeArgent(data.TypeArgent || '');
      }
    }
  };

  useEffect(() => {
    loadFirebaseValues();
  }, [])

  const createUser = async() => {
    const userDoc = doc(db, "caisses", fid.id);
    const newFields = {
        Operation: Operation,
        DetailsOperation: DetailsOperation,
        Date: Date,
        Montant: Montant,
        TypeArgent: TypeArgent,
    };
    await updateDoc(userDoc, newFields);
    getUsers();
    closeEvent();
    Swal.fire("Submitted!", "Your file has been Updated.", "success");
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
            Modifier Opération
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
            <TextField id="outlined-basic"  label="Details Operation" size="small" variant="outlined" onChange={handleDetailsOperationChange} value={DetailsOperation}  sx={{minWidth: "100%"}} />
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
