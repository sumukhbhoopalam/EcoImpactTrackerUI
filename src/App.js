import React, { useState, useEffect } from 'react';
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
  Autocomplete,
  Tabs,
  Tab,
  Card,
  CardContent,
  Rating
} from '@mui/material';
import api from './services/api';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ padding: '20px 0' }}>
      {value === index && children}
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [categoryStats, setCategoryStats] = useState([]);
  const [topEcoProducts, setTopEcoProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandImpact, setBrandImpact] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [productsData, categoryData, ecoProductsData] = await Promise.all([
          api.getAllProducts(),
          api.getCategoryImpactStats(),
          api.getTopEcoFriendlyProducts()
        ]);
        setProducts(productsData);
        setCategoryStats(categoryData);
        setTopEcoProducts(ecoProductsData);
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Error loading data. Please refresh the page.');
      }
    };
    loadInitialData();
  }, []);

  const handleSearch = async (productName) => {
    if (!productName) return;

    setLoading(true);
    setError(null);
    try {
      const result = await api.searchProduct(productName);
      setProductData(result);
    } catch (err) {
      setError('Error searching for product. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandSelect = async (brand) => {
    if (!brand) return;
    try {
      const impact = await api.getBrandImpact(brand);
      setBrandImpact(impact);
    } catch (err) {
      console.error('Error fetching brand impact:', err);
      setError('Error fetching brand impact. Please try again.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Eco Impact Tracker
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Autocomplete
                id="product-search"
                options={products}
                getOptionLabel={(option) => 
                  typeof option === 'string' ? option : `${option.productName} - ${option.brand}`
                }
                inputValue={searchQuery}
                onInputChange={(event, newInputValue) => {
                  setSearchQuery(newInputValue);
                }}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSearchQuery(newValue.productName);
                    handleSearch(newValue.productName);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Search by product name or brand"
                    variant="outlined"
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box>
                      <Typography>
                        {option.productName} - {option.brand}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.category}
                      </Typography>
                    </Box>
                  </li>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleSearch(searchQuery)}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
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

        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 2 }}>
          <Tab label="Search Results" />
          <Tab label="Categories" />
          <Tab label="Brands" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {productData && (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    Product Details
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Name:</strong> {productData.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Brand:</strong> {productData.brand}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Category:</strong> {productData.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Environmental Impact
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Carbon Footprint:</strong> {productData.carbonKg} kg CO₂
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Water Usage:</strong> {productData.waterLiters} liters
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Waste Generated:</strong> {productData.wasteKg} kg
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" color="primary">
                      <strong>Eco Impact Score:</strong> {productData.ecoImpactScore}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {categoryStats.map((category) => (
              <Grid item xs={12} md={4} key={category.category}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {category.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Carbon: {category.avgCarbonKg.toFixed(2)} kg
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Water: {category.avgWaterLiters.toFixed(2)} L
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Waste: {category.avgWasteKg.toFixed(2)} kg
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Select Brand
                </Typography>
                <Autocomplete
                  id="brand-select"
                  options={[...new Set(products.map(p => p.brand))]}
                  renderInput={(params) => (
                    <TextField {...params} label="Brand" variant="outlined" />
                  )}
                  onChange={(event, newValue) => {
                    setSelectedBrand(newValue);
                    handleBrandSelect(newValue);
                  }}
                />
              </Paper>
            </Grid>

            {brandImpact && (
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Brand Impact Analysis
                  </Typography>
                  <Typography variant="body1">
                    <strong>Total Carbon:</strong> {brandImpact.totalCarbonKg.toFixed(2)} kg
                  </Typography>
                  <Typography variant="body1">
                    <strong>Total Water:</strong> {brandImpact.totalWaterLiters.toFixed(2)} L
                  </Typography>
                  <Typography variant="body1">
                    <strong>Total Waste:</strong> {brandImpact.totalWasteKg.toFixed(2)} kg
                  </Typography>
                  <Typography variant="body1">
                    <strong>Products:</strong> {brandImpact.productCount}
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </TabPanel>

       
      </Box>
    </Container>
  );
}

export default App; 