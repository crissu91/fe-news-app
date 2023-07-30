import './App.css'
import { Route, Routes } from 'react-router'
import AllArticles from './components/AllArticles'
import SingleArticle from './components/SingleArticle'
import HomePage from './components/HomePage'
import AllTopics from './components/AllTopics'
import NavBar from './components/NavBar'
import Error from './components/Error'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MyAccount from './components/MyAccount'


function App() {
  

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/api/articles' element={<AllArticles />} />
        <Route path='/api/articles/:article_id' element={<SingleArticle />} />
        <Route path='/api/topics/' element={<AllTopics />} />
        <Route path='/api/topics/:topic' element={<AllArticles />} />
        <Route path="/api/log-in" element={<SignIn />} />
				<Route path="/api/sign-up" element={<SignUp />} />
        <Route path="/api/my-account" element={<MyAccount />} />
        <Route exact path='/api/*' element={<Error errorStatus={404} errorMessage={'Not found: Page does not exist'}/>}/>
      </Routes>
    </div>
  )
}



export default App
