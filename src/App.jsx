import { Container } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './layout/Header';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
    <Container maxWidth="xl">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </Container>
  );
};

export default App;
