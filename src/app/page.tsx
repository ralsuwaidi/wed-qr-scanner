import ScannerQr from "@/components/ScannerQr";
import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <ScannerQr />
    </div>
  );
};

export default Home;
