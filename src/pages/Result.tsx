import { Backdrop, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, styled } from "@mui/material";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from "axios";
import StarRating from "src/components/StarRating";
import { numberOfAHitState, numberOfMissState } from "src/recoil/score/atom";
import Title from "src/components/Title";
import BasicButton from "src/components/BasicButton";

const Result = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const numberOfHit = useRecoilValue(numberOfAHitState);
  const numberOfMiss = useRecoilValue(numberOfMissState);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
 
  const calculateScore = useCallback(() => {
    return (numberOfHit*100) - (numberOfMiss*50);
  }, [numberOfHit, numberOfMiss]);

  const registerScore = useCallback(async () => {
    setShowDialog(false);
    setIsLoading(true);
    const url = import.meta.env.VITE_API_URL;
    const response = await axios({
      url: `${url}/api/rank/register`,
      method: 'post',
      data: {
        name: value,
        hit: numberOfHit,
        miss: numberOfMiss,
        level: numberOfHit > 12 ? 5 : Math.floor(numberOfHit/3) + 1,
        score: calculateScore()
      }
    });

    setIsLoading(false);

    if (!response.data) {
      alert('An error occured!')
    }

    navigate('/rank', { 
      state: {
        name: value,
        hit: numberOfHit,
        miss: numberOfMiss,
        score: calculateScore()
      }
    });

  }, [numberOfHit, numberOfMiss, value]);

  return (
    <>
      <TitleContainer>
        <Title>Game Result</Title>
      </TitleContainer>
      <ScoreContainer>
        <TextBox sx={{ display: 'flex', alignItems: 'center' }}>
          {`Max level`}&nbsp;
          <StarRating value={numberOfHit < 13 ? Math.floor(numberOfHit/3) + 1 : 5}/>
          {/* <Rating 
            name="read-only" 
            value={Math.floor(numberOfHit/3) + 1} 
            max={5}
            readOnly
            icon={<StarIcon fontSize="inherit" sx={{ color: setColor(numberOfHit) }} />}
            size={"large"} /> */}
          </TextBox>
        <TextBox>{`Hit : ${numberOfHit}`}</TextBox>
        <TextBox>{`Miss : ${numberOfMiss}`}</TextBox>
        <TextBox>{`Total score : ${calculateScore()}`}</TextBox>
      </ScoreContainer>
      <ButtonContainer>
        <BasicButton onClick={() => setShowDialog(true)}>
          Record My Score
        </BasicButton>
        <BasicButton onClick={() => navigate('/')}>
          Go To Main
        </BasicButton>
      </ButtonContainer>
      <Dialog onClose={() => setShowDialog(false)} open={showDialog}>
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
          <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button onClick={() => registerScore()}>Record</Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

const TextBox = styled(Box)`
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 500;
  padding: 24px 0;
`

const ScoreContainer = styled(Container)`
  font-family: "Lemon", serif;
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

export default Result;