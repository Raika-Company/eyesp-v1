// /**
//  * React component for displaying the result of a speed test.
//  * @component
//  * @param {Object} props - The properties passed to the component.
//  * @param {number} props.ping - The ping value.
//  * @param {number} props.download - The download speed value.
//  * @param {number} props.upload - The upload speed value.
//  * @returns {JSX.Element} - The rendered result component.
//  */
// import { Box, Button } from "@mui/material";
// // Assets
// import Download from "../../app/assets/image/Img-SpeedTest/download1.svg";
// import Upload from "../../app/assets/image/Img-SpeedTest/upload1.svg";
// import Ping from "../../app/assets/image/Img-SpeedTest/ping1.svg";
// import Globe from "../../app/assets/image/Img-SpeedTest/server.svg";
// import Person from "../../app/assets/image/Img-SpeedTest/user.svg";

// // Local components
// import PcSpeedBox from "./pcSpeedBox";
// import PcInformationBox from "./pcInformationBox";

// /**
//  * Functional component representing the PC Speed Test results.
//  * @param {Object} props - The properties passed to the component.
//  * @param {number} props.ping - The ping value in milliseconds.
//  * @param {number} props.download - The download speed value in Mbps.
//  * @param {number} props.upload - The upload speed value in Mbps.
//  * @returns {JSX.Element} - The rendered PC Speed Test Results component.
//  */

// const PcResult = ({ ping, download, upload }) => {
//   return (
//     <>
//       <Box
//         display="flex"
//         flexDirection="column"
//         justifyContent="space-evenly"
//         padding="2rem"
//         width="80%"
//         marginTop="25dvh"
//         marginX="auto"
//         alignItems="center"
//         textAlign="center"
//         gap={10}
//         sx={{
//           borderRadius: "1.2rem",
//           border: "1.468px solid rgba(0, 0, 0, 0.10)",
//           background: "transparent",
//           display: { xs: "none", md: "flex" },
//         }}
//       >
//         <Box
//           display="flex"
//           flexDirection="row"
//           justifyContent="space-evenly"
//           width="100%"
//         >
//           <PcSpeedBox
//             title="PING"
//             iconSrc={Ping}
//             altText="ping icon"
//             value={ping}
//             measure="ms"
//             opacity={1}
//           />
//           <PcSpeedBox
//             title="UPLOAD"
//             iconSrc={Upload}
//             altText="ping icon"
//             value={upload}
//             measure="Mbps"
//             opacity={1}
//           />
//           <PcSpeedBox
//             title="DOWNLOAD"
//             iconSrc={Download}
//             altText="ping icon"
//             value={download}
//             measure="Mbps"
//             opacity={1}
//           />
//         </Box>
//         <Box
//           flexDirection="row"
//           alignItems="center"
//           justifyContent="center"
//           gap={10}
//           sx={{ display: { xs: "none", md: "flex" } }}
//         >
//           <PcInformationBox
//             title="Scaleway"
//             value="51.15.57.153"
//             iconSrc={Person}
//             altText="Person Icon"
//           />
//           <PcInformationBox
//             title="KEYYO"
//             value="Paris"
//             iconSrc={Globe}
//             altText="Server Icon"
//             buttonLabel="Change Server"
//           />
//         </Box>

//         <Box display="flex" gap={4}>
//           <Button
//             variant="outlined"
//             sx={{
//               backgroundColor: "#126AED",
//               color: "white",
//               fontSize: "1.8rem",
//               borderRadius: "1.625rem",
//               border: 0,
//               width: "20rem",
//             }}
//           >
//             Again Test
//           </Button>
//           <Button
//             variant="outlined"
//             sx={{
//               backgroundColor: "#DB7F12",
//               color: "white",
//               fontSize: "1.8rem",
//               borderRadius: "1.625rem",
//               border: 0,
//               width: "16rem",
//             }}
//           >
//             Share Test
//           </Button>
//         </Box>
//       </Box>
//       <Box
//         display="flex"
//         flexDirection="column"
//         justifyContent="space-evenly"
//         padding="1rem"
//         width="80%"
//         height="60dvh"
//         marginTop="10dvh"
//         marginX="auto"
//         alignItems="center"
//         textAlign="center"
//         sx={{
//           borderRadius: "1.2rem",
//           border: "1.468px solid rgba(0, 0, 0, 0.10)",
//           background: "transparent",
//           display: { xs: "flex", md: "none" },
//         }}
//       >
//         <PcSpeedBox
//           title="PING"
//           iconSrc={Ping}
//           altText="ping icon"
//           value={ping}
//           measure="ms"
//           opacity={1}
//         />
//         <PcSpeedBox
//           title="UPLOAD"
//           iconSrc={Upload}
//           altText="ping icon"
//           value={upload}
//           measure="Mbps"
//           opacity={1}
//         />
//         <PcSpeedBox
//           title="DOWNLOAD"
//           iconSrc={Download}
//           altText="ping icon"
//           value={download}
//           measure="Mbps"
//           opacity={1}
//         />
//         <Box display="flex" flexDirection="column" gap={4} marginTop="1rem">
//           <Button
//             variant="outlined"
//             sx={{
//               backgroundColor: "#126AED",
//               color: "white",
//               fontSize: "1.8rem",
//               borderRadius: "1.625rem",
//               border: 0,
//             }}
//           >
//             Again Test
//           </Button>
//           <Button
//             variant="outlined"
//             sx={{
//               backgroundColor: "#DB7F12",
//               color: "white",
//               fontSize: "1.8rem",
//               borderRadius: "1.625rem",
//               border: 0,
//             }}
//           >
//             Share Test
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };
// export default PcResult;
