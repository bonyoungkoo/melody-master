import { Rating, styled } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

export default function StarRating({value}: {value: number}) {

  const colorVariant = ['#ffc107', '#ffc107', '#ff9800', '#ff5722', '#f44336', '#ff1744']

  return (
    <Rating 
      name="read-only" 
      value={value} 
      max={5}
      icon={<StarIcon fontSize="inherit" sx={{ color: colorVariant[value] }} />}
      emptyIcon={<EmptyStartIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      readOnly
      size={"large"} 
    />
  )
}

const EmptyStartIcon = styled(StarIcon)`
  color: grey;
`