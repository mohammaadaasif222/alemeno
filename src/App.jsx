import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React,{Suspense} from 'react';

const Home = React.lazy(()=> import('./pages/Home'))
const SignIn = React.lazy(()=> import('./pages/SignIn'))
const Listing = React.lazy(()=> import('./pages/Listing'))
import Header from './components/Header'

import Loader from './components/Loader'
import HeaderBottom from './components/HeaderBottom';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<Loader/>}>
      <Header />
      <HeaderBottom/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
