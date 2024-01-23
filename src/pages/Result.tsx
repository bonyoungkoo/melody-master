import { Box, Container, styled } from "@mui/material";

const Result = () => {
  return (
    <>
      <TitleContainer>
        <Title>Game Result</Title>
      </TitleContainer>
      <ScoreContainer>
        <TextBox>정답 수 : 5</TextBox>
        <TextBox>오답 수 : 5</TextBox>
        <TextBox>남은 시간 : 00 : 00</TextBox>
      </ScoreContainer>
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
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 700;
`

const ScoreContainer = styled(Container)`
  height: 80%;
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

export default Result;