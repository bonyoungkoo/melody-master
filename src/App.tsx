import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Challenge from '@/pages/Challenge'
import Main from '@/pages/Main'
import Result from '@/pages/Result'
import Rank from '@/pages/Rank'
import Layout from '@/layouts/Layout'

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
