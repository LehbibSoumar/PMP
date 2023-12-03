import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem";
//import InputAdorment from "@mui/material/InputAdorment";
import {
  collection,
  getDocs as getDocsByQuery,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';
import '../Home.css'



export default function AddClient({closeEvent}) {
  const [Quartier, setQuartier] = useState("");
  const [NMaison, setNMaison] = useState("");
  const [propriétaire, setpropriétaire] = useState("");
  const [NMaisonPrefix, setNMaisonPrefix] = useState("");
  const [Tel, setTel] = useState("");
  const [Payement, setPayement] = useState("");
  const [Date, setDate] = useState("");
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "clients");


  const handleQuartierChange = (event) => {
    setQuartier(event.target.value);
  }
  
  const handleNMaisonPrefixChange = (event) => {
    setNMaisonPrefix(event.target.value);
  }
  const handleNMaisonChange = async (event) => {
    setNMaison(event.target.value);

  }

  const handlepropriétaireChange = (event) => {
    setpropriétaire(event.target.value);
  }

  const handleTelChange = (event) => {
    setTel(event.target.value);
  }
  const handlePayementChange = (event) => {
    setPayement(event.target.value);
  }
  const handleDateChange = (event) => {
    setDate(event.target.value);
  }

  const validateForm = () => {
    if (!Quartier || !NMaison || !propriétaire || !Tel || !Date) {
      Swal.fire({
        title: "Erreur !",
        text: "Veuillez remplir tous les champs obligatoires.",
        icon: "error",
        showConfirmButton: true, 
        customClass: {
          container: 'swal-container', 
        }
      });
      return false;
    }
    return true;
  }

  const createUser = async () => {
    if (!validateForm()) {
      return;
    }
  
    if (!NMaison) {
      Swal.fire({
        title: "Erreur !",
        text: "Veuillez entrer un numéro de maison.",
        icon: "error",
        showConfirmButton: true,
        customClass: {
          container: 'swal-container',
        }
      });
      return;
    }

    const fullNMaison = `${NMaisonPrefix} ${NMaison}`;
    const nmaisonQuery = query(
      empCollectionRef,
      where("Quartier", "==", Quartier),
      where("NMaison", "==", fullNMaison)
    );
  
    const nmaisonDocs = await getDocsByQuery(nmaisonQuery);
  
    if (!nmaisonDocs.empty) {
      Swal.fire({
        title: "Erreur !",
        text: "Ce numéro de maison est déjà attribué dans ce quartier.",
        icon: "error",
        showConfirmButton: true, 
        customClass: {
          container: 'swal-container', 
        }
      });
    } else {
      await addDoc(empCollectionRef, {
        Quartier: Quartier,
        NMaison: fullNMaison,
        propriétaire: propriétaire,
        Pointage: {
          Absent: 0,
        },
        Tel: Tel,
        Payement: Payement,
        Date: Date
      });

      setQuartier("");
      setNMaison("");
      setpropriétaire("");
      setTel("");
      setPayement("");
      setDate("");
      setNMaisonPrefix("");

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
    }
  };
  

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  const currencies = [
  {
    value: 'Bankily',
    label: 'Bankily',
  },
  {
    value: 'Masrifi',
    label: 'Masrifi',
  },
  {
    value: 'Sadad',
    label: 'Sadad',
  },
  {
    value: 'Cashe',
    label: 'Cashe',
  },
 ];

 const quartier = [
  {
    value: "TVZ1",
    label: "TVZ1",
  },
  {
    value: "TVZ2",
    label: "TVZ2",
  },
  {
    value: "TVZ3",
    label: "TVZ3",
  },
 ];

  return (
    <>
        <Box sx={{ m: 2}} />
        <Typography variant="h5" align="center">
            Ajouter Client
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
          <TextField
            id="outlined-basic"
            select
            label="Quartier"
            size="small"
            variant="outlined"
            onChange={handleQuartierChange}
            value={Quartier}
            sx={{ minWidth: "100%" }}
          >
            {quartier.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            select
            label="Secteur"
            size="small"
            variant="outlined"
            onChange={handleNMaisonPrefixChange}
            value={NMaisonPrefix}
            sx={{ minWidth: "100%" }}
          >
            {["SEC1", "SEC2", "SEC3"].map((prefix) => (
              <MenuItem key={prefix} value={prefix}>
                {prefix}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="N°Maison"
            size="small"
            variant="outlined"
            onChange={handleNMaisonChange}
            value={NMaison}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
          <Grid item xs={6}>
            <TextField id="outlined-basic"  label="N°Tel" size="small" variant="outlined" onChange={handleTelChange} value={Tel}  sx={{minWidth: "100%"}} />
          </Grid>
          <Grid item xs={6}>
            <TextField id="outlined-basic" select label="Paiement" size="small" variant="outlined" defaultValue="Cashe" onChange={handlePayementChange}  value={Payement}  sx={{minWidth: "100%"}} >
            {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
            ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic"  label="" type='date' size="small" variant="outlined" onChange={handleDateChange} value={Date}  sx={{minWidth: "100%"}} />
          </Grid>
          <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Propriétaire"
            size="small"
            variant="outlined"
            onChange={handlepropriétaireChange}
            value={propriétaire}
            sx={{ minWidth: "100%" }}
          />
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
