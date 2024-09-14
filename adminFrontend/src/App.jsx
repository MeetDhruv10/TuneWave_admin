import './App.css';
import Homepage from './pages/Homepage';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import New_artists from './pages/New_artists';
import RootLayout from './pages/RootLayout';
import Dashboard from './components/Dashboard';
import Manage from './pages/Manage'
function App() {
  return (
    <main>
      <Routes>
        {/* Public route */}
        <Route path='/login' element={<Login />} />

        {/* Protected routes with layout */}
        <Route element={<RootLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/artists' element={<New_artists />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/manage' element={<Manage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
