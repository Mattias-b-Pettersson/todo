
import { Container } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom"
import "./api/axiosDefaults"


function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className="Main">
        <Routes>
          <Route exact path="/" element={<h1>Home Page</h1>} />
          <Route exact path="/create" element={<h1>Create</h1>} />
          <Route exact path="/profile" element={<h1>Profile</h1>} />
          <Route exact path="/assigned" element={<h1>Assigned</h1>} />
          <Route exact path="/signin"  element={<h1>Sign in</h1>} />
          <Route exact path="/signout" element={<h1>Sign out</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;