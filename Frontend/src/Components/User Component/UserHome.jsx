import React from "react";
import UserNavbar from "./UserNavbar";
import SearchBar from "./SearchBar";
import UserCarousel from './UserCarousel';
import UserProductList from './UserProductList';
import UserFooter from './UserFooter'
import FurnitureCarousel from "./FurnitureCarousel";
import Testimonials from "./Testimonials";
import Discounts from "./Discounts";
import FeaturedCategories from "./FeaturedCategories";
import FlashSale from "./FlashSale";
const UserHome = () => {
  return (
    <div className="min-w-screen">
      <UserNavbar />
      <SearchBar />
      <UserCarousel />
      <FlashSale />
      <FeaturedCategories />
      <UserProductList />
      <FurnitureCarousel />
      <Discounts />
      <Testimonials />
      <UserFooter />
    </div>
  );
};

export default UserHome;
