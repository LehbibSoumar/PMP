import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import AddClient from './addClient';
import EditClient from './editClient';
import ViewClient from './viewClient';
import NoteClient from './NoteClient';
import FactureClient from './FactureClient';
import ImprimerListClient from './ImprimerListClient ';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useAppStore } from '../../appStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ListClient() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const empCollectionRef = collection(db, 'clients');
  const [open, setOpen] = useState(false);
  const [formid, setFormid] = useState('');
  const [editopen, setEditOpen] = useState(false);
  const [noteClientOpen, setNoteClientOpen] = useState(false);
  const [viewClientData, setViewClientData] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleNoteClientOpen = () => setNoteClientOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const [filterOption, setFilterOption] = useState('Tous');
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const rows = useAppStore((state) => state.rows);
  const setRows = useAppStore((state) => state.setRows);
  const [factureClientOpen, setFactureClientOpen] = useState(false);
  const [ImprimerListClientOpen, setImprimerListClientOpen] = useState(false);
  const currentUserID = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    getUsers();
    fetchPaymentOptions();
  }, []);

  useEffect(() => {
    if (filterOption === 'Tous') {
      setFilteredRows(rows);
    } else {
      setFilteredRows(rows.filter((row) => row.Payement === filterOption));
    }
  }, [filterOption, rows]);

  const handlePaymentFilterChange = (event, newValue) => {
    setFilterOption(newValue);
  };


  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter(
          (row) =>
            row.Tel.includes(searchQuery) ||
            row.Quartier.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (row.propriétaire && typeof row.propriétaire === 'string' && row.propriétaire.toLowerCase().includes(searchQuery.toLowerCase())) ||
            row.NMaison.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, rows]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewUser = (clientData) => {
    setViewClientData(clientData);
  };

  const closeView = () => {
    setViewClientData(null);
  };

  const handleFactureClientOpen = () => {
    setFactureClientOpen(true);
  };

  const handleFactureClientClose = () => {
    setFactureClientOpen(false);
  };
  const handleImprimerListClientOpen = () => {
    setImprimerListClientOpen(true);
  };

  const handleImprimerListClientClose = () => {
    setImprimerListClientOpen(false);
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, 'clients', id);
    await deleteDoc(userDoc);
    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    getUsers();
  };

  const fetchPaymentOptions = () => {
    const options = ['Bankily', 'Masrifi', 'Sadad', 'Cashe', 'Tous'];
    setPaymentOptions(options);
  };


  const editData = (id, Quartier, NMaison, propriétaire, Pointage, Tel, Payement, Date) => {
    if ( currentUserID !== '7qavQD5gRlPkW1XbqRRPMigLe052') {
    const data = {
      id: id,
      Quartier: Quartier,
      NMaison: NMaison,
      propriétaire: propriétaire,
      Absent: Pointage.Absent,
      Tel: Tel,
      Payement: Payement,
      Date: Date
    };
    setFormid(data);
    handleEditOpen();
  } else {
    console.log('Vous n\'avez pas la permission de modifier un client.');
  }
};
  const editAbsent = (id, Pointage) => {
    const data = {
      id: id,
      Absent: Pointage.Absent,
    };
    setFormid(data);
    handleNoteClientOpen();
};


  return (
    <>
      <div>
        <Modal
            open={ImprimerListClientOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ImprimerListClient closeEvent={handleImprimerListClientClose} />
            </Box>
        </Modal>
        <Modal
            open={factureClientOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <FactureClient closeEvent={handleFactureClientClose} />
            </Box>
        </Modal>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddClient closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditClient closeEvent={() => setEditOpen(false)} fid={formid} />
          </Box>
        </Modal>
        <Modal
          open={noteClientOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <NoteClient closeEvent={() => setNoteClientOpen(false)} fid={formid} />
          </Box>
        </Modal>
        <Modal
          open={Boolean(viewClientData)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ViewClient clientData={viewClientData} closeEvent={closeView} />
          </Box>
        </Modal>
      </div>

      {rows.length >= 0 && (
        <Paper sx={{ width: '98%', overflow: 'hidden', padding: '12px' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: '20px' }}
          >
            Clients List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <TextField
              size="small"
              label="Recherche.. "
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={paymentOptions}
              sx={{ width: 200 }}
              value={filterOption}
              onChange={handlePaymentFilterChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Filtrer par paiement"
                />

              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              variant="contained"
              onClick={handleImprimerListClientOpen}
            >
              < small size="10pt"> fiche Pointage </small>
            </Button>
            <Button variant="contained" endIcon={<AttachFileIcon />} onClick={handleFactureClientOpen}>
              < small size="10pt"> facture </small>
            </Button>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              < small size="10pt"> ajouter </small>
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: '100px' }}>
                    Quartier
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '100px' }}>
                    N°Maison
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '100px' }}>
                    Propriétaire
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '100px' }}>
                    N°Tel
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '100px' }}>
                    Paiement
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '100px' }}>
                    Date
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '100px' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell key={row.id} align="left">
                          {row.Quartier}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.NMaison}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.propriétaire}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.Tel}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.Payement}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.Date}
                        </TableCell>
                        
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <VisibilityIcon
                              style={{
                                fontSize: '20px',
                                color: 'blue',
                                cursor: 'pointer',
                              }}
                              className="cursor-pointer"
                              onClick={() => {
                                viewUser(row);
                              }}
                            />
                            <NoteAddIcon
                              style={{
                                fontSize: '20px',
                                color: 'darkred',
                                cursor: 'pointer',
                              }}
                              className="cursor-pointer"
                              onClick={() => {
                                editAbsent(
                                  row.id,
                                  {
                                    Absent: row.Pointage.Absent,
                                  },
                                );
                              }}
                            />
                            {
                             currentUserID !== '7qavQD5gRlPkW1XbqRRPMigLe052' &&
                            <EditIcon
                              style={{
                                fontSize: '20px',
                                color: 'blue',
                                cursor: 'pointer',
                              }}
                              className="cursor-pointer"
                              onClick={() => {
                                editData(
                                  row.id,
                                  row.Quartier,
                                  row.NMaison,
                                  {
                                    Absent: row.Pointage.Absent,
                                  },
                                  row.Tel,
                                  row.propriétaire,
                                  row.Payement,
                                  row.Date
                                );
                              }}
                            />}
                            {
                            currentUserID !== 'vfP330RPvFXz0e8R9oOoIFXAIX33' && currentUserID!== '7qavQD5gRlPkW1XbqRRPMigLe052' &&
                            <DeleteIcon
                              style={{
                                fontSize: '20px',
                                color: 'darkred',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}