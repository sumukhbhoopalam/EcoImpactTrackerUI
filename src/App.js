import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api from './services/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  // Load products for autocomplete
  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };
    loadProducts();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);
    try {
      const result = await api.searchProduct(searchQuery);
      setProductData(result);
      //await api.saveSearchHistory(searchQuery);
    } catch (err) {
      setError('Error searching for product. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Eco Impact Tracker
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Autocomplete
                freeSolo
                options={products}
                getOptionLabel={(option) => 
                  typeof option === 'string' ? option : `${option.name} - ${option.brand}`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Search by product name or brand"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                )}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setSearchQuery(newValue);
                  } else if (newValue) {
                    setSearchQuery(newValue.name);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSearch}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {productData && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Product Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  <strong>Name:</strong> {productData.product.name}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Brand:</strong> {productData.product.brand}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Category:</strong> {productData.product.category}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Environmental Impact
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Carbon Footprint:</strong> {productData.environmentalImpact.carbonKg} kg CO₂
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Water Usage:</strong> {productData.environmentalImpact.waterLiters} liters
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Waste Generated:</strong> {productData.environmentalImpact.wasteKg} kg
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                  <strong>Eco Impact Score:</strong> {productData.ecoImpact.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App; 