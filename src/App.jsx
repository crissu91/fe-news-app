import './App.css'
import { Route, Routes } from 'react-router'
import AllArticles from './components/AllArticles'
import Header from './components/Header'


function App() {
  

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/api/articles' element={<AllArticles />} />
      </Routes>
    </div>
  )
}



export default App
