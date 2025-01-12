import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#112240' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          slow is smooth && smooth is fast
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{ '&:hover': { backgroundColor: '#1a365d' } }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/add"
            color="inherit"
            sx={{ '&:hover': { backgroundColor: '#1a365d' } }}
          >
            Add Product
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
