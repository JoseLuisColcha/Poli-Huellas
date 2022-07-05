import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const { addAlert, alerts } = useAlertProvider();
  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      {alerts &&
        alerts.map((alert) => {
          return (
            <Snackbar key={alert} open={true} autoHideDuration={6000}>
              <Alert
                // onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {alert}
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

  const alertProvider = {
    addAlert: (alert) => {
      setAlerts([...alerts, alert]);
    },
    alerts,
  };

  return alertProvider;
}
