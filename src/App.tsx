import { Navigate } from 'react-router-dom';
import Home from './components/Home';

function App() {
  const isLoggedIn = () => {
    if (
      localStorage.getItem('currentUser') !== null &&
      localStorage.getItem('currentUser') !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  };

  return isLoggedIn() ? <Home /> : <Navigate to="/login" />;
}

export default App;
