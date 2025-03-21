import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

const CATEGORIES = ['technical', 'billing', 'account', 'feature', 'dispute'];
const STATUSES = ['open', 'in_progress', 'waiting', 'resolved', 'closed'];
const PRIORITIES = ['urgent', 'high', 'medium', 'low'];
const DATE_RANGES = ['today', 'week', 'month', 'quarter'];

const TicketFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const handleChange = (field) => (event) => {
    onFilterChange({
      ...filters,
      [field]: event.target.value,
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Search Tickets"
            value={filters.searchQuery}
            onChange={handleChange('searchQuery')}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              label="Category"
              onChange={handleChange('category')}
            >
              <MenuItem value="">All</MenuItem>
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={handleChange('status')}
            >
              <MenuItem value="">All</MenuItem>
              {STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              value={filters.priority}
              label="Priority"
              onChange={handleChange('priority')}
            >
              <MenuItem value="">All</MenuItem>
              {PRIORITIES.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Date Range</InputLabel>
            <Select
              value={filters.dateRange}
              label="Date Range"
              onChange={handleChange('dateRange')}
            >
              <MenuItem value="">All Time</MenuItem>
              {DATE_RANGES.map((range) => (
                <MenuItem key={range} value={range}>
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={1}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={onClearFilters}
            size="medium"
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TicketFilters; 