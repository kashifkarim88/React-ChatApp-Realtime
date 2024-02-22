import './App.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/chats' Component={Chat}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
