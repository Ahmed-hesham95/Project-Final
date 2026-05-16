import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu.jsx';
import TopDoctors from '../components/TopDoctors.jsx';
import Banner from '../components/Banner.jsx';
import { useState } from 'react';

function Home() {
  const [isUser] = useState((localStorage.getItem('token') || sessionStorage.getItem('token')));

  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      {!isUser && <Banner />}
    </div>
  );
};

export default Home