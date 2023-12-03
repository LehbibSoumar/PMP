import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function ImprimerListClient({ closeEvent }) {
  const [quartiers, setQuartiers] = useState(["TVZ1", "TVZ2", "TVZ3"]);
  const [selectedQuartier, setSelectedQuartier] = useState('');
  const [selectedPrefixNMaison, setSelectedPrefixNMaison] = useState('');
  const [clientData, setClientData] = useState([]);
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    const empCollectionRef = collection(db, 'clients');
    const data = await getDocs(empCollectionRef);
    const clientData = data.docs.map((doc) => doc.data());
    setClientData(clientData);
  };

  useEffect(() => {
    if (selectedQuartier && selectedPrefixNMaison) {
      const lowerCasePrefixNMaison = selectedPrefixNMaison.toLowerCase();
      const filteredClients = clientData.filter((client) => {
        return client.Quartier === selectedQuartier && client.NMaison.toLowerCase().startsWith(lowerCasePrefixNMaison)
      });

      setClientCount(filteredClients.length);
    }
  }, [selectedQuartier, selectedPrefixNMaison, clientData]);

  const generateClientList = (quartier, prefixNMaison) => {
    const lowerCasePrefixNMaison = prefixNMaison.toLowerCase();
    const filteredClients = clientData.filter((client) => {
      return client.Quartier === quartier && client.NMaison.toLowerCase().startsWith(lowerCasePrefixNMaison)
    });
  
    if (filteredClients.length === 0) {
      alert('Aucun client trouvé pour le quartier et le préfixe NMaison sélectionnés.');
      return;
    }

    filteredClients.sort((a, b) => {
      const aParts = a.NMaison.split(' ');
      const bParts = b.NMaison.split(' ');
      const aNum = parseInt(aParts[1], 10);
      const bNum = parseInt(bParts[1], 10);

      if (aNum < bNum) {
        return -1;
      }
      if (aNum > bNum) {
        return 1;
      }
      return 0;
    });
    
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
    
    const clientListHTML = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>FICHE POINTAGE</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            table, th, td {
              border: 0.6px solid #000;
            }
            th, td {
              padding: 6px;
              text-align: left;
            }
            td{
              font-family: "Arial", sans-serif;
            }
          </style>
        </head>
        <body>
          <h3>Fiche de Pointage ${quartier} ${prefixNMaison} pour le ${formattedDate}</h3>
          <table>
            <thead>
              <tr>
              <th>#</th>
              <th>Quartier</th>
              <th>N&degMaison</th>
              <th>N&degTel</th>
              <th>Propri&eacutetaire</th>
              <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${filteredClients
                .map(
                  (client, index) => `
                    <tr>
                    <td>${index + 1}</td>
                    <td>${client.Quartier}</td>
                    <td>${client.NMaison}</td>
                    <td>${client.Tel}</td>
                    <td>${client.propriétaire}</td>
                    <td>${client.Date}</td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const clientListBlob = new Blob([clientListHTML], { type: 'text/html' });
    const clientListUrl = URL.createObjectURL(clientListBlob);

    const clientListWindow = window.open(clientListUrl, '_blank');
    if (clientListWindow !== null) {
      clientListWindow.onload = () => {
        clientListWindow.print();
        clientListWindow.onafterprint = () => {
          URL.revokeObjectURL(clientListUrl);
          clientListWindow.close();
        };
      };
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Fiche Pointage
      </Typography>
      <IconButton
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />

      <Typography variant="h6">Sélectionner un Quartier :</Typography>
      <select
        value={selectedQuartier}
        onChange={(e) => setSelectedQuartier(e.target.value)}
      >
        <option value="">Sélectionner un Quartier</option>
        {quartiers.map((quartier) => (
          <option key={quartier} value={quartier}>
            {quartier}
          </option>
        ))}
      </select>
      <Typography variant="h6">Sélectionner un Secteur :</Typography>
      <select
        value={selectedPrefixNMaison}
        onChange={(e) => setSelectedPrefixNMaison(e.target.value)}
      >
        <option value="">Sélectionner un Secteur</option>
        <option value="SEC1">SEC1</option>
        <option value="SEC2">SEC2</option>
        <option value="SEC3">SEC3</option>
      </select>
      <Typography variant="body1">
        {clientCount > 0 ? `Nombre de clients: ${clientCount}` : 'Sélectionnez un Quartier et Secteur'}
      </Typography>
      <Box sx={{ m: 2 }} />

      <Button
        variant="contained"
        onClick={() => generateClientList(selectedQuartier, selectedPrefixNMaison)}
        disabled={!selectedQuartier || !selectedPrefixNMaison}
      >
        Imprimer 
      </Button>
    </>
  );
}
