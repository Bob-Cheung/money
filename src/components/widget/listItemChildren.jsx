import React, { useEffect, useState } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  TextField,
  Input,
  InputAdornment,
  IconButton,
  Box,
  Button,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const ListItemBox = (props) => {
  return (
    <ListItem>
      <ListItemIcon sx={{ minWidth: '40px' }}>
        {props.icon}
      </ListItemIcon>
      <ListItemText id="switch-list-label-wifi" primary={props.name} />
      {props.children}
    </ListItem>
  );
}


const IconButtonItem = (props) => {
  return (
    <ListItemBox
      icon={props.icon}
      name={props.name}
      children={
        <IconButton onClick={props.onClick}>
          <Avatar alt="Remy Sharp" src={props.avatarImage} />
        </IconButton>
      }
    />
  );
}

const SwitchItem = (props) => {
  return (
    <ListItemBox
      children={<Switch
        edge="end"
        onChange={props.onChange}
        checked={props.checked}
        inputProps={{
          'aria-labelledby': 'switch-list-label-wifi',
        }}
      />}
    />
  );
}
const TextItem = (props) => {
  return (
    <ListItemBox
      icon={props.icon}
      name={props.name}
      children={
        <Box sx={{ width: 200 }}>
          <TextField
            id="standard"
            variant="standard"
            label={props.label}
            value={props.value}
            onChange={props.onChange}
            autoComplete="current-password"
          />
        </Box>}
    />
  );
}

const PasswordText = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (

    <ListItemBox
      icon={props.icon}
      name={props.name}
      children={
        <Box sx={{ width: 200 }}>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={props.onChange}
            value={props.value}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      }
    />
  );
}

// 普通的ListItem
const TextNormal = (props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <TextField
        label={props.label}
        placeholder={props.placeholder}
        error={props.error}
        size={props.size || 'small'}
        value={props.value}
        onChange={props.onChange}
        sx={props.sx}
        helperText={props.helperText}
      >
      </TextField>
      {props.children}
    </Box>
  );
}

// 对话框
const DialogBox = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {
          props.handleConfirmed && <Button onClick={props.handleConfirmed}>确定</Button>
        }
        {
          props.handleCancel && <Button onClick={props.handleCancel}>取消</Button>
        }
      </DialogActions>
    </Dialog>
  );
}

export {
  SwitchItem,
  TextItem,
  PasswordText,
  IconButtonItem,
  TextNormal,
  DialogBox
};