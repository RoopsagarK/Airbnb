import './App.css'
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import Layout from './Layout.jsx';
import Register from './pages/Register.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import PlacesFormPage from './pages/PlacesFormPage.jsx';
import PlacePage from './pages/PlacePage.jsx';
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/account/:subPage?' element={<AccountPage />} />
          <Route path='/account/:subPage?/new' element={<PlacesFormPage />} />
          <Route path='/account/:subPage/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
