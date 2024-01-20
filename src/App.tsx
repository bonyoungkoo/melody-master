import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Layout from './layouts/Layout'
import Challenge from './pages/Challenge'
import Main from './pages/Main'

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout page={<Main />} />} />
            <Route path="/challenge" element={<Layout page={<Challenge />} />} />
            <Route path="/result" element={<Layout page={<></>} />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
