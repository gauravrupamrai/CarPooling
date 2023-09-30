import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import Home from "./Home";
import Customer from "./Customer";
import Driver from "./Driver";

function App() {
  return (
    <div className="bg-white">
      <BrowserRouter>
      <div className="header">
        <NavLink exact activeclassname="active" to="/">Home</NavLink>
        <NavLink activeclassname="active" to="/driver">Driver</NavLink>
        <NavLink activeclassname="active" to="/customer">Customer</NavLink>
      </div>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/driver" element={<Driver />}/>
          <Route path="/customer" element={<Customer />}/>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
