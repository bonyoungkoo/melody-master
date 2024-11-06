import { Box, Menu, MenuItem, styled } from "@mui/material";
import axios from "axios";
import Logo from "../assets/vinyl_logo.png";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import BasicButton from "../components/BasicButton";
import { numberOfAHitState, numberOfMissState } from "../recoil/score/atom";
import { youtubeState } from "../recoil/youtube/atom";

const Main = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState('KPOP');
  const setHitScore = useSetRecoilState(numberOfAHitState);
  const setMissScore = useSetRecoilState(numberOfMissState);
  const setYoutube = useSetRecoilState(youtubeState);
  const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const GENRE_LIST = ['KPOP', 'CLASSIC']
  const YOUTUBE_PLAY_LIST_ID: {[key: string]: string[]} = {
    KPOP: ['PLberYIcFsD68X_8bqTlwivUWTF4llVlBb', 'PLberYIcFsD69fByqxSVjQzYIPsl9Bs0TA'],
    CLASSIC: ['PLberYIcFsD6-8T7Zx5BZuDsK0D5JXWMrw']
  }

  useEffect(() => {
    setMissScore(0);
    setHitScore(0);
  }, []);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPlayList = async (id: string): Promise<any> => {
    const promise = new Promise(resolve => {
      const response = axios({
        url: `${YOUTUBE_API_URL}${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
        method: 'GET',
      });
      resolve(response);
    });
    return promise.then(response => response)
  };

  const onClickGenre = useCallback((genre: string) => {
    setGenre(genre)
    handleClose()
  }, [])

  const onClickGameStartButton = useCallback(async () => {
    setIsLoading(true);
    console.log('check', genre)
    const response = await Promise.all(YOUTUBE_PLAY_LIST_ID[genre].map(v => getPlayList(v)))

    setIsLoading(false);
    setYoutube({
      initialList: [...response.map(v => v.data.items).flat()],
      currentList: [...response.map(v => v.data.items).flat()],
    });
    navigate('/challenge');
  }, [genre])

  return (
    <>
      <MainLogoContainer>
        <MainLogoIcon />
        <MainLogoText>Melody Master</MainLogoText>
      </MainLogoContainer>
      <ButtonContainer>
        <BasicButton 
          onClick={handleClick}>
          <span>Genre : {genre}</span>
        </BasicButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
        {
          GENRE_LIST.map(v => <GenreMenu key={v} onClick={() => onClickGenre(v)}>{v}</GenreMenu>)
        }
      </Menu>
        <BasicButton 
          disabled={isLoading}
          onClick={onClickGameStartButton}>
          <span>{isLoading ? 'Loading...' : 'Game Start'}</span>
        </BasicButton>
        <BasicButton 
          onClick={() => navigate('/rank')}>
          <span>{'View Rank Board'}</span>
        </BasicButton>
      </ButtonContainer>
    </>
  );
};

const GenreMenu = styled(MenuItem)`
  height: 50px;
  width: 200px;
  font-size: 14px;
  color: black;
  font-weight: 400;
`

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default Main;