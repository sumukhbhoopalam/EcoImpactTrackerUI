import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EcoIcon from '@mui/icons-material/Eco';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function TestIcons() {
  return (
    <Box>
      <Typography variant="h6">Testing Icons</Typography>
      <SearchIcon />
      <EcoIcon />
      <CategoryIcon />
      <BusinessIcon />
      <HistoryIcon />
      <TrendingUpIcon />
    </Box>
  );
}

export default TestIcons; 