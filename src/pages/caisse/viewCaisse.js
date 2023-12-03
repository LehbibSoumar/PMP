import React, { useState } from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function ViewCaisse({ closeEvent }) {
  const [invoices, setInvoices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchInvoices = async () => {
    const caiCollectionRef = collection(db, 'caisses');
    const data = await getDocs(caiCollectionRef);
    const invoiceData = data.docs.map((doc) => doc.data());
    setInvoices(invoiceData);
  };





  const generateCaisse = () => {

    const soldeBankily = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Bankily' && caisseData.Operation === 'Entrer Caisse'  && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      const filteredInvoices2 = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Bankily' && caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices - filteredInvoices2;
    }

    const soldeBimbank = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Bimbank' && caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      const filteredInvoices2 = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Bimbank' && caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices - filteredInvoices2;
    }

    const soldeBamisdiji = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Bamisdiji' && caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      const filteredInvoices2 = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Bamisdiji' && caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices - filteredInvoices2;
    }

    const soldeAmanty = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Amanty' && caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      const filteredInvoices2 = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Amanty' && caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices - filteredInvoices2;
    }

    const soldeBaridcash = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Baridcash' && caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      const filteredInvoices2 = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Baridcash' && caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices - filteredInvoices2;
    }

    const soldeClick = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Click' && caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      const filteredInvoices2 = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Click' && caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices - filteredInvoices2;
    }

    const soldeMasrivi = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Masrivi' && caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      const filteredInvoices2 = invoices
        .filter((caisseData) => {
          return (
            caisseData.TypeArgent === 'Masrivi' && caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices - filteredInvoices2;
    }

      const soldeAutres = () => {
        const filteredInvoices = invoices
          .filter((caisseData) => {
            return (
              caisseData.TypeArgent === 'Autres' && caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
            );
          })
          .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
        const filteredInvoices2 = invoices
          .filter((caisseData) => {
            return (
              caisseData.TypeArgent === 'Autres' && caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
            );
          })
          .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
        return filteredInvoices - filteredInvoices2;
      }

      const soldeSadad = () => {
        const filteredInvoices = invoices
          .filter((caisseData) => {
            return (
              caisseData.TypeArgent === 'Sadad' && caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
            );
          })
          .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
        const filteredInvoices2 = invoices
          .filter((caisseData) => {
            return (
              caisseData.TypeArgent === 'Sadad' && caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
            );
          })
          .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
        return filteredInvoices - filteredInvoices2;
      }

    //montant  total Entrer Caisse
    const totalEntrerCaisse = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices;
    }

    //montant  total Sortie Caisse
    const totalSortieCaisse = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices;
    }

    //montant  solde general selcted
    const soldeGeneral = () => {
      const filteredInvoices = invoices
        .filter((caisseData) => {
          return (
            caisseData.Operation === 'Entrer Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      const filteredInvoices2 = invoices
        .filter((caisseData) => {
          return (
            caisseData.Operation === 'Sortie Caisse' && (selectedDate === '' || caisseData.Date === selectedDate)
          );
        })
        .reduce((total, invoice) => total + (parseInt(invoice.Montant) || 0), 0);
      return filteredInvoices - filteredInvoices2;
    }



    const Caisse = () => {
      if(selectedDate === ''){
        return 'Suivi de Caisse PMP';
      }
      else{
        return `Suivi de Caisse PMP du ${selectedDate}`;
      }
    }




    const filteredInvoices = invoices
      .filter((caisseData) => {
        // Check if the caisse has subscribed on the selected date
        return (
            caisseData.Date === selectedDate  || selectedDate === ''
        );
      })

      .sort((a, b) => {
        // Sort the caisse by date
        return new Date(b.Date) - new Date(a.Date);
      });

      const caisse = Caisse();
      const soldeBankily1 = soldeBankily();
      const soldeBimbank1 = soldeBimbank();
      const soldeBamisdiji1 = soldeBamisdiji();
      const soldeAmanty1 = soldeAmanty();
      const soldeBaridcash1 = soldeBaridcash();
      const soldeClick1 = soldeClick();
      const soldeMasrivi1 = soldeMasrivi();
      const soldeAutres1 = soldeAutres();
      const soldeSadad1 = soldeSadad();
      const totalEntrerCaisse1 = totalEntrerCaisse();
      const totalSortieCaisse1 = totalSortieCaisse();
      const soldeGeneral1 = soldeGeneral();



    const factureHTML = `
      <html>
      *** code html d'un caisse contient les transaction ****
      </html>
    `;

    const factureBlob = new Blob([factureHTML], { type: 'text/html' });
    const factureUrl = URL.createObjectURL(factureBlob);

    window.open(factureUrl, '_blank');
    
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Caisse
      </Typography>
      <IconButton
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />

      <TextField
        label=""
        variant="outlined"
        type='date'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <Box sx={{ m: 2 }} />

      <Button variant="contained" onClick={fetchInvoices}>
        Charger Caisse
      </Button>
      <Box sx={{ m: 2 }} />

      {invoices.length > 0 && (
        <Button variant="contained" onClick={generateCaisse}>
          Voir Caisse
        </Button>
      )}
    </>
  );
}
