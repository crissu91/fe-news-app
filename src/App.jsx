import './App.css'
import { Route, Routes } from 'react-router'
import AllArticles from './components/AllArticles'
import Header from './components/Header'
import SingleArticle from './components/SingleArticle'
import HomePage from './components/HomePage'


function App() {
  

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/api/articles' element={<AllArticles />} />
        <Route path='/api/articles/:article_id' element={<SingleArticle />} />
        <Route path='*' element={<Error errorStatus={404} errorMessage={'Not found: Page does not exist'}/>}/>
      </Routes>
    </div>
  )
}



export default App
