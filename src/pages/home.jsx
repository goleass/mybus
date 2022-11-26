import { Box, Button, Container, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function Home() {

  const navigate = useNavigate()

  const [coords, setCoords] = useState({ latitude: -29.923990, longitude: -51.170316 })

  useEffect(() => {
    localStorage.setItem("coords",JSON.stringify(coords));
  }, [coords])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    });
  }, [])

  return (
    <Container sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'center',
          justifyItems: 'center',
          gap: 1
        }}
      >
        <Button 
          onClick={() => navigate(`/paradas-proximas?latitude=${coords.latitude}&longitude=${coords.longitude}`)} 
          sx={{ width: '250px' }} 
          variant="contained">Paradas proximas</Button>
        <TextField id="outlined-basic" 
          value={coords.longitude}
          label="Longitude" variant="outlined" size="small" onChange={(e) => setCoords({...coords, longitude: e.target.value})}/>
        <TextField id="outlined-basic" 
          value={coords.latitude}
          label="Latitude" variant="outlined" size="small" onChange={(e) => setCoords({...coords, latitude: e.target.value})}/>
      </Box>
    </Container>
  )
}

export default Home