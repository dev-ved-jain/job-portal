import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCaroussel from "./CategoryCaroussel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCaroussel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
