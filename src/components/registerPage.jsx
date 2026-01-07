import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, Button, Typography, Alert } from '@mui/material';
import ParticlesBackground from './widget/particlesBackground'; // 引入粒子背景组件
import { TextNormal, DialogBox } from './widget/listItemChildren';
import Snackbars from './widget/snackbars';

// 注册页面组件
const RegisterPage = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [snackbarShow, setSnackbarShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    console.log(userEmail, password);
    // 判断邮箱格式是否正确
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (userEmail === '' || !emailReg.test(userEmail)) {
      setUserEmailError(true);
      return;
    } else if (password === '') {
      setPasswordError(true);
      return;
    } else {
      setUserEmailError(false);
      setPasswordError(false);

      const data = {
        userEmail: userEmail,
        userName: userEmail,
        password: password,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('userLoginData', JSON.stringify(data));
      setSnackbarShow(true);
      setShowDialog(true);
    };
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    };
    setSnackbarShow(false);
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  const handleExistingAccount = () => {
    navigate('/login');
  };

  return (
    <>
      <ParticlesBackground />
      <Paper
        elevation={24}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: 'rgb(245, 246, 250)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '80%', paddingTop: 5 }}>
          <Box sx={{ paddingBottom: 2 }}>
            <Typography variant="h5" sx={{ paddingBottom: 2, textAlign: 'center' }}>注册</Typography>
          </Box>
          <Typography sx={{ fontSize: 12, paddingBottom: 1, }}>邮箱*</Typography>
          <TextNormal
            error={userEmailError}
            size="small"
            placeholder={'请输入邮箱'}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            sx={{ width: '100%', paddingBottom: 2 }}
            helperText={userEmailError && '邮箱格式错误'}
          />
          <Typography sx={{ fontSize: 12, paddingBottom: 1, }}>密码*</Typography>
          <TextNormal
            error={passwordError}
            size="small"
            placeholder={'请输入密码'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '100%' }}
            helperText={passwordError && '密码不能为空'}
          />
          <Typography sx={{ textAlign: 'center', color: '#1976d2', fontSize: 12, paddingTop: 3, cursor: 'pointer' }} onClick={handleExistingAccount}>已有帐号</Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 3, paddingBottom: 3 }}>
            <Button sx={{ width: '100%' }} variant="contained" onClick={handleRegister}>注册</Button>
          </Box>
        </Box>
      </Paper>
      <DialogBox
        open={showDialog}
        description={'前往登录页面登录'}
        handleConfirmed={handleExistingAccount}
        handleCancel={handleDialogCancel}
      />
      <Snackbars
        open={snackbarShow}
        snackbarAnchorOrigin={{ vertical: "top", horizontal: "right" }}
        text={'注册成功!'}
        severity={'success'}
        handleClose={handleSnackbarClose}
      />
    </>
  )
};

export default RegisterPage;