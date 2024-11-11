import { Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import SignupScreen from "./screens/signup/SignupScreen";
import LoginScreen from "./screens/login/LoginScreen";
import HomeScreen from "./screens/home/HomeScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import ChangePasswordScreen from "./screens/change-password/ChangePasswordScreen";
import PrivateRoutes from "./components/navigation/PrivateRoutes";
import store from './store';

import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <Routes>
              <Route path={'/signup'} element={<SignupScreen />} />
              <Route path={'/login'} element={<LoginScreen />} />
              <Route path={''} element={<PrivateRoutes/>}>
                  <Route path={'/'} element={<HomeScreen/>}/>
                  <Route path={'/password'} element={<ChangePasswordScreen/>}/>
                  <Route path={'/admin'} element={<AdminScreen/>}/>
              </Route>
          </Routes>
      </Provider>
    </div>
  );
}

export default App;
