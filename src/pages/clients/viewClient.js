import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import logoImage from './img/logo.jpg';

const getImageBase64 = (img) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  return canvas.toDataURL('image/jpeg');
};


export default function ViewClient({ clientData, closeEvent }) {
  const generateFacture = () => {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // +1 car les mois vont de 0 à 11
    const year = currentDate.getFullYear().toString().slice(-2); // Obtient les deux derniers chiffres de l'année
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${month}/${year}`;
    const img = new Image();
    img.src = logoImage;
    img.onload = () => {
      const logoBase64 = getImageBase64(img);
    const factureHTML = `
      <html>
        
       *** code facture en html pour un client selectionner ***
      </html>
    `;

    const factureWindow = window.open('', '_blank');
    factureWindow.document.open();
    factureWindow.document.write(factureHTML);
    factureWindow.document.close();

    factureWindow.print();
    factureWindow.close();
  };
  };
  


  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Voir Client
      </Typography>
      <IconButton
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Typography variant="h6">Quartier: {clientData.Quartier}</Typography>
      <Typography variant="h6">NMaison: {clientData.NMaison}</Typography>
      <Typography variant="h6">Tel: {clientData.Tel}</Typography>
      <Typography variant="h6">Paiement: {clientData.Payement}</Typography>
      <Typography variant="h6">Propriétaire: {clientData.propriétaire}</Typography>
      <Typography variant="h6">Absent: {clientData.Pointage.Absent}</Typography>
      <Typography variant="h6">Date d'Abonnement: {clientData.Date}</Typography>
      <Box sx={{ m: 2 }} />

      <Button variant="contained" onClick={generateFacture}>
        Imprimer Facture
      </Button>
    </>
  );
}
