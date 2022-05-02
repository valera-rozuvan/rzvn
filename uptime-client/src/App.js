import { Routes, Route } from 'react-router-dom';

import Box from '@mui/material/Box';

import Wrapper from './components/Wrapper';
import WrapperNoMargin from './components/WrapperNoMargin';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';
import Footer from './components/Footer';
import ResourcesList from './components/ResourcesList';
import Resource from './components/Resource';
import NewResource from './components/NewResource';
import EditResource from './components/EditResource';
import NoMatch from './components/NoMatch';

import './App.css';

function App() {
  return (
    <WrapperNoMargin height={'100%'}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flexGrow: 0, flexShrink: 0 }}>
          <Header />
        </Box>
        <Box sx={{ flexGrow: 1, flexShrink: 0 }}>
          <Wrapper disableGutters={false} maxWidth={'lg'}>
            <Routes>
              <Route path='/'>
                <Route index element={<Home />} />

                <Route path='login' element={<Login />} />
                <Route path='logout' element={<Logout />} />
                <Route path='resources'>
                  <Route index element={<ResourcesList />} />

                  <Route path='new' element={<NewResource />} />
                  <Route path='edit'>
                    <Route index element={<NoMatch />} />

                    <Route path=':id' element={<EditResource />} />
                  </Route>

                  <Route path=':id' element={<Resource />} />
                </Route>

                <Route path='*' element={<NoMatch />} />
              </Route>
            </Routes>
          </Wrapper>
        </Box>
        <Box sx={{ flexGrow: 0, flexShrink: 0 }}>
          <Footer />
        </Box>
      </Box>
    </WrapperNoMargin>
  );
}

export default App;
