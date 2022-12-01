import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

function PrevisoesParada() {

  const navigate = useNavigate()
  const { codParada } = useParams()
  const [previsoes, setPrevisoes] = useState([])

  const buscaPrevisoesParada = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BUS_API}/previsoes-parada?codParada=${codParada}`)

      setPrevisoes(data)
    } catch (error) {
      console.log('previsoes', e)
    }
  }

  useEffect(() => {
    buscaPrevisoesParada()
  }, [])

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'center',
          gap: 1
        }}
      >

        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {previsoes.map((row) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => navigate(`/acompanhamento-onibus/${row.codItinerario}`)}
                >
                  <TableCell component="th" scope="row">
                    {row.prev}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.apelidoLinha}
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

export default PrevisoesParada