import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const MinhasParadas = () => {

  const navigate = useNavigate()

  const [paradas, setParadas] = useState([])

  const handleClick = (data) => {
    console.log(data)

    navigate(`/previsoes-parada/${data.cod}`)
  }

  useEffect(() => {
    const favoritesLS = localStorage.getItem("favorites");
    const myFavorites = JSON.parse(favoritesLS)

    if (myFavorites && myFavorites.length > 0)
      setParadas(myFavorites)
  }, [])

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'center',
          justifyItems: 'center',
          gap: 1
        }}
      >
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {paradas.map((row) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 4,
                        justifyContent: 'space-between'
                      }}
                    >
                      <div
                        onClick={() => handleClick(row)}
                      >{row.name}</div>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Container>
  )
}

export default MinhasParadas