import { Container } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './layout/Header';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
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
