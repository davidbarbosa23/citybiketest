import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { MapLeaflet } from "./components/MapLeaflet";
import { MapHistory } from "./components/MapHistory";

import "./App.css";

const settings = {
  endpoint: "http://127.0.0.1:4001",
};

const prevMapSettings = {
  scale: 12,
  position: [25.790654, -80.1300455],
  name: "Citi Bike Miami",
  city: "Miami Beach, FL",
};

function App() {
  let counter = 0;

  const [mapSettings, setMapSettings] = useState(prevMapSettings);
  const [mapData, setMapData] = useState([]);
  const [activeStation, setActiveStation] = useState(null);

  // Manage History
  const [history, setHistory] = useState({});
  const [viewHistory, setViewHistory] = useState(false);
  const [activeHistory, setActiveHistory] = useState(null);
  const [dataActiveHistory, setDataActiveHistory] = useState([]);
  const checkHistory = (check) => {
    setViewHistory(check);
  };
  const selectHistory = (id) => {
    setActiveHistory(id);
    setDataActiveHistory(history[id]);
  };

  useEffect(() => {
    const socket = socketIOClient(settings.endpoint);

    try {
      // Get-Set Map Data from localStorage
      const localMapData = localStorage.getItem("mapData");
      // Update Current view if history is not enabled
      if (!viewHistory)
        setMapData(localMapData != null ? JSON.parse(localMapData) : []);

      // Socket Update
      socket.on("map:data", (data) => {
        if (data.stations.length > 0) {
          // Get-Set Map Data from Socket
          Object.keys(data.stations).map((key) => {
            return (data.stations[key].counter = counter);
          });
          setMapData(data.stations);

          /**
           * Save Volatile history
           *
           * Save until the history complete 100 items
           */
          counter++;
          if (counter < 100) {
            history[data.timestamp] = data.stations;
            setHistory(history);
          }
        }

        // Get-Set Map Settings
        const localMapSettings = localStorage.getItem("mapSettings");
        setMapSettings(
          localMapSettings != null
            ? JSON.parse(localMapSettings)
            : {
                scale: 12,
                position: [data.latitude, data.longitude],
                name: data.name,
                city: data.location.city,
              }
        );
      });
    } catch (error) {
      console.log(error);
    }

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    // Update Local Storage
    localStorage.setItem("mapSettings", JSON.stringify(mapSettings));
    localStorage.setItem("activeStation", activeStation);
    if (!viewHistory) localStorage.setItem("mapData", JSON.stringify(mapData));
  }, [mapSettings, mapData, activeStation, viewHistory]);

  return (
    <main className="App">
      <MapLeaflet
        settings={mapSettings}
        setSettings={setMapSettings}
        data={viewHistory ? dataActiveHistory : mapData}
        activeStation={activeStation}
        setActiveStation={setActiveStation}
      />
      <MapHistory
        history={history}
        viewHistory={viewHistory}
        checkHistory={checkHistory}
        activeHistory={activeHistory}
        selectHistory={selectHistory}
      />
      <section className="map-title">
        <h1>City Bikes in Miami</h1>
      </section>
    </main>
  );
}

export default App;
