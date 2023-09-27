import { Box } from "@mui/material";

const IconLink = ({ iconPath, onClick, link }) => {
  return (
    <a href={link}>
      <Box sx={{
        cursor: 'pointer'
      }}
        onClick={onClick}>
        <img src={iconPath} />
      </Box>
    </a>
  )
}

export default IconLink