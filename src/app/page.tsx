'use client';

import { Layout, Hero } from '@/components';

export default function Home() {
  const handleStartDetection = () => {
    // Navigate to scan page or show modal
    console.log('Starting detection...');
  };

  return (
    <Layout>
      <Hero onButtonClick={handleStartDetection} />
    </Layout>
  );
}
