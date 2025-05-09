import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Layout from './layouts/Layout'
import Main from './pages/Main'
import Challenge from './pages/Challenge'
import Result from './pages/Result'
import Rank from './pages/Rank'

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter basename="/melody-master" >
          <Routes>
            <Route path="/" element={<Layout page={<Main />} />} />
            <Route path="/challenge" element={<Layout page={<Challenge />} />} />
            <Route path="/result" element={<Layout page={<Result />} />} />
            <Route path="/rank" element={<Layout page={<Rank />} />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
