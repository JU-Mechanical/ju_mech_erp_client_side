//? This compoenent sets an alert message to the user
import React, { useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";

const AlertNotification = ({ type, message, title, onClose, duration = 5000 }) => {
    useEffect(()=>{
        if(onClose) {
            const time = setTimeout(()=>{
                onClose();
            },duration);

            return ()=>clearTimeout(time);
        }
    },[onClose, duration])
  
    return message && (
    <Alert
      severity={type} // Use the type directly as the severity (success, error, warning, info)
      sx={{
        margin: "16px 0",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};

export default AlertNotification;