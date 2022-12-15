
import { Container } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom"
import "./api/axiosDefaults"
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/")
      setCurrentUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleMount();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className="App">
        <NavBar />
          <Container className="Main">
            <Routes>
              <Route exact="true" path="/" element={<h1>Home Page</h1>} />
              <Route path="/create" element={<h1>Create</h1>} />
              <Route path="/profile" element={<h1>Profile</h1>} />
              <Route path="/assigned" element={<h1>Assigned</h1>} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signout" element={<h1>Sign out</h1>} />
            </Routes>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;