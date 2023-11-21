"use client";

import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState, useEffect } from "react";
import { updateScannedData } from "@/lib/api";
import ScanSuccess from "./ScanSuccess";
import Loading from "./Loading";

export interface ScannerType {
  count: number;
  dateTime: string;
  lastCheckIn?: string;
  number?: number;
  letter?: string;
}

export default function ScannerQr() {
  const [scannedData, setScannedData] = useState("");
  const [responseData, setResponseData] = useState<ScannerType | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  // useEffect to listen for changes in scannedData
  useEffect(() => {
    if (scannedData !== "") {
      const checkScannedData = async () => {
        setIsLoading(true);
        try {
          const data = await updateScannedData(scannedData);
          setResponseData(data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };
      checkScannedData();
    }
  }, [scannedData]);

  return (
    <div className="w-screen ">
      {isLoading || (scannedData !== "" && responseData === null) ? (
        <Loading />
      ) : responseData !== null ? (
        <ScanSuccess
          setResponseData={setResponseData}
          setScannedData={setScannedData}
          responseData={responseData}
        />
      ) : (
        <QrScanner
          onDecode={(result) => setScannedData(result)}
          onError={(error) => console.error(error?.message)}
        />
      )}
    </div>
  );
}
