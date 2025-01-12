import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/Homepage"
import ChiSiamo from "./components/Chisiamo"
import {PostList} from "./components/Postlist"
import AppLayout from "./components/App.layout"
import PostDetail from "./components/PostDetail"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />}/>
            <Route path="/ChiSiamo" element={<ChiSiamo />}/>
            <Route path="/PostList" element={<PostList />}/>
            {/* Creo rotta dinamica */}
            <Route path="/PostList/:id" element={<PostDetail />}/>

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;