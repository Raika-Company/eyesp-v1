import {useState, useEffect} from "react";
import io from "socket.io-client";

function TestPing() {
  const [latency, setLatency] = useState("N/A");
  const [downloadSpeed, setDownloadSpeed] = useState("N/A");
  const [uploadSpeed, setUploadSpeed] = useState("N/A");
  const [socket, setSocket] = useState(null);
  const [servers, setServers] = useState([]);
  const [selectedServerURL, setSelectedServerURL] = useState(
    "http://2.189.59.122:5001"
  );

  const NUM_CONNECTIONS = 12; // Number of parallel connections
  const PING_TIMES = 10; // Number of pings

  useEffect(() => {
    if (!socket) {
      const s = io(selectedServerURL);
      setSocket(s);
    } else {
      socket.io.uri = selectedServerURL;
      socket.connect();
    }
    return () => socket && socket.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServerURL]);

  useEffect(() => {
    if (socket) {
      let pingCount = 0;
      let minLatency = Infinity;

      socket.on("pong_event", async (timestamp) => {
        const currentLatency = performance.now() - timestamp;
        minLatency = Math.min(minLatency, currentLatency);
        pingCount++;

        if (pingCount === PING_TIMES) {
          setLatency(minLatency.toFixed(2));
          await downloadTest();
        } else {
          socket.emit("ping_event", performance.now());
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    async function fetchServers() {
      try {
        const response = await fetch(selectedServerURL + "/servers");
        const data = await response.json();
        setServers(data);
      } catch (error) {
        console.error("Failed to fetch servers:", error);
      }
    }

    fetchServers();
  }, [selectedServerURL]);

  const startPingTest = () => {
    if (socket) {
      setLatency("Testing...");
      setDownloadSpeed("N/A");
      setUploadSpeed("N/A");
      socket.emit("ping_event", performance.now());
    }
  };

  const downloadTest = async () => {
    let totalDataSize = 0;
    const startTime = performance.now();
    const testDuration = 20 * 1000; // 20 seconds

    const downloadChunk = async () => {
      while (performance.now() - startTime < testDuration) {
        const response = await fetch(
          `${selectedServerURL}/download/test?timestamp=${performance.now()}`
        );
        const chunkSize =
          (await response.arrayBuffer()).byteLength / (1024 * 1024);
        totalDataSize += chunkSize;
      }
    };

    try {
      const promises = [];
      for (let i = 0; i < NUM_CONNECTIONS; i++) {
        promises.push(downloadChunk());
      }

      await Promise.all(promises);
      const elapsedTime = (performance.now() - startTime) / 1000; // in seconds
      const currentSpeed = (totalDataSize / elapsedTime) * 8; // Mbps
      setDownloadSpeed(currentSpeed.toFixed(2));

      await uploadTest();
    } catch (error) {
      console.error("Download test failed:", error);
      setDownloadSpeed("Error");
    }
  };

  const uploadTest = async () => {
    let totalDataUploaded = 0;
    const startTime = performance.now();
    const testDuration = 10 * 1000; // 10 seconds

    const data = new Blob([new Uint8Array(1024 * 1024 * 2)], {
      type: "application/octet-stream",
    }); // 2MB data

    const uploadChunk = async (serverId) => {
      const formData = new FormData();
      formData.append("file", data);

      const response = await fetch(`${selectedServerURL}/upload/${serverId}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        return data.size / (1024 * 1024); // return size in MB
      }
      return 0;
    };

    const currentServer = servers.find(
      (server) => server.url === selectedServerURL
    );

    if (!currentServer) {
      console.error("Unable to find the selected server in the servers list.");
      setUploadSpeed("Error");
      return;
    }

    try {
      const promises = [];
      for (let i = 0; i < NUM_CONNECTIONS; i++) {
        promises.push(uploadChunk(currentServer.id));
      }

      const results = await Promise.all(promises);
      totalDataUploaded += results.reduce((acc, val) => acc + val, 0);

      const elapsedTime = (performance.now() - startTime) / 1000;
      const currentSpeed = (totalDataUploaded / elapsedTime) * 8; // Mbps
      setUploadSpeed(currentSpeed.toFixed(2));
    } catch (error) {
      console.error("Upload test failed:", error);
      setUploadSpeed("Error");
    }
  };

  return (
    <div>
      <h2>SpeedTest</h2>
      <select
        value={selectedServerURL}
        onChange={(e) => setSelectedServerURL(e.target.value)}
      >
        {servers.map((server) => (
          <option key={server.id} value={server.url}>
            {`${server.name} (${server.location})`}
          </option>
        ))}
      </select>
      <button onClick={startPingTest}>Start Speed Test</button>
      <p>Latency: {latency} ms</p>
      <p>Download Speed: {downloadSpeed} Mbps</p>
      <p>Upload Speed: {uploadSpeed} Mbps</p>
    </div>
  );
}

export default TestPing;
