'use client';

import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import axios from 'axios';
import { useLoader } from '@/app/context/LoaderContext';

import Heading from '@/app/components/Heading';
import NewArrival from '@/app/components/NewArrival';
import HomeMiddle from '@/app/components/HomeMiddle';
import HomeContact from '@/app/components/HomeContact';
import HeroSection from '@/app/components/HeroSection';
import PopularCategories from '@/app/components/PopularCategories';
import HorizontalCategories from '@/app/components/HorizontalCategories';
import CompanyStats from '@/app/components/CompanyStats';
import OurServices from '@/app/components/OurServices';

// ─── HomePage ─────────────────────────────────────────────────────────────
const HomePage = () => {
  const { setIsReady } = useLoader();

  const [arrivalData, setArrivalData] = useState<any[]>([]);

  // ── Fetch new arrivals ────────────────────────────────────────────────────
  useGSAP(() => {
    const fetchArrivals = async () => {
      try {
        const { data } = await axios.get('/api/products/new-arrivals');
        if (data.success) setArrivalData(data.data);
      } catch (err) {
        console.error('Error fetching arrivals:', err);
      } finally {
        setIsReady(true);
      }
    };
    fetchArrivals();
  }, [setIsReady]);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Hero section — self-contained component */}
      <HeroSection arrivalData={arrivalData} />

      {/* Company Performance Stats */}
      <CompanyStats />

      {/* Horizontal scrolling categories */}
      <HorizontalCategories />

      {/* Remaining sections */}
      <NewArrival products={arrivalData} />
      <PopularCategories />
      <OurServices />
      <HomeMiddle />
      <HomeContact />
    </>
  );
};

export default HomePage;