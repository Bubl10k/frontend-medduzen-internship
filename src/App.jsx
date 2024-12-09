import { Container } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './layout/Header';
import { store } from './store/store';
import { Provider, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { selectAuthToken } from './store/auth/auth.slice';

const App = () => {
  const tokens = useSelector(selectAuthToken);

  useEffect(() => {
    if (tokens) {
      store.dispatch({ type: 'socket/connect' });
    }

    return () => {
      store.dispatch({ type: 'socket/disconnect' });
    };
  }, [tokens]);

  return (
    <Container maxWidth="xl">
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </Container>
  );
};

export default App;
