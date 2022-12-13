
import { Container } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className="Main">
        <h1>TESTING TESTING</h1>
      </Container>
    </div>
  );
}

export default App;