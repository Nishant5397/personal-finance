import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpPage from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
         <Route path="/" element ={<SignUpPage/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      
    </Router>
    </>
  );
}

export default App;
