import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, Button, Typography, Alert } from '@mui/material';
import ParticlesBackground from './widget/particlesBackground'; // 引入粒子背景组件
import { TextNormal } from './widget/listItemChildren';

// 密码找回页面
const PasswordRecoveryPage = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [code, setCode] = useState('');
  const [codeValueError, setCodeValueError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disabledCode, setDisabledCode] = useState('获取验证码');

  const navigate = useNavigate();
  // 获取验证码
  const getCode = () => {
    // TODO: 调用后端接口获取验证码
    console.log('获取验证码');
    setDisabled(true);
    let time = 60;
    const timer = setInterval(() => {
      time--;
      setDisabledCode(time + 's');
      if (time === 0) {
        clearInterval(timer);
        setDisabledCode('获取验证码');
        setDisabled(false);
      }
    }, 1000);
  };

  const handleConfirmed = () => {
    console.log('确认', userEmail, password, code);
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (userEmail === '' || !emailReg.test(userEmail)) {
      setUserEmailError(true);
      return;
    } else if (password === '') {
      setPasswordError(true);
      return;
    } else if (code === '') {
      setCodeValueError(true);
    } else {
      setUserEmailError(false);
      setPasswordError(false);
      setCodeValueError(false);
      console.log('重置密码成功');
    };
  };

  const handleLogin = () => {
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
            <Typography variant="h5" sx={{ paddingBottom: 2, textAlign: 'center' }}>重置密码</Typography>
          </Box>
          <Typography sx={{ fontSize: 12, paddingBottom: 1, }}>邮箱*</Typography>
          <TextNormal
            error={userEmailError}
            size="small"
            placeholder={'请输入注册邮箱'}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            sx={{ width: '100%', paddingBottom: 2 }}
            helperText={userEmailError && '邮箱格式错误'}
          />
          <Typography sx={{ fontSize: 12, paddingBottom: 1, }}>密码*</Typography>
          <TextNormal
            error={passwordError}
            size="small"
            placeholder={'请输入新密码'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '100%' }}
            helperText={passwordError && '密码不能为空'}
          />
          <Typography sx={{ fontSize: 12, paddingBottom: 1, paddingTop: 2 }}>验证码*</Typography>
          <TextNormal
            error={codeValueError}
            size="small"
            placeholder={'请输入验证码'}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ width: '66%', }}
            helperText={codeValueError && '验证码不能为空'}
            children={
              <Box sx={{ width: '33%' }}>
                <Button sx={{ width: '100%' }} variant="contained" disabled={disabled} onClick={getCode}>{disabledCode}</Button>
              </Box>
            }
          />
          <Typography sx={{ textAlign: 'center', color: '#1976d2', fontSize: 12, paddingTop: 3, cursor: 'pointer' }} onClick={handleLogin}>去登陆</Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 3, paddingBottom: 3 }}>
            <Button sx={{ width: '100%' }} variant="contained" onClick={handleConfirmed} >确定</Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default PasswordRecoveryPage;