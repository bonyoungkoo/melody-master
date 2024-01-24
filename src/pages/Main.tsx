import { Box, Button, styled } from "@mui/material";
import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Logo from '../assets/vinyl_logo.png';
import { numberOfAHitState } from "../recoil/score/atom";
import { youtubeState } from "../recoil/youtube/atom";

const Main = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setHitScore = useSetRecoilState(numberOfAHitState);
  const setYoutube = useSetRecoilState(youtubeState);
  const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='
  const YOUTUBE_PLAY_LIST_ID = ['PLberYIcFsD68X_8bqTlwivUWTF4llVlBb', 'PLberYIcFsD69fByqxSVjQzYIPsl9Bs0TA']

  const fetchYoutubeList = async (index: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const response: any = await axios({
        url: `${YOUTUBE_API_URL}${YOUTUBE_PLAY_LIST_ID[index]}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
        method: 'GET',
      });
      resolve(response);
    });
  };

  const onClickGameStartButton = useCallback(async () => {
    setIsLoading(true);

    const response = await Promise.all([
      fetchYoutubeList(0),
      fetchYoutubeList(1),
    ]);

    setIsLoading(false);
    setYoutube({
      initialList: [...response[0].data.items, ...response[1].data.items],
      currentList: [...response[0].data.items, ...response[1].data.items],
    });
    setHitScore(0);
    navigate('/challenge');
  }, [])

  return (
    <>
      <MainLogoContainer>
        <MainLogoIcon />
        <MainLogoText>Melody Master</MainLogoText>
      </MainLogoContainer>
      <ButtonContainer>
          <GameStartButton 
            variant="text" 
            disabled={isLoading}
            onClick={onClickGameStartButton}>
            <span>{isLoading ? 'Loading...' : 'Game Start'}</span>
          </GameStartButton>
      </ButtonContainer>
    </>
  );
};

const MainLogoContainer = styled(Box)`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding-top: 50px; */
`

const MainLogoIcon = styled(Box)`
  /* border-radius: 50%; */
  width: 300px;
  height: 300px;
  background-image: url(${Logo});
  background-size: cover;
`

const MainLogoText = styled(Box)`
  font-family: "Lemon", serif;
  font-weight: 400;
  font-style: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  text-align: center;
  color: #FFFFFF;
  padding-top: 24px;
`

const ButtonContainer = styled(Box)`
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GameStartButton = styled(Button)`
  height: 50px;
  width: 200px;
  background-color: #FFFFFF;
  color: #000000;
  &:hover {
    background-color: #000000;
    color: #FFFFFF;
  }
`

export default Main;