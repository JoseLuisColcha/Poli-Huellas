import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const { addAlert, alerts, setAlerts } = useAlertProvider();

  const handleClose = (index) => {
    const newAlerts = alerts.map((alt, i) =>
      i === index ? { ...alt, open: false } : alt
    );
    setAlerts(newAlerts);
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      {alerts &&
        alerts.map((alert, index) => {
          return (
            <Snackbar
              key={index}
              open={alert.open}
              autoHideDuration={alert.duration || 6000}
              message={alert.text}
              onClose={() => handleClose(index)}
            >
              <Alert
                onClose={() => handleClose(index)}
                severity={alert.severity}
                sx={{ width: "100%" }}
              >
                {alert.text}
              </Alert>
            </Snackbar>
          );
        })}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AuthProvider");
  }
  return context;
};

function useAlertProvider() {
  const [alerts, setAlerts] = useState([]);

  const addAlert = ({ open = true, ...rest }) => {
    setAlerts([...alerts, { ...rest, open }]);
  };

  const alertProvider = {
    addAlert,
    alerts,
    setAlerts,
  };

  return alertProvider;
}
