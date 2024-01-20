import styled from "@emotion/styled";
import { Box, LinearProgress } from "@mui/material";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const Layout = ({page}: {page: ReactNode}) => {
  const location = useLocation();
  console.log(location.pathname)
  return (
    <>
      <PageContainer>
        {page}
      </PageContainer>
      <ProgressContainer>
        {
          location.pathname.includes('challenge') &&
          <Box sx={{ width: '100%', position: 'absolute', bottom: '0' }}>
            <LinearProgress variant="determinate" value={10} />
          </Box>
        }
      </ProgressContainer>
    </>
  );
};

const ProgressContainer = styled(Box)`
  position: relative;
  max-width: 1000px;
  height: 5vh;
`

const PageContainer = styled(Box)`
  margin: 0 auto;
  height: 95vh;
  max-width: 1000px;
  background-color: #11161C;
`

export default Layout;