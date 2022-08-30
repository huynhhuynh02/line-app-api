import logo from './logo.svg';
import './App.css';
import AppLayout from './components/Layout';
import { useEffect, useState } from 'react';
import LoginPage from './pages/login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { authService } from './service/auth.api';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('access_token') != null) {
      authService.getUserProfile().then((data) => {
        console.log(data);
      });
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/dashboard">
            <AppLayout />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
