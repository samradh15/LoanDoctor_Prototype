import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import LoanDoctorPlatformApp from './loan-doctor-platform.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoanDoctorPlatformApp />
  </StrictMode>,
);
