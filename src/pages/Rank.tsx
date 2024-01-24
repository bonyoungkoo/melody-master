import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';

const Rank = () => {

  return (
    <>
      <TitleContainer>
          <Title>Ranking</Title>
      </TitleContainer>
      <RankContainer>
        <TableContainer component={Paper} sx={{ backgroundColor: '#11161C' }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#FFFFFF', width: '85%' }}>name</TableCell>
                <TableCell sx={{ color: '#FFFFFF', width: '5%' }} align="center">correct</TableCell>
                <TableCell sx={{ color: '#FFFFFF', width: '5%' }} align="center">incorrect</TableCell>
                <TableCell sx={{ color: '#FFFFFF', width: '5%' }} align="center">score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ color: '#FFFFFF' }} align="left">홍길동</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">1</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">1</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">1</TableCell>
                </TableRow>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ color: '#FFFFFF' }} align="left">홍길동</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">1</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">1</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">1</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </RankContainer>
    </>
  );
};

const TitleContainer = styled(Container)`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Title = styled(Box)`
  font-family: "Lemon", serif;
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 700;
`

const RankContainer = styled(Container)`
  height: 90%;
  background-color: #11161C;
`

const ButtonContainer = styled(Container)`
  height: 10%;
`

export default Rank;