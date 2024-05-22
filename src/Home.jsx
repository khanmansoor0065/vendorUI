import React from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const BackgroundBox = styled(Box)(({ theme }) => ({
  // backgroundImage: 'url(https://source.unsplash.com/1600x900/?business,office)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
}));

const Overlay = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(5),
  textAlign: 'center',
  width: '100%',
}));

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <BackgroundBox>
      <Overlay>
        <Container>
          <Typography variant={isSmallScreen ? 'h3' : 'h2'} gutterBottom>
            Welcome to the Vendor Management System
          </Typography>
          <Typography variant={isSmallScreen ? 'h6' : 'h5'} paragraph>
            Efficiently manage your vendors, vendor types, roles, and permissions with ease.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Link to="/add-vendor" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  <Typography variant="h6">Add Vendor</Typography>
                  <Typography>Add new vendors to your system.</Typography>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link to="/show-vendor" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'white',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    },
                  }}
                >
                  <Typography variant="h6">Show Vendors</Typography>
                  <Typography>View and manage existing vendors.</Typography>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    backgroundColor: 'success.main',
                    color: 'white',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: 'success.dark',
                    },
                  }}
                >
                  <Typography variant="h6">Vendor Types</Typography>
                  <Typography>Manage the types of vendors.</Typography>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    backgroundColor: 'info.main',
                    color: 'white',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: 'info.dark',
                    },
                  }}
                >
                  <Typography variant="h6">Roles</Typography>
                  <Typography>Manage user roles and permissions.</Typography>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    backgroundColor: 'warning.main',
                    color: 'white',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: 'warning.dark',
                    },
                  }}
                >
                  <Typography variant="h6">Permissions</Typography>
                  <Typography>Configure access permissions.</Typography>
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Overlay>
    </BackgroundBox>
  );
};

export default Home;
