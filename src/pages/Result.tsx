import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, TextField, styled } from "@mui/material";
import { useRecoilValue } from "recoil";
import { numberOfAHitState, numberOfMissState } from "../recoil/score/atom";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";

const Result = () => {
  const [open, setOpen] = useState(false);
  const numberOfHit = useRecoilValue(numberOfAHitState);
  const numberOfMiss = useRecoilValue(numberOfMissState);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
 
  const setColor = useCallback((score: number) => {
    let color = '#ff1744';
    switch (Math.floor(score/3)) {
      case 0:
        color = '#ffc107' 
        break;
      case 1:
        color = '#ff9800' 
        break;
      case 2:
        color = '#ff5722' 
        break;
      case 3:
        color = '#f44336' 
        break;
      case 4:
        color = '#ff1744' 
        break;
    }
    return color;
  }, []);

  const calculateScore = useCallback(() => {
    return (numberOfHit*100) - (numberOfMiss*50);
  }, [numberOfHit, numberOfMiss]);

  const registerScore = useCallback(async () => {
    const url = import.meta.env.VITE_API_URL;
    const response = await axios({
      url: `${url}/register`,
      method: 'post',
      data: {
        name: value,
        hit: numberOfHit,
        miss: numberOfMiss,
        level: numberOfHit > 12 ? 5 : Math.floor(numberOfHit/3) + 1,
        score: calculateScore()
      }
    });

    if (!response.data) {
      alert('An error occured!')
    }

    navigate('/rank')

  }, [numberOfHit, numberOfMiss, value]);

  return (
    <>
      <TitleContainer>
        <Title>Game Result</Title>
      </TitleContainer>
      <ScoreContainer>
        <TextBox sx={{ display: 'flex', alignItems: 'center' }}>
          {`Max level : `}
          <Rating 
            name="read-only" 
            value={numberOfHit > 12 ? 5 : Math.floor(numberOfHit/3) + 1} 
            max={numberOfHit > 12 ? 5 : Math.floor(numberOfHit/3) + 1}
            readOnly
            icon={<StarIcon fontSize="inherit" sx={{ color: setColor(numberOfHit) }} />}
            size={"large"} />
          </TextBox>
        <TextBox>{`Hit : ${numberOfHit}`}</TextBox>
        <TextBox>{`Miss : ${numberOfMiss}`}</TextBox>
        <TextBox>{`Total score : ${calculateScore()}`}</TextBox>
      </ScoreContainer>
      <ButtonContainer>
        <GameButton variant="text" onClick={() => setOpen(true)}>
          Record My Score
        </GameButton>
        <GameButton variant="text" onClick={() => {}}>
          Retry
        </GameButton>
      </ButtonContainer>
      <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Enter your name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Record score and check your ranking.
          </DialogContentText>
          <TextField
            autoFocus
            variant="standard"
            fullWidth
            placeholder="Please enter within 8 letters."
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => registerScore()}>Record</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const TextBox = styled(Box)`
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 500;
  padding: 24px 0;
`

const Title = styled(Box)`
  font-family: "Lemon", serif;
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 700;
`

const ScoreContainer = styled(Container)`
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TitleContainer = styled(Container)`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export default Result;