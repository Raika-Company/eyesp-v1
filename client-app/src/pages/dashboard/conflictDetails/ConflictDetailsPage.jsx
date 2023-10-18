import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useState} from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import ConflictBox from "./ConflictBox";
import services from "../../../app/api/index";

const ConflictDetailsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("conflict");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    switch (selectedSort) {
      case "conflict": {
        services.dashboard.getIssues().then((response) => {
          setData(response.data.data);
          setLoading(false);
        });
        break;
      }
      case "province": {
        services.dashboard.getIssuesForCities().then((response) => {
          setData(response.data.data);
          setLoading(false);
        });
        break;
      }

      case "ISP": {
        services.dashboard.getIssuesForIsp().then((response) => {
          setData(response.data.data);
          setLoading(false);
        });
        break;
      }
    }
  }, [selectedSort]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "all .25s",
            justifyContent: "center",
            alignItems: "center",
            padding: ".5rem",
            borderRadius: "1rem",
            background: isDark ? "#393939" : "#FFF",
            gap: "1rem",
          }}
        >
          <Typography>چینش بر اساس:</Typography>
          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <Button
              variant="text"
              sx={{
                color:
                  selectedSort === "conflict"
                    ? "#00A4FF"
                    : isDark
                    ? "#FFF"
                    : "initial",
              }}
              onClick={() => setSelectedSort("conflict")}
            >
              نوع اختلاف
            </Button>
            <Divider
              orientation="vertical"
              sx={{
                height: "1.5rem",
              }}
            />
            <Button
              variant="text"
              onClick={() => setSelectedSort("province")}
              sx={{
                color:
                  selectedSort === "province"
                    ? "#00A4FF"
                    : isDark
                    ? "#FFF"
                    : "initial",
              }}
            >
              استان
            </Button>
            <Divider
              orientation="vertical"
              sx={{
                height: "1.5rem",
              }}
            />
            <Button
              variant="text"
              onClick={() => setSelectedSort("ISP")}
              sx={{
                color:
                  selectedSort === "ISP"
                    ? "#00A4FF"
                    : isDark
                    ? "#FFF"
                    : "initial",
              }}
            >
              اپراتور
            </Button>
          </ButtonGroup>
        </Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            border: isDark && "1px solid #676767",
            borderRadius: "1rem",
            boxShadow: "none",
          }}
        >
          <InputBase
            sx={{mr: 1, flex: 1}}
            placeholder="جست و جو"
            inputProps={{"aria-label": "جست و جو"}}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton type="button" sx={{p: "10px"}} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: "1rem",
          marginTop: "2rem",
          gridTemplateColumns: "repeat(6, auto)",
          gridAutoFlow: "dense",
          justifyContent: "start",
        }}
      >
        {!loading && data
          ? Object.keys(data).map((key) => (
              <ConflictBox key={key} title={key} data={data[key]} />
            ))
          : // <>
            //   {[1, 2, 3, 4].map((key) => (
            //     <Skeleton
            //       key={key}
            //       width={key === 1 ? "20rem" : key === 2 ? "30rem" : "10rem"}
            //       height="18rem"
            //     />
            //   ))}
            // </>
            null}
      </Box>
    </Box>
  );
};

export default ConflictDetailsPage;
