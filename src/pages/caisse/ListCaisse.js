import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import AddCaisse from "./AddCaisse";
import EditCaisse from "./EditCaisse";
import ViewCaisse from './viewCaisse';
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






export default function ListCaisse() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const caiCollectionRef = collection(db, "caisses");
  const [open, setOpen] = useState(false);
  const [formid, setFormid] = useState("");
  const [editopen, setEditOpen] = useState(false);
  const currentUserID = auth.currentUser ? auth.currentUser.uid : null;
  const handleOpen = () => {
    if (currentUserID !== '7qavQD5gRlPkW1XbqRRPMigLe052') {
      setOpen(true);
    } else {
      console.log('Vous n\'avez pas la permission d\'ajouter un employé.');
    }
  };
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const [caisseOpen, setcaisseOpen] = useState(false);
  const rows = useAppStore((state) => state.rows);
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    getUsers();
  }, []);




  const getUsers = async () => {
    const data = await getDocs(caiCollectionRef);
    const sortedData = data.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .sort((a, b) => new Date(b.Date) - new Date(a.Date));
    setRows(sortedData);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const handlecaisseOpen = () => {
    if (currentUserID !== '7qavQD5gRlPkW1XbqRRPMigLe052') {
      setcaisseOpen(true);
    } else {
      console.log('Vous n\'avez pas la permission de voir le suivi de la caisse.');
    }
  }
  const handlecaisseClose = () => setcaisseOpen(false);



  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "caisses", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };



  const editData = (id, Operation, Montant, TypeArgent, Date, DetailsOperation) => {
    const data = {
        id: id,
        Operation: Operation,
        Montant: Montant,
        Date: Date,
        TypeArgent: TypeArgent,
        DetailsOperation: DetailsOperation
      };
      setFormid(data);
      handleEditOpen();
  };

  const calculateSoldeGeneral = () => {
    const entrees = rows
      .filter((row) => row.Operation === "Entrer Caisse")
      .reduce((total, row) => total + parseFloat(row.Montant), 0);

    const sorties = rows
      .filter((row) => row.Operation === "Sortie Caisse")
      .reduce((total, row) => total + parseFloat(row.Montant), 0);

    return entrees - sorties;
  };

  return (
    <>
     <div>
        <Modal
          open={caisseOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ViewCaisse closeEvent={handlecaisseClose} />
          </Box>
        </Modal>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddCaisse closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditCaisse closeEvent={handleEditClose} fid={formid}/>
          </Box>
        </Modal>
      </div>

      {rows.length >= 0 && (
          <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ padding: "20px" }}
              >
                CAISSES
            </Typography>
            <Divider />
            <Box height={10} />
              <Stack direction="row" spacing={2} className="my-2 mb-2">
                <Typography>
                  <strong>Solde Générale: </strong>
                  {
                  currentUserID=== '7qavQD5gRlPkW1XbqRRPMigLe052' ? '' : calculateSoldeGeneral() + ",00"
                  }
                </Typography>
              <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                ></Typography>
                <Button
                    variant="contained"
                    onClick={handlecaisseOpen}
                >
                < small size="10pt"> Suivi Caisse </small>
            </Button>
                <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                < small size="10pt"> ajouter </small>
                </Button>
              </Stack>
              <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Date
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Details Operation
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Opération
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Montant
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Type d'Argent
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Action
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(
                    page * rowsPerPage, 
                    page * rowsPerPage + rowsPerPage
                    )
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell key={row.id} align="left">
                              {
                              currentUserID=== '7qavQD5gRlPkW1XbqRRPMigLe052' ? '' : row.Date
                              }
                            </TableCell>
                            <TableCell key={row.id} align="left">
                              {
                              currentUserID=== '7qavQD5gRlPkW1XbqRRPMigLe052' ? '' : row.DetailsOperation
                              }
                            </TableCell>
                            <TableCell key={row.id} align="left">
                              {
                              currentUserID=== '7qavQD5gRlPkW1XbqRRPMigLe052' ? '' : row.Operation
                              }
                            </TableCell>
                            <TableCell key={row.id} align="left">
                              {
                              currentUserID=== '7qavQD5gRlPkW1XbqRRPMigLe052' ? '' : row.Montant
                              }
                            </TableCell>
                            <TableCell key={row.id} align="left">
                              {
                              currentUserID=== '7qavQD5gRlPkW1XbqRRPMigLe052' ? '' : row.TypeArgent
                              }
                            </TableCell>
                            <TableCell align="left">
                              <Stack spacing={2} direction="row">
                                {
                                currentUserID !== '7qavQD5gRlPkW1XbqRRPMigLe052' &&
                                <EditIcon
                                style={{
                                    fontSize: "20px",
                                    color: "blue",
                                    cursor: "pointer",
                                }}
                                className="cursor-pointer"
                                onClick={() => {
                                    editData(row.id, row.Operation, row.DetailsOperation, row.Date, row.TypeArgent, row.Montant);
                                }}
                                />
                                }
                                {
                                  currentUserID !== 'vfP330RPvFXz0e8R9oOoIFXAIX33' && currentUserID !== '7qavQD5gRlPkW1XbqRRPMigLe052' &&
                                  <DeleteIcon
                                    style={{
                                      fontSize: "20px",
                                      color: "darkred",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      deleteUser(row.id);
                                    }}
                                  />
                                }
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
            count={rows.length}
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