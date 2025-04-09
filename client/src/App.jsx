
import { Route, Routes } from 'react-router-dom'

import { useSelector } from 'react-redux';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import CheckAuth from './components/common/check-auth';
import AuthLayout from './components/auth/layout';
import Home from './pages/event/Home';
import User from './pages/event/User';
import EventLayout from './components/event/layout';
import Search from './pages/event/Search';
import Detail from './pages/event/Detail';

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
          <Route path="/event" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <EventLayout />
            </CheckAuth>
          }>
            <Route path="home" element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="search" element={<Search />} />
            <Route path="detail/:id" element={<Detail />} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
