import React from 'react';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


const Snackbars = (props) => {
  return (
    <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert elevation={10} severity={props.severity} sx={{ width: "100%" }}>
        {props.text}
      </Alert>
    </Snackbar>
  );
}

export default Snackbars;