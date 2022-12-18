
import { Container } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom"
import "./api/axiosDefaults"
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TodoCreateForm } from './pages/todo/TodoCreateForm';
import { TodoPage } from './pages/todo/TodoPage';
import { TodosAssignedPage } from './pages/todo/TodosAssignedPage';
import { TodoEditForm } from './pages/todo/TodoEditForm';

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
        <div className="App">
        <NavBar />
          <Container className="Main">
            <Routes>
              <Route exact="true" path="/" element={<TodosAssignedPage />} />
              <Route path="/create" element={<TodoCreateForm />} />
              <Route path="/todo/:id/edit" element={<TodoEditForm />} />
              <Route path="/profile" element={<h1>Profile</h1>} />
              <Route path="/assigned" element={<h1>Assigned</h1>} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signout" element={<h1>Sign out</h1>} />
              <Route exact="true" path="/todo/:id" element={<TodoPage />} />
            </Routes>
          </Container>
        </div>
  );
}

export default App;