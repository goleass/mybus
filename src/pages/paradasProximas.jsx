import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import axios from "axios"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';

function ParadasProximas() {

  const navigate = useNavigate()
  const query = useQuery()

  const [paradas, setParadas] = useState([])
  const [favorites, setFavorites] = useState([])

  const buscarParadasProximas = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BUS_API}/paradas-proximas?latitude=${query.get('latitude')}&longitude=${query.get('longitude')}
      `)

      setParadas(data.map(d => ({ name: d.desc, cod: d.cod })))
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (data) => {
    console.log(data)

    navigate(`/previsoes-parada/${data.cod}`)
  }

  const handleClickFavorite = (data) => {
    if (!favorites.find(f => f.cod == data.cod)) {
      const a = [...favorites, { ...data, customName: data.name }]

      localStorage.setItem("favorites", JSON.stringify(a));

      setFavorites(a)
    }

    else {
      const a = favorites.filter(f => f.cod != data.cod)

      localStorage.setItem("favorites", JSON.stringify(a));

      setFavorites(a)
    }
  }

  useEffect(() => {
    const favoritesLS = localStorage.getItem("favorites");

    const myFavorites = JSON.parse(favoritesLS)

    if (myFavorites && myFavorites.length > 0)
      setFavorites(myFavorites)

    buscarParadasProximas()
  }, []);

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

                      <div>
                        {favorites.find(f => f.cod == row.cod) ?
                          <StarRateIcon
                            onClick={() => handleClickFavorite(row)}
                          />

                          :
                          <StarBorderIcon
                            onClick={() => handleClickFavorite(row)}
                          />
                        }
                      </div>
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

export default ParadasProximas