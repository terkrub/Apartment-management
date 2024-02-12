import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './Homepage';
import './index.css'
import RoomInfopage from './RoomInfopage';
import Maintainpage from './Maintainpage';
import BillPage from './BillPage';
import Loginpage from './Loginpage';
import PrivateRoute from './components/PrivateRoute';
import ChangeBranch from './ChangeBranch';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute Component={Homepage}/>}/>
      <Route path="/selectBranch" element={<PrivateRoute Component={ChangeBranch}/>}/>
      <Route path="/roomInfo" element={<PrivateRoute Component={RoomInfopage}/>}/>
      <Route path="/maintenance" element={<PrivateRoute Component={Maintainpage}/>}/>
      <Route path="/bill" element={<PrivateRoute Component={BillPage}/>}/>
      <Route path="/login" element={<Loginpage/>}/>
    </Routes>
  </BrowserRouter>
);