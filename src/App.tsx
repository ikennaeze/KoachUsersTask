import Home from './pages/Home'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import { Toaster } from 'react-hot-toast'

function App() {
  axios.defaults.baseURL = "http://jsonplaceholder.typicode.com"
  axios.defaults.withCredentials = true

  const routes = (
    <>
    <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/profile' element={<Profile/>}>
            <Route path=':userUsername' element={<Profile/>}/>
          </Route>
        </Routes>
    </Router>
    </>
  )

  return (
    <>
      <Toaster position="bottom-center" toastOptions={{duration: 2500}} />
      {routes}
    </>
  )
}

export default App