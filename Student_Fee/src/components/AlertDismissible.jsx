import React from "react";
import { useMyContext } from '../global/MyContext.jsx';

const AlertDismissible = () => {
  const { alerts, removeAlert } = useMyContext();

  return (
    <>
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`${alert.color} py-2 z-50 px-4 rounded-md text-white text-center fixed right-4 flex gap-4`}
          style={{ bottom: `${4 + index * 60}px` }} // Adjust the bottom position for stacking
        >
          <p>{alert.message}</p>
          <span className="cursor-pointer font-bold" onClick={() => removeAlert(index)}>
            <sup>X</sup>
          </span>
        </div>
      ))}
    </>
  );
};

export default AlertDismissible;