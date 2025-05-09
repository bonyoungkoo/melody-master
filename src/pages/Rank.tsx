import { Backdrop, Box, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicButton from 'src/components/BasicButton';

const Rank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rankData, setRankData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRanking();
  }, []);

  const getRanking = useCallback(async () => {
    setIsLoading(true)
    const url = import.meta.env.VITE_API_URL;
    const response = await axios({
      url: `${url}/api/rank/list`,
      method: 'get',
    });
    setIsLoading(false)
    if (!response.data) {
      alert('An error occured!')
    }
    setRankData(response.data);
  }, []);

  interface Rank {
    name: string;
    hit: string;
    score: string;
    miss: string;
    level: string;
  }

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
                rankData.map((v: Rank, i: number) => 
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={i}>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">{i + 1}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="left">{v.name}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">{v.hit}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">{v.miss}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">{v.score}</TableCell>
                  </TableRow>
                )
              }
              {
                location.state &&
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ color: 'yellow' }} align="center">-</TableCell>
                  <TableCell sx={{ color: 'yellow' }} align="left">{location.state?.name ?? '-'}</TableCell>
                  <TableCell sx={{ color: 'yellow' }} align="center">{location.state?.hit ?? '-'}</TableCell>
                  <TableCell sx={{ color: 'yellow' }} align="center">{location.state?.miss ?? '-'}</TableCell>
                  <TableCell sx={{ color: 'yellow' }} align="center">{location.state?.score ?? '-'}</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </RankContainer>
      <ButtonContainer>
        {/* <GameButton variant="text" onClick={() => {}}>
          Enroll My Score
        </GameButton> */}
        <BasicButton onClick={() => navigate('/')}>
          Go To Main
        </BasicButton>
      </ButtonContainer>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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

export default Rank;