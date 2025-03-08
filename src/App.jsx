import './App.css'
import Login from './Components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/HomePage'
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './Components/ProtectedRoute'
import Signup from './Components/Signup'
import Switches from './Components/Switches'

function App() {
  return (
    <div>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                path='/login'
                element={<Login/>}
              >
              </Route>
              <Route
                path='/signup'
                element={<Signup />}
              >
              </Route>
              <Route
                path='/home'
                element={
                  <ProtectedRoute>
                    <Home/>
                  </ProtectedRoute>
                }
              >
              </Route>
              <Route
                path='/switches'
                element={
                  <ProtectedRoute>
                    <Switches/>
                  </ProtectedRoute>
                }
              >
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
     
    </div>
  )
}

export default App
