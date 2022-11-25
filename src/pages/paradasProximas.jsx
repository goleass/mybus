import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import axios from "axios"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

function ParadasProximas() {

  const navigate = useNavigate()
  const query = useQuery()

  const [paradas, setParadas] = useState([])

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

  useEffect(() => {
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
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                    onClick={() => navigate(`/previsoes-parada/${row.cod}`)}
                  >
                    {row.name}
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