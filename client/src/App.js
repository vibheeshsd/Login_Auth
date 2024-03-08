import {login} from './styles/login.css'
import './styles/login.css'
import {Routes, Route} from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../src/context/userContext';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;
function App(){
    return(
      <UserContextProvider>   
        <Toaster position='bottom-right' toastOptions={{duration : 2000}}/>
        <Routes>
          {/* <Route path = "/" element = {<Home/>}/> */}
          <Route path='/' element = {<Login/>} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/dashboard' element = {<Dashboard/>} />
        </Routes>
      </UserContextProvider>
    )
  }

  export default App
