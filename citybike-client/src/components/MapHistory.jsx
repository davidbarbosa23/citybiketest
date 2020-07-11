import React from "react";

export const MapHistory = ({
  history,
  viewHistory,
  checkHistory,
  activeHistory,
  selectHistory,
}) => {

  return (
    <section className="map-history">
      <div className="check">
        <input
          id="show-history"
          type="checkbox"
          className="form-check-input"
          checked={viewHistory}
          onChange={(e) => checkHistory(e.target.checked)}
        />
        <label htmlFor="show-history">History Mode</label>
      </div>
      {viewHistory && (
        <ul>
          {Object.keys(history)
            .sort()
            .reverse()
            .map((key) => {
              const parseDate = new Date(parseFloat(key));
              const ISOdate = parseDate.toISOString().split("T");
              return (
                <li
                  key={key}
                  onClick={() => {
                    selectHistory(key);
                  }}
                  className={key == activeHistory ? "active" : ""}
                >
                  {ISOdate[1].slice(0, 8)}
                </li>
              );
            })}
        </ul>
      )}
    </section>
  );
};
