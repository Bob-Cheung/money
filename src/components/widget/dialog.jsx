import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

const AlertDialog = (props) => {

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent sx={{ minWidth: props.minWidth || 600 }}>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
          {props.children}
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={props.handleClose}>取消</Button>
          <Button onClick={props.confirm} autoFocus>
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default AlertDialog;