export const updateScannedData = async (scannedData) => {
  const pattern = /^(E|R)\d+$/;
  console.log(scannedData);
  if (pattern.test(scannedData)) {
    const number = scannedData.slice(1);
    const letter = scannedData[0];
    const url =
      process.env.NEXT_PUBLIC_DB_HOST + `invitees/Esra/${number}.json`;

    // Function to make the PUT request
    const makePutRequest = async (payload) => {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // Include the letter in the returned data
      return { ...data, letter, number };
    };

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data || !data.dateTime) {
        const payload = {
          dateTime: new Date().toISOString(),
          count: 1,
        };

        return await makePutRequest(payload);
      } else {
        console.log("Data already exists.", data);
        console.log("Count", data.count);
        const payload = {
          ...data,
          lastCheckIn: new Date().toISOString(),
          count: data.count + 1,
        };

        return await makePutRequest(payload);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error; // Throw error for the caller to handle
    }
  }
  return null;
};
