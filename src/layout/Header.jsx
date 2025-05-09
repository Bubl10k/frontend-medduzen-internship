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
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthService from '../services/auth.service';
import { logout } from '../store/auth/auth.slice';
import { fetchUserById } from '../store/users/users.actions';
import { useDispatch, useSelector } from 'react-redux';
import TokenService from '../services/token.service';
import {
  selectCurrentUserId,
  selectIsAuthenticated,
} from '../store/auth/auth.selectors';
import ROUTES from '../utils/routes';
import { toast } from 'react-toastify';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUserId);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserById(currentUser))
        .then(action => {
          if (action.payload) {
            setUser(action.payload);
          }
        })
        .catch(error => toast.error(error));
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
    TokenService.removeTokens();
    setAnchorElUser(null);
    navigate(ROUTES.LOGIN);
  };

  const pages = [
    { name: t('header.listUsers'), link: ROUTES.USERS },
    { name: t('header.companyList'), link: ROUTES.COMPANIES },
    { name: t('header.about'), link: ROUTES.ABOUT },
  ];
  const canShowUserFeatures = isAuthenticated && user && currentUser;

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
          {canShowUserFeatures && (
            <Button
              component={Link}
              to={ROUTES.NOTIFICATIONS}
              sx={{
                mr: 2,
                color: 'white',
                display: 'block',
                textAlign: 'center',
              }}
              variant="contained"
            >
              <NotificationsIcon />
            </Button>
          )}
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
            {canShowUserFeatures && (
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
                      to={`/users/${currentUser}`}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                      variant="a"
                      component={Link}
                      to={ROUTES.INVITATIONS_USER}
                    >
                      Invitations
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                      variant="a"
                      component={Link}
                      to={ROUTES.REQUESTS_USER}
                    >
                      Requests
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
};

export default Header;
