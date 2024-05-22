import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TablePagination,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddVendor from './components/AddVendor';
import CloseIcon from '@mui/icons-material/Close';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.common.white,
  backgroundColor: '#665D1E',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const VendorTable = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVendor, setEditingVendor] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://664b2416a300e8795d445f21.mockapi.io/crud');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://664b2416a300e8795d445f21.mockapi.io/crud/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setVendors(vendors.filter((vendor) => vendor.id !== id));
    } catch (error) {
      console.error('Failed to delete vendor:', error);
    }
  };

  const handleSave = (updatedVendor) => {
    setVendors(vendors.map((vendor) => (vendor.id === updatedVendor.id ? updatedVendor : vendor)));
    setIsEditDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {/* <Typography variant={isSmallScreen ? 'h5' : 'h6'} sx={{ textAlign: 'center', mb: 3, color: 'primary.main' }}>
        Vendor Table
      </Typography> */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Brief</StyledTableCell>
              <StyledTableCell>Vendor Type</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Permission</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vendor) => (
                <StyledTableRow key={vendor.id}>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.mobile}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.brief}</TableCell>
                  <TableCell>{vendor.vendorType}</TableCell>
                  <TableCell>{vendor.products}</TableCell>
                  <TableCell>{vendor.role}</TableCell>
                  <TableCell>{vendor.permission}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(vendor)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(vendor.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 8, 16, 24]}
        component="div"
        count={vendors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mb: 3, mx: 'auto' }} // Center pagination and add margin bottom
      />
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitleStyled>Edit Vendor</DialogTitleStyled>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={() => setIsEditDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <AddVendor vendor={editingVendor} onSave={handleSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VendorTable;
