import './App.css'
import { Route, Routes } from 'react-router'
import AllArticles from './components/AllArticles'
import Header from './components/Header'
import SingleArticle from './components/SingleArticle'


function App() {
  

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/api/articles' element={<AllArticles />} />
        <Route path='/api/articles/:article_id' element={<SingleArticle />} />
      </Routes>
    </div>
  )
}



export default App
