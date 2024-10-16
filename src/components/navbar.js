'use client'
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link href="/" passHref>
          <Typography variant="h6" component="div" sx={{ cursor: 'pointer' }}>
            <img src="/paltu_logo.svg" alt="Logo" width={150} />
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="/teachers-view" passHref>
            <Button color="inherit">Teachers View</Button>
          </Link>
          <Link href="/products/list" passHref>
            <Button color="inherit">Product List</Button>
          </Link>
          <Link href="/products/create" passHref>
            <Button color="inherit">Create Product</Button>
          </Link>
          <Link href="/products/edit" passHref>
            <Button color="inherit">Edit Product</Button>
          </Link>
          <Link href="/products/shop" passHref>
            <Button color="inherit">Product Shop</Button>
          </Link>
          <Link href="/products/details" passHref>
            <Button color="inherit">Product Details</Button>
          </Link>
          <Link href="/products/shop-details" passHref>
            <Button color="inherit">Shop Details</Button>
          </Link>
        </Box>

        <Link href="/login" passHref>
          <Button variant="outlined" color="primary">Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
