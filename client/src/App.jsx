
import { Route, Routes } from 'react-router-dom'

import { useSelector } from 'react-redux';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import CheckAuth from './components/common/check-auth';
import AuthLayout from './components/auth/layout';

function App() {
  
  const {isAuthenticated,user} = useSelector(state => state.auth);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
          }/>
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
