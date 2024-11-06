import StarIcon from '@mui/icons-material/Star';
import { Box, Container, FormControlLabel, LinearProgress, Radio, RadioGroup, Rating, keyframes, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import YouTube from "react-youtube";
import { useRecoilValue, useSetRecoilState } from "recoil";
import VinylIcon from '@/assets/vinyl_plain.png';
import { useCountdown } from '@/hooks/useCountdown';
import { numberOfAHitState } from '@/recoil/score/atom';
import { youtubeState } from '@/recoil/youtube/atom';
import { numberOfMissSelector } from '@/recoil/score/selector';
import BasicButton from '@/components/BasicButton';
import StarRating from '@/components/StarRating';

const Challenge = () => {
  const navigate = useNavigate();
  const TIME_LIMIT = 1500;
  const {timeLeft, start, stop} = useCountdown(TIME_LIMIT);
  const [onPlayer, setOnPlayer] = useState(false);
  const [onChangeState, setOnChangeState] = useState(false);
  const [onPlay, setOnPlay] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [onSelect, setOnSelect] = useState(false);
  const videoList = useRecoilValue(youtubeState);
  const setYoutube = useSetRecoilState(youtubeState);
  const hitScore = useRecoilValue(numberOfAHitState);
  const setHitScore = useSetRecoilState(numberOfAHitState);
  const setMissScore = useSetRecoilState(numberOfMissSelector);
  const [player, setPlayer] = useState<any>();
  const [value, setValue] = useState<string>('');
  const [answer, setAnswer] = useState<any>();
  const [choiceList, setChoiceList] = useState<string[]>();
  const opts = {
    playerVars: {
      'autoplay': 0,
      'controls': 1, 
      'autohide': 0, 
      'rel': 0, 

    }
  }

  useEffect(() => {
    // console.log(videoList)
    start();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log('time over!')
      stop();
      navigate('/result');
    }
  }, [timeLeft]);

  useEffect(() => {
    getYoutubeVideo();
  }, [])

  const getYoutubeVideo = useCallback(() => {
    const randomList = getRandomIntegerList(5).map((v) => videoList.currentList[v]);
    setChoiceList(randomList.map((v) => v.snippet.title));
    const randomInteger = getRandomInteger(5);
    setAnswer(randomList[randomInteger]);
  }, [videoList]);

  const getRandomInteger = (max: number) => {
    return Math.floor(Math.random() * max);
  }

  const getRandomIntegerList = (count: number) => {
    const result: number[] = [];
    while (result.length < count) {
      const randomInteger = Math.floor(Math.random() * videoList.currentList.length);
      if (!result.find(v => v === randomInteger)) {
        result.push(randomInteger);
      }
    }
    return result;
  }

  const handleReady = useCallback((target: any) => {
    setPlayer(target);
    setOnPlayer(true);
  }, []);

  const setDuration = useCallback((hitScore: number) => {
    if (hitScore/3 >= 4) {
      return 2000 - (hitScore/3*50);
    }
    return 7000 - (hitScore/3)*1000;
  }, []);

  const clickPlay = useCallback(() => {
    if (!hasPlayed && !onPlay) {
      player.seekTo(getRandomInteger(120) + 10);
      player.playVideo();
      setOnPlay(true);
      setTimeout(() => {
        player.pauseVideo();
        setOnPlay(false);
        setHasPlayed(true);
      }, setDuration(hitScore))
    }
  }, [player, onPlayer, hasPlayed, onPlay, hitScore]);
  
  const clickNext = useCallback(() => {
    if (!onSelect) return;

    setOnChangeState(false);
    setHasPlayed(false);
    setOnPlay(false);
    setOnSelect(false);
    player.pauseVideo();
    setTimeout(() => {
      setYoutube({
        initialList: videoList.initialList,
        currentList: videoList.currentList.toSpliced(videoList.currentList.findIndex((v: any) => v.id === answer.id), 1)
      });
      if (answer.snippet.title === value) {
        setHitScore((prev: number) => prev + 1)
      } else {
        setMissScore((prev: number) => prev + 1)
      }
      getYoutubeVideo();
      setValue('');
    }, 1000)

  }, [player, onSelect, videoList, answer, value]);

  return (
    <>
      <RatingContainer>
        <StarRating value={Math.floor(hitScore/3) + 1} />
      </RatingContainer>
      <PlayingContainer>
        <PlayingIcon sx={{ animationPlayState: onPlay ? '' : 'paused' }} onClick={() => console.log(onPlayer, onChangeState, onPlay, hasPlayed, onSelect)} />
        {
          onPlay &&
          <AlbumIcon sx={{ animationPlayState: onPlay ? '' : 'paused', backgroundImage: `url(${answer?.snippet.thumbnails.default.url})`}} />
        }
        <YouTubePlayer videoId={answer?.snippet?.resourceId?.videoId} opts={opts} onStateChange={() => setOnChangeState(true)} onReady={(e) => handleReady(e.target)} />
      </PlayingContainer>
      <PlayingTimeProgressContainer>
        {/* <Box sx={{ width: '50%', backgroundColor: 'red' }}>
          <PlayingTimeLinearProgress variant="determinate" value={100/TIME_LIMIT*(TIME_LIMIT-timeLeft)} />
        </Box> */}
      </PlayingTimeProgressContainer>
      <ButtonContainer>
        {
          !hasPlayed && onPlayer && answer && onChangeState &&
          <BasicButton onClick={() => clickPlay()}>
              {onPlay ? 'Playing...' : `Click to play`}
          </BasicButton>
        }

        {
          onSelect && <BasicButton onClick={() => clickNext()}>Click to next</BasicButton>
        }
      </ButtonContainer>
      <RadioContainer>
        {
          hasPlayed &&
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setOnSelect(true)
            }}
          >
            {
              choiceList?.map((v, i) => 
                <RadioLabelText key={`${v}_${i}`} sx={{ color: value === v ? '#1976d2' : '#FFFFFF' }} value={v} control={<RadioText />} label={v} />
              )
            }
          </RadioGroup>
        }
      </RadioContainer>
      <ChallengeTimeProgressContainer>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={100/TIME_LIMIT*(TIME_LIMIT-timeLeft)} />
        </Box>
      </ChallengeTimeProgressContainer>
    </>
  );
};

// const PlayingTimeLinearProgress = styled(LinearProgress)`
//   .MuiLinearProgress-barColorPrimary {
//     background-color: grey;
//   }
// `

const PlayingTimeProgressContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 5%;
  max-width: 1000px;
  padding-top: 10px;
`

const ChallengeTimeProgressContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: end;
  height: 5%;
  max-width: 1000px;
`

const RadioContainer = styled(Container)`
  height: 40%;
  padding: 16px 48px;
`

const RadioText = styled(Radio)`
  color: #FFFFFF;
  font-size: 16px;
`

const RadioLabelText = styled(FormControlLabel)`
  height: 50px;
  color: #FFFFFF;
`

const ButtonContainer = styled(Container)`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const YouTubePlayer = styled(YouTube)`
  display: none;
`

const PlayingContainer = styled(Container)`
  position: relative;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px dotted rgba(255, 255, 255, 0.3); */
  `
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const RatingContainer = styled(Container)`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PlayingIcon = styled(Box)`
  height: 200px;
  width: 200px;
  background-image: url(${VinylIcon});
  background-size: cover;
  animation: ${rotate} infinite .75s linear;
  transition-timing-function: ease;
`

const AlbumIcon = styled(Box)`
  position: absolute;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background-size: cover;
  animation: ${rotate} infinite .75s linear;
  transition-timing-function: ease;
`


export default Challenge;