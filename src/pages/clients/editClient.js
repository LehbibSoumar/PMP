import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
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
import { useAppStore } from "../../appStore";
import '../Home.css'

export default function EditClient({ fid, closeEvent }) {
  const [Quartier, setQuartier] = useState("");
  const [NMaison, setNMaison] = useState("");
  const [propriétaire, setpropriétaire] = useState("");

  const [Tel, setTel] = useState("");
  const [Payement, setPayement] = useState("");
  const [Date, setDate] = useState("");
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "clients");

  useEffect(() => {
    if (fid) {
      console.log("FID: " + fid.id);
      setQuartier(fid.Quartier);
      setpropriétaire(fid.propriétaire);
      setNMaison(fid.NMaison);
      setTel(fid.Tel);
      setPayement(fid.Payement);
    }
  }, [fid]);

const loadFirebaseValues = async () => {
  if (fid) {
    const userDoc = doc(db, "clients", fid.id);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setQuartier(data.Quartier || '');
      setpropriétaire(data.propriétaire || '');
      setNMaison(data.NMaison || '');
      setTel(data.Tel || '');
      setPayement(data.Payement || '');
      setDate(data.Date || '');

    }
  }
};

useEffect(() => {
  loadFirebaseValues();
}, []);


  const handleQuartierChange = (event) => {
    setQuartier(event.target.value);
  };

  const handleNMaisonChange = (event) => {
    setNMaison(event.target.value);
  };
  const handlepropriétaireChange = (event) => {
    setpropriétaire(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  }

  const handleTelChange = (event) => {
    setTel(event.target.value);
  };

  const handlePayementChange = (event) => {
    setPayement(event.target.value);
  };

  const updateUserInFirebase = async () => {
    if (fid) {
      const userDoc = doc(db, "clients", fid.id);
      const newFields = {
        Quartier: Quartier,
        NMaison: NMaison,
        propriétaire: propriétaire,
        Tel: Tel,
        Payement: Payement,
        Date: Date
      };

      await updateDoc(userDoc, newFields);
      getUsers();
      closeEvent();

      Swal.fire({
        title: "Submitted!",
        text: "Your file has been Updated.",
        icon: "success",
        showConfirmButton: true,
        customClass: {
          container: 'swal-container',
        }
      });
    }
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const currencies = [
    {
      value: "Bankily",
      label: "Bankily",
    },
    {
      value: "Masrifi",
      label: "Masrifi",
    },
    {
      value: "Sadad",
      label: "Sadad",
    },
    {
      value: "Cashe",
      label: "Cashe",
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
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Modifier Client
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
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
            label="N°Maison"
            size="small"
            variant="outlined"
            onChange={handleNMaisonChange}
            value={NMaison}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="N°Tel"
            size="small"
            variant="outlined"
            onChange={handleTelChange}
            value={Tel}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            select
            label="Paiement"
            size="small"
            variant="outlined"
            defaultValue="Cashe"
            onChange={handlePayementChange}
            value={Payement}
            sx={{ minWidth: "100%" }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label=""
            type="date"
            size="small"
            variant="outlined"
            onChange={handleDateChange}
            value={Date}
            sx={{ minWidth: "100%" }}
          />
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
            <Button variant="contained" onClick={updateUserInFirebase}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
