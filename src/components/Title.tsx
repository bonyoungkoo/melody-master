import { Box, styled } from "@mui/material"
import { ReactNode } from "react"

export default function Title({children}: {children: ReactNode}) {
  return (
    <TitleBox>{children}</TitleBox>
  )
}

const TitleBox = styled(Box)`
  font-family: "Lemon", serif;
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 700;
`