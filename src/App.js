
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
import { TodoEditForm } from './pages/todo/TodoEditForm';
import { ProfilePage } from './pages/profiles/ProfilePage';
import { TodosPage } from './pages/todo/TodosPage';
import { NotFound } from './pages/NotFound';
import UserPasswordForm from './pages/profiles/userPassworForm';
import ProfileEditForm from './pages/profiles/ProfileEditForm';

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
              <Route exact="true" path="/" element={<TodosPage />} />
              <Route exact="true" path='/profiles/:id' element={<ProfilePage />} />
              <Route exact="true" path="/create" element={<TodoCreateForm />} />
              <Route exact="true" path="/todo/:id/edit" element={<TodoEditForm />} />
              <Route exact="true" path="/signup" element={<SignUpForm />} />
              <Route exact="true" path="/signin" element={<SignInForm />} />
              <Route exact="true" path="/todo/:id" element={<TodoPage />} />
              <Route exact="true" path="/profiles/:id/edit/password"  element={<UserPasswordForm />}/>
              <Route exact="true" path="/profiles/:id/edit"  element={<ProfileEditForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </div>
  );
}

export default App;