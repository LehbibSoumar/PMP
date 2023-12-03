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
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import AddEmploye from "./addEmploye";
import EditEmploye from "./editEmploye";
import ViewEmploye from "./viewEmploye";
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






export default function ListEmploye() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const empCollectionRef = collection(db, "emplyees");
  const [open, setOpen] = useState(false);
  const [formid, setFormid] = useState("");
  const [editopen, setEditOpen] = useState(false);
  const [viewEmployeData, setViewEmployeData] = useState(null);
  const currentUserID = auth.currentUser ? auth.currentUser.uid : null;
  const handleOpen = () => {
    if (currentUserID !== 'vfP330RPvFXz0e8R9oOoIFXAIX33' && currentUserID !== '7qavQD5gRlPkW1XbqRRPMigLe052') {
      setOpen(true);
    } else {
      console.log('Vous n\'avez pas la permission d\'ajouter un employé.');
    }
  };
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const rows = useAppStore((state) => state.rows);
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    getUsers();
  }, []);


  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter(
          (row) =>
            row.NTel.includes(searchQuery) ||
            row.Nom.toLowerCase().includes(searchQuery.toLowerCase())
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

    
  const viewUser = (employeData) => {
    setViewEmployeData(employeData);
  };

  const closeView = () => {
    setViewEmployeData(null);
  };

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
    const userDoc = doc(db, "emplyees", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };



  const editData = (id, Nom, NTel, Date, Salaire) => {
    if (currentUserID !== 'vfP330RPvFXz0e8R9oOoIFXAIX33' && currentUserID !== '7qavQD5gRlPkW1XbqRRPMigLe052') {
      const data = {
        id: id,
        Nom: Nom,
        NTel: NTel,
        Date: Date,
        Salaire: Salaire
      };
      setFormid(data);
      handleEditOpen();
    } else {
      console.log('Vous n\'avez pas la permission de modifier un employé.');
    }
  };

  return (
    <>
     <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddEmploye closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditEmploye closeEvent={handleEditClose} fid={formid}/>
          </Box>
        </Modal>
        <Modal
          open={Boolean(viewEmployeData)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <ViewEmploye employeData={viewEmployeData} closeEvent={closeView} />
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
                Employes List
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
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                ></Typography>
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
                      Nom
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      N°Tel
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Date
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Salaire
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell key={row.id} align="left">
                              {row.Nom}
                            </TableCell>
                            <TableCell key={row.id} align="left">
                              {row.NTel}
                            </TableCell>
                            <TableCell key={row.id} align="left">
                              {row.Date}
                            </TableCell>
                            <TableCell key={row.id} align="left">
                              {
                                currentUserID=== '7qavQD5gRlPkW1XbqRRPMigLe052' ? '*****' : row.Salaire 
                              }
                            </TableCell>
                            <TableCell align="left">
                              <Stack spacing={2} direction="row">
                                <VisibilityIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "blue",
                                    cursor: "pointer",
                                  }}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    viewUser(row);
                                  }}
                                  
                                />
                                { 
                                  currentUserID !== 'vfP330RPvFXz0e8R9oOoIFXAIX33' && currentUserID !== '7qavQD5gRlPkW1XbqRRPMigLe052' &&
                                  <EditIcon
                                    style={{
                                      fontSize: "20px",
                                      color: "blue",
                                      cursor: "pointer",
                                    }}
                                    className="cursor-pointer"
                                    onClick={() => {
                                      editData(row.id, row.Nom, row.NTel, row.Date, row.Salaire);
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