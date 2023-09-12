import { Box, Container, Typography } from "@mui/material";
import definitionsData from "../../app/data/definitions.json";
import { useTheme } from "@mui/material/styles";

const Information = () => {
  const theme = useTheme();
  const bgColor = theme.palette.mode === "light" ? "#f7f9fc" : "#2a2c2f";

  return (
    <Container maxWidth="lg">
      <Box
        marginY="max(2rem, 5vh)"
        sx={{
          borderRadius: "1.2rem",
          border: "1.468px solid rgba(0, 0, 0, 0.10)",
          padding: "1rem",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          width: "100%",
          backgroundColor: bgColor,
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Typography
          component="h2"
          gutterBottom
          sx={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            borderBottom: "2px solid #333",
            paddingBottom: "0.5rem",
          }}
        >
          تعاریف
        </Typography>

        {definitionsData.map((definition) => (
          <DefinitionTerm title={definition.title} key={definition.title}>
            {definition.definition}
          </DefinitionTerm>
        ))}
      </Box>
    </Container>
  );
};

const DefinitionTerm = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Typography
      component="p"
      gutterBottom
      sx={{
        marginY: "0.75rem",
        fontSize: "1.1rem",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
        borderRadius: "0.5rem",
        padding: "0.5em",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 1)"
              : "rgba(255, 255, 255, 1)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography
        component="span"
        fontWeight="bold"
        sx={{
          color: "#0077b6",
          marginRight: "0.5em",
          marginLeft: "0.4em",
        }}
      >
        {title}
      </Typography>
      {children}
    </Typography>
  );
};
export default Information;
