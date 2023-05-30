import { Spinner, Table } from 'reactstrap';
import MainLayout from './layouts/MainLayout';
import { useEffect, useState } from 'react';
import { getDepartments, getDetails, getPatients, getRecipients } from './http/hospital-client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminCustom from './components/AdminPanel';
import SignUpCustom from './components/SignUp';
import SignInCustom from './components/SignIn';
import Hospitals from './pages/Hospitals';
import Departments from './pages/Departments';
import Recipients from './pages/Recipients';
import AllDetails from './pages/AllDetails';
import Patients from './pages/PatientsAQ';
import CardCustom from './components/CardCustom';
import AuthLayout from './layouts/AuthLayout';

//sadfasdf
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout>Çocukları Pistten Alıyorum</MainLayout>,
    errorElement: <h1>Almıyorum ulan</h1>,
    children: [{
      index: true,
      element: <CardCustom />
    }, {
      path: 'hospitals',
      element: <Hospitals />
    }, {
      path: 'patients',
      element: <Patients />
    }, {
      path: 'departments',
      element: <Departments />
    }, {
      path: 'recipients',
      element: <Recipients />
    }, {
      path: 'alldetails',
      element: <AllDetails />
    }]
  }, {
    path: '/auth',
    element: <AuthLayout />,
    children: [{
      path: 'signup',
      element: <SignUpCustom />
    }, {
      path: 'signin',
      element: <SignInCustom />
    }, {
      index: true,
      element: <AdminCustom />
    }]
  }
]);

function App() {
  return (
    <>
      {/* <MainLayout>
        {loading ? (<Spinner color='success'>
          Yükleniyor
        </Spinner>) :

        }
      </MainLayout> */}
      <RouterProvider router={router} />
    </>
  );
}


export default App;
