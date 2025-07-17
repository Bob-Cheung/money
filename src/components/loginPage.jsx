import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, TextField, Button, Typography, Alert } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import WeiXin from '../icon/weixin_mw.svg'
import QQ from '../icon/QQ.svg'
import ParticlesBackground from './particlesBackground'; // 引入粒子背景组件

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
      if (userEmail === userLoginData.userEmail && password === userLoginData.password) {
        navigate('/home'); // 点击后切换到 Home 页面
      } else {
        setLoadingError(true);
        setTimeout(() => {
          setLoadingError(false);
        }, 3000);
      }
    }, 3000);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(); // 按下回车键时调用登录函数
    }
  };

  // const handleGitHubLogin = () => {
  //   window.location.href = 'https://github.com/'; // 点击后跳转到 GitHub
  // }

  useEffect(() => {
    const userLoginData = localStorage.getItem('userLoginData');
    if (!userLoginData) {
      const data = {
        userEmail: 'admin',
        password: '123',
      };
      localStorage.setItem('userLoginData', JSON.stringify(data)); // 确保数据是字符串格式
    }
  }, []);

  return (
    <>
      <ParticlesBackground /> {/* 使用粒子背景组件 */}
      <Paper
        elevation={24}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          // height: 450,
          backgroundColor: 'rgb(245, 246, 250)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '80%', paddingTop: 5 }}>
          <Box sx={{ paddingBottom: 2 }}>
            <Typography variant="h5" sx={{ paddingBottom: 2, textAlign: 'center' }}>Sign in</Typography>
            <Typography variant="h8" sx={{ textAlign: 'center' }}>Welcome user, please sign in to continue</Typography>
          </Box>
          <Typography sx={{ fontSize: 12, paddingBottom: 1, }}>Emaix*</Typography>
          <TextField
            // label="Email"
            size="small"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            sx={{ width: '100%', paddingBottom: 2 }}
          />
          <Typography sx={{ fontSize: 12, paddingBottom: 1, }}>Password*</Typography>
          <TextField
            // label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            sx={{ width: '100%' }}
            onKeyDown={handleKeyDown}
          />
          {
            loadingError &&
            <Box sx={{ paddingTop: 3 }}>
              <Alert severity="error">账户或密码错误.</Alert>
            </Box>
          }
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 3, }}>
            <Button sx={{ width: '100%' }} loading={loading} variant="contained" onClick={handleLogin}>登录/注册</Button>
          </Box>
        </Box>
        <Box sx={{ paddingTop: 2, paddingBottom: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ textAlign: 'center', color: 'rgba(0,0,0,0.60)', fontSize: 12 }}>其它登录方式</Typography>
          <Box sx={{ paddingTop: 2 }}>
            <GitHubIcon sx={{ cursor: 'grabbing' }} />
            <img style={{ width: "24px", marginLeft: "10px", cursor: 'grabbing' }} src={WeiXin} />
            <img style={{ width: "24px", marginLeft: "10px", cursor: 'grabbing' }} src={QQ} />
          </Box>
        </Box>

      </Paper>
    </>
  );
};

export default LoginPage;