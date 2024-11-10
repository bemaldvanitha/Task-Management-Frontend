import { Routes, Route } from 'react-router-dom';

import SignupScreen from "./screens/signup/SignupScreen";
import LoginScreen from "./screens/login/LoginScreen";
import HomeScreen from "./screens/home/HomeScreen";
import PrivateRoutes from "./components/navigation/PrivateRoutes";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={'/signup'} element={<SignupScreen />} />
          <Route path={'/login'} element={<LoginScreen />} />
          <Route path={''} element={<PrivateRoutes/>}>
              <Route path={'/'} element={<HomeScreen/>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
