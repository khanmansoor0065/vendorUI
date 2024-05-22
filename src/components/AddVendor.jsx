import React from 'react';
import { Box, Button, TextField, MenuItem, Typography, Grid, Paper } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';

const vendorTypes = ['Supplier', 'Distributor', 'Exporter'];
const roles = ['Admin', 'User', 'Viewer'];
const permissions = ['Read', 'Write', 'Execute'];

const StyledPaper = styled(Paper)(({ theme }) => ({ 
  padding: theme.spacing(4),
  margin: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  backgroundColor: '#f5f5f5',
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const FormBox = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
}));

const FormGrid = styled(Grid)(({ theme }) => ({
  container: {
    spacing: 3,
  },
  item: {
    xs: 12,
    sm: 6,
  },
}));

export default function AddVendor({ vendor, onSave }) {
  const { handleSubmit, control, reset, setValue } = useForm();

  React.useEffect(() => {
    if (vendor) {
      setValue('name', vendor.name);
      setValue('mobile', vendor.mobile);
      setValue('email', vendor.email);
      setValue('brief', vendor.brief);
      setValue('vendorType', vendor.vendorType);
      setValue('products', vendor.products);
      setValue('role', vendor.role);
      setValue('permission', vendor.permission);
    }
  }, [vendor, setValue]);

  const onSubmit = async (data) => {
    try {
      const method = vendor ? 'PUT' : 'POST';
      const url = vendor 
        ? `https://664b2416a300e8795d445f21.mockapi.io/crud/${vendor.id}`
        : 'https://664b2416a300e8795d445f21.mockapi.io/crud';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      const savedVendor = await response.json();
      console.log('Data saved successfully:', savedVendor);
      reset();
      onSave(savedVendor);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <StyledPaper>
      <FormBox component="form" onSubmit={handleSubmit(onSubmit)}>
        <HeaderTypography variant="h4">
          {vendor ? 'Edit Vendor' : 'Add Vendor'}
        </HeaderTypography>
        <FormGrid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Name" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Mobile" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Email" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="vendorType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Vendor Type" select variant="outlined" fullWidth>
                  {vendorTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="brief"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Brief" variant="outlined" multiline rows={4} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="products"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Products" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Role" select variant="outlined" fullWidth>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="permission"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Permission" select variant="outlined" fullWidth>
                  {permissions.map((permission) => (
                    <MenuItem key={permission} value={permission}>
                      {permission}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              {vendor ? 'Update ' : 'Add Vendor'}
            </Button>
          </Grid>
        </FormGrid>
      </FormBox>
    </StyledPaper>
  );
}
