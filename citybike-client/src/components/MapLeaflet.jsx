import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

export const MapLeaflet = ({
  settings,
  setSettings,
  data,
  activeStation,
  setActiveStation,
}) => {
  const markerpoint = new Icon({
    iconUrl: "/markerpoint.svg",
    iconSize: [25, 25],
  });

  const focusStation = (station) => {
    setSettings({
      ...settings,
      position: [station.latitude, station.longitude],
      scale: 16,
    });
    setActiveStation(station.id);
  };

  const closeStation = () => {
    setActiveStation(null);
  };

  return (
    <section className="map">
      <Map center={settings.position} zoom={settings.scale}>
        {data.map((station) =>
          station.id !== activeStation ? (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={markerpoint}
              onClick={() => {
                focusStation(station);
              }}
            />
          ) : (
            <Popup
              key={station.id}
              position={[station.latitude, station.longitude]}
              onClose={() => {
                closeStation();
              }}
            >
              <div>
                <h2>{station.name}</h2>
                <hr/>
                <p>
                  <b>Free Bikes:</b> {station.free_bikes}, <b>Empty Slots:</b> {station.empty_slots}
                  <br />
                  Data #{station.counter}
                </p>
              </div>
            </Popup>
          )
        )}

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    </section>
  );
};
