'use client';

import { createUrl } from '@/routing/routing-utils';
import { Box, Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useRouter, useSearchParams } from 'next/navigation';
import { OrderBy } from './types';

const MIN_CHARS_SEARCH = 2

export function GameSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const orderBy = searchParams.get('orderBy') ?? '';

  const handleSearchChange = (event: { target: { value: string; }; }) => {
    const keyword = event.target.value;
    if (keyword.length >= MIN_CHARS_SEARCH || keyword.length === 0) {
      router.push(
        createUrl('/games', new URLSearchParams({ keyword, orderBy })),
      );
    }
  };

  const handleSortByChange = (event: { target: { value: string; }; }) => {
    const orderBy = event.target.value;
    router.push(
      createUrl('/games', new URLSearchParams({ keyword, orderBy })),
    );
  };

  return (
    <search>
      <Grid container spacing={2} columns={30} display="flex" justifyContent="space-between" >
        <Grid item xs={30} sm={10} md={6} display="flex" justifyContent="flex-start" >
          <TextField
            autoFocus
            fullWidth
            id="standard-basic"
            label="Enter keyword to search"
            variant="standard"
            onChange={handleSearchChange}
            defaultValue={keyword} />
        </Grid>
        <Box sx={{
          display: { sm: 'block', xs: 'none' }
        }}><Grid item xs={1} sm={10} md={18}></Grid></Box>
        <Grid item xs={30} sm={10} md={6} display="flex" justifyContent="flex-end">
          <TextField
            select
            fullWidth
            label="Sort by"
            defaultValue={orderBy === '' ? OrderBy.DateAdded : orderBy } // TODO: should be synced with API defaults
            variant="standard"
            onChange={handleSortByChange}
          >
            {[
              {
                value: OrderBy.Released,
                label: 'Release date',
              },
              {
                value: OrderBy.DateAdded,
                label: 'Latest added',
              }
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </search>
  );
}
