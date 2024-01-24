import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Rank = () => {
  const location = useLocation();
  const [rankData, setRankData] = useState([]);

  useEffect(() => {
    getRanking();
  }, []);

  const getRanking = useCallback(async () => {
    const url = import.meta.env.VITE_API_URL;
    const response = await axios({
      url: `${url}/api/rank/list`,
      method: 'get',
    });
    if (!response.data) {
      alert('An error occured!')
    }
    setRankData(response.data);
  }, []);

  return (
    <>
      <TitleContainer>
          <Title>Ranking</Title>
      </TitleContainer>
      <RankContainer>
        <TableContainer component={Paper} sx={{ backgroundColor: '#11161C' }}>
          <Table size="small" aria-label="a dense table">
            <caption style={{ color: 'grey' }}>Ranking only displays the records of the top 10.</caption>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#FFFFFF', width: '5%' }}>#rank</TableCell>
                <TableCell sx={{ color: '#FFFFFF', width: '80%' }}>name</TableCell>
                <TableCell sx={{ color: '#FFFFFF', width: '5%' }} align="center">hit</TableCell>
                <TableCell sx={{ color: '#FFFFFF', width: '5%' }} align="center">miss</TableCell>
                <TableCell sx={{ color: '#FFFFFF', width: '5%' }} align="center">score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rankData.map((v: any, i: number) => 
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={i}>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">{i + 1}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="left">{v.name}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">{v.hit}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">{v.miss}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">{v.score}</TableCell>
                  </TableRow>
                )
              }
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ color: 'yellow' }} align="center">-</TableCell>
                <TableCell sx={{ color: 'yellow' }} align="left">{location.state?.name ?? '-'}</TableCell>
                <TableCell sx={{ color: 'yellow' }} align="center">10</TableCell>
                <TableCell sx={{ color: 'yellow' }} align="center">1</TableCell>
                <TableCell sx={{ color: 'yellow' }} align="center">{1000}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </RankContainer>
      <ButtonContainer>
        {/* <GameButton variant="text" onClick={() => {}}>
          Enroll My Score
        </GameButton> */}
        <GameButton variant="text" onClick={() => {}}>
          Go To Main
        </GameButton>
      </ButtonContainer>
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
  height: 60%;
  background-color: #11161C;
`

const ButtonContainer = styled(Container)`
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const GameButton = styled(Button)`
  height: 50px;
  width: 200px;
  background-color: #FFFFFF;
  color: #000000;
  &:hover {
    background-color: #000000;
    color: #FFFFFF;
  }
  margin-top: 12px;
`

export default Rank;