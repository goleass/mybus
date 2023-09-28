import { Box, Container} from "@mui/material";
import { useEffect, useState } from "react";

function Home() {
  const [coords, setCoords] = useState({
    latitude: -29.92399,
    longitude: -51.170316,
  });

  useEffect(() => {
    localStorage.setItem("coords", JSON.stringify(coords));
  }, [coords]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Container sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          gap: 1,
        }}
      ></Box>
    </Container>
  );
}

export default Home;
