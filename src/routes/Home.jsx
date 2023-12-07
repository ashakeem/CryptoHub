import React from "react";
import CoinSearch from "../components/CoinSearch";
import Trending from "../components/Trending";

const Home = ({ coins }) => {
  return (
    <div className="2xl:grid 2xl:ml-8 2xl:grid-cols-2 2xl:gap-2">
      <CoinSearch coins={coins} />
      <Trending />
    </div>
  );
};

export default Home;
