import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';

import './main.css'
import { Spinner } from './components';

const AppRoutes = lazy(() => import('./app-routes'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <AppRoutes />
       </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
