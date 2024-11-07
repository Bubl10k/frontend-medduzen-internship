import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { FormControl, IconButton, Select } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../services/auth.service';
import { logout } from '../store/auth/auth.slice';
import { fetchUserById, selectUserById } from '../store/users/users.slice';

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const currentUser = useSelector(state => state.auth.currentUserId);
  const user = useSelector(selectUserById);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserById(currentUser));
    }
  }, [dispatch, currentUser]);

  const handleChangeLanguage = lang => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logout());
    localStorage.removeItem('authTokens');
    setAnchorElUser(null);
    navigate('/login');
  };

  const pages = [
    { name: t('header.listUsers'), link: '/users' },
    { name: t('header.companyList'), link: '/companies' },
    { name: t('header.about'), link: '/about' },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                marginRight: '50px',
              }}
            >
              Quiz App
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Button
                component={Link}
                to={page.link}
                key={page.name}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <FormControl
            sx={{ minWidth: 120, marginLeft: 'auto', marginRight: 2 }}
          >
            <Select
              onChange={e => handleChangeLanguage(e.target.value)}
              displayEmpty
              sx={{ color: 'white', borderColor: 'white' }}
              value={i18n.language}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ua">Ukrainian</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && user && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.username}
                      src={user.image_path || '/static/images/avatar/2.jpg'}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => setAnchorElUser(null)}>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                      variant="a"
                      component={Link}
                      to={`/users/${user.id}`}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center' }}>
                      {t('header.logout')}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
