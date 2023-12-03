import React, { useState, useEffect } from 'react';
import { Typography, Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {auth} from "../../firebase-config"

export default function ViewEmploye({ employeData, closeEvent }) {
  const [currentUserID, setCurrentUserID] = useState(null);

  useEffect(() => {
    // Récupérez l'ID de l'utilisateur actuellement authentifié
    const fetchCurrentUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setCurrentUserID(user.uid);
        } else {
          setCurrentUserID(null);
        }
      } catch (error) {
        setCurrentUserID(null);
        console.error("Erreur lors de la récupération de l'utilisateur actuel:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Voir Employe
      </Typography>
      <IconButton
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Typography variant="h6">Nom: {employeData.Nom}</Typography>
      <Typography variant="h6">N°Tel: {employeData.NTel}</Typography>
      <Typography variant="h6">Date d'Abonnement: {employeData.Date}</Typography>
      <Typography variant="h6"> Salaire: {currentUserID === '7qavQD5gRlPkW1XbqRRPMigLe052' ? '' : employeData.Salaire}</Typography>
      <Box sx={{ m: 2 }} />

    </>
  );
}
