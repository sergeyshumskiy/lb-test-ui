import { Routes, Route, Navigate } from 'react-router';

import Payments from './pages/payments'
import ThreeDS from './pages/threeDS'
import CompletedPage from './pages/completed-page'
import Layout from './layout'

function AppRoutes() {

  return (
    <Routes element>
      <Route element={<Layout />}>
        <Route path='/payments' Component={Payments} />
        <Route path='/payments/3ds' Component={ThreeDS} />
        <Route path='/payments/completed' Component={CompletedPage} />
        <Route path='*' element={<Navigate to='/payments' replace />} />
      </ Route>
    </Routes>
  )
}

export default AppRoutes
