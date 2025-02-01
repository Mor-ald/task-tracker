import App from './App.tsx';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';
import '@assets/styles/variables.scss';
import '@assets/styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
