import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleCloseUserMenu();
  };

  const pages = isAuthenticated ? [
    { title: 'Dashboard', path: '/' },
    { title: 'My Letters', path: '/letters' },
    { title: 'New Letter', path: '/letters/new' },
    { title: 'Subscription', path: '/subscription/plans' },
    { title: 'Credit Services', path: '/affiliates' }
  ] : [];

  const settings = isAuthenticated ? [
    { title: 'Profile', action: () => { navigate('/profile'); handleCloseUserMenu(); } },
    { title: 'Subscription', action: () => { navigate('/subscription/status'); handleCloseUserMenu(); } },
    { title: 'Logout', action: handleLogout }
  ] : [];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CrediSure
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {isAuthenticated && (
              <>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.title} onClick={() => { navigate(page.path); handleCloseNavMenu(); }}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CrediSure
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* User menu or login/register buttons */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={currentUser?.firstName} src="/static/images/avatar/2.jpg" />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.title} onClick={setting.action}>
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                <Button color="inherit" component={RouterLink} to="/register">Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
