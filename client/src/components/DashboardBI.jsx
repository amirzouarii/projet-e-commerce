import React from "react";

const DashboardBI = () => {
  return (
    <div style={{ width: "100%", height: "700px" }}>
      <iframe
        title="Power BI Dashboard"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/view?r=eyJrIjoiNGNmYzkxOTEtMmE2OC00MTM1LTg1ZTktOGEwM2E5ZGY5Y2IxIiwidCI6ImI3YmQ0NzE1LTQyMTctNDhjNy05MTllLTJlYTk3ZjU5MmZhNyJ9"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default DashboardBI;
