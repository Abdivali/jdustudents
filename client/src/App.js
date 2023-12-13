import React from "react";
import Students from "./components/students";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Description from "./components/description";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Students />} />
          <Route path="description" element={<Description/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;