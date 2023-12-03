import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function FactureClient({ closeEvent }) {
  const [invoices, setInvoices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedQuartier, setSelectedQuartier] = useState('');

  const fetchInvoices = async () => {
    const empCollectionRef = collection(db, 'clients');
    const data = await getDocs(empCollectionRef);
    const invoiceData = data.docs.map((doc) => doc.data());
    setInvoices(invoiceData);
  };


  const generateFactures = () => {
    if (!selectedDate) {
      alert('Veuillez entrer le jour d\'abonnement.');
      return;
    }
    function formatInvoiceNumber(index) {
      return (index + 1 < 10) ? `00${index + 1}` : `0${index + 1}`;
    }
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString().slice(-2); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${month}/${year}`;

    const filteredInvoices = invoices
      .filter((clientData) => {
        const subscriptionDate = new Date(clientData.Date);
        const dayOfSubscription = subscriptionDate.getDate().toString();
        const monthOfSubscription = (subscriptionDate.getMonth() + 1).toString().padStart(2, '0');
        const yearOfSubscription = subscriptionDate.getFullYear().toString().slice(-2);
        return( 
          (yearOfSubscription < year || (yearOfSubscription === year && monthOfSubscription < month)) &&
          dayOfSubscription === selectedDate &&
          (!selectedQuartier || clientData.Quartier === selectedQuartier)
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        return dateA - dateB;
      })
      .map((clientData, index) => `
        <!-----body Code Facture en html----> 
      `)
      .join('');

    if (filteredInvoices.length === 0) {
      alert('No invoices found for clients with the selected Day and Quartier');
      return;
    }

    const factureHTML = `
      <html>
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href=" https://fonts.cdnfonts.com/css/agency-fb " rel="stylesheet">
      <link href='https://fonts.googleapis.com/css?family=Quicksand' rel='stylesheet'>
      <link href="https://fonts.googleapis.com/css2?family=Calibri&display=swap" rel="stylesheet">
      <title>Facture PMP</title>
        <style>
        ******
        </style>
        </head>
        <body>
          ${filteredInvoices}
        </body>
      </html>
    `;

    const factureBlob = new Blob([factureHTML], { type: 'text/html' });
    const factureUrl = URL.createObjectURL(factureBlob);

    const factureWindow = window.open(factureUrl, '_blank');
    if (factureWindow !== null) {
      factureWindow.onload = () => {
        factureWindow.print();
        factureWindow.onafterprint = () => {
          URL.revokeObjectURL(factureUrl);
          factureWindow.close();
        };
      };
    }
  };

  


  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  
  

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Facture Client
      </Typography>
      <IconButton
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Typography variant="h7">Selectionner le jour d'abonnement :</Typography>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        <option value="">Sélectionner le jour d'abonnement </option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <Box sx={{ m: 1 }} />
      <Typography variant="h7">Selection quartier optionnelle :</Typography>
      <select
        value={selectedQuartier}
        onChange={(e) => setSelectedQuartier(e.target.value)}
      >
        <option value="">Sélectionner un Quartier</option>
        <option value="TVZ1">TVZ1</option>
        <option value="TVZ2">TVZ2</option>
        <option value="TVZ3">TVZ3</option>
      </select>      
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
      <Button variant="contained" onClick={fetchInvoices} >
        Charger 
      </Button>
      </Typography>
      <Box sx={{ m: 2 }} />

      {invoices.length > 0 && (
        <Button variant="contained" onClick={generateFactures}>
          Print Factures
        </Button>
      )}
    </>
  );
}
