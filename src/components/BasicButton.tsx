import { Button, styled } from "@mui/material";
import { ReactNode } from "react";
export default function BasicButton({
  children, 
  onClick,
  disabled = false
}: {
  children?: ReactNode, 
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean
}) {
  return (
    <ButtonBox variant="text" disabled={disabled} onClick={onClick}>
      {children}
    </ButtonBox>
  )
}

const ButtonBox = styled(Button)`
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