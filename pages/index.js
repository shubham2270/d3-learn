import Head from "next/head";
import Image from "next/image";

import SvgGraph from "../Components/SvgGraph";
import D3PartsOfGraph from "../Components/D3PartsOfGraph";
import DataBinding from "../Components/DataBinding";

const Home = () => {
  return (
    <div>
      {/* <SvgGraph />
      <D3PartsOfGraph /> */}
      <DataBinding />
    </div>
  );
};

export default Home;
