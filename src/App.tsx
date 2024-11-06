import Layout from 'layouts/Layout'
import Challenge from 'pages/Challenge'
import Main from 'pages/Main'
import Rank from 'pages/Rank'
import Result from 'pages/Result'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
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
