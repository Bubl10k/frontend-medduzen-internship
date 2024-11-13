import { Container } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './layout/Header';

const App = () => {
  return (
    <Container maxWidth="xl">
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
    </Container>
  );
};

export default App;
