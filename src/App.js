import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";
import Form from "./Components/Form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/form/:id" element={<Form />} />
    </Routes>
  );
}

export default App;
