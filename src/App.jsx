
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddVendor from './components/AddVendor';
import TemporaryDrawer from './components/TemporaryDrawer';
import VendorTable from './VendorTable';
import Home from './Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemporaryDrawer />} >
          <Route path='/show-vendor' element={<VendorTable/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/add-vendor' element={<AddVendor/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
