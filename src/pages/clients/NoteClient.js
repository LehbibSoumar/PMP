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

export default function NoteClient({ fid, closeEvent }) {
    const [Absent, setAbsent] = useState(0);
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "clients");
    const [absenceDates, setAbsenceDates] = useState([]); 
    
  useEffect(() => {
    if (fid) {
      loadFirebaseValues();
    }
  }, [fid]);
    
  const loadFirebaseValues = async () => {
    if (fid) {
      const userDoc = doc(db, "clients", fid.id);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAbsent(data.Pointage ? data.Pointage.Absent || 0 : 0);
        setAbsenceDates(data.Pointage ? data.Pointage.absenceDates || [] : []);
      }
    }
  };

  const handleAbsentChange = (event) => {
    setAbsent(event.target.value);
  };
    
  const updateAbsentInFirebase = async () => {
    if (fid) {
      const userDoc = doc(db, "clients", fid.id);
      const newFields = {
        Pointage: {
          Absent: Absent,
          absenceDates: absenceDates, 
        },
      };
      await updateDoc(userDoc, newFields);
    getUsers();
    closeEvent();
    Swal.fire({
      title: "Soumis !",
      text: "L'absence a été mise à jour.",
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


  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Note Absence
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
                label="Absent"
                type="number"
                size="small"
                variant="outlined"
                onChange={handleAbsentChange}
                value={Absent}
                sx={{ minWidth: "100%" }}
            />
            </Grid>

            <Grid item xs={12}>
            <Typography variant="h5" align="center">
                <Button variant="contained" onClick={updateAbsentInFirebase}>
                Submit
                </Button>
            </Typography>
            </Grid>
       </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}