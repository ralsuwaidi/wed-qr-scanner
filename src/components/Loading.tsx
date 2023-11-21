import * as React from "react";
import CircularProgress from "@mui/joy/CircularProgress";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <CircularProgress />
    </div>
  );
}
