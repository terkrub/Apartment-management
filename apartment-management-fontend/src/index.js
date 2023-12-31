import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './Homepage';
import './index.css'
import RoomInfopage from './RoomInfopage';
import Maintainpage from './Maintainpage';
import BillPage from './BillPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/roomInfo" element={<RoomInfopage/>}/>
      <Route path="/maintenance" element={<Maintainpage/>}/>
      <Route path="/bill" element={<BillPage/>}/>
    </Routes>
  </BrowserRouter>
);