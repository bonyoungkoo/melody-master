import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const Layout = ({page}: {page: ReactNode}) => {
  return (
    <>
      <PageContainer>
        {page}
      </PageContainer>
    </>
  );
};

const PageContainer = styled(Box)`
  margin: 0 auto;
  height: 100vh;
  max-width: 1000px;
  background-color: #11161C;
`

export default Layout;