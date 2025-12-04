import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import avatarImage from '../../icon/touxiang.jpg';
import Snackbars from './snackbars';
import Geren from './geren';
import Qita from './qita';
import AlertDialog from './dialog';
import PersonalInformation from './personalInformation';

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const PersistentDrawerLeft = () => {
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activeKey, setActiveKey] = useState('geren');
  //全局提示框显示内容
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackbarAnchorOrigin, setSnackbarAnchorOrigin] = useState({ vertical: "top", horizontal: "right" });
  const [alertDialogShow, setAlertDialogShow] = useState(false);
  // 用户信息
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const handleSaveAvatar = (data) => {
    setAvatar(data);
  }

  const handlePersonalInfo = () => {
    console.log('个人信息');
    handleCloseUserMenu(); // 关闭菜单
    handleAlertDialog();
  };

  const handleLogout = () => {
    handleCloseUserMenu(); // 关闭菜单
    console.log('退出登录');
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    navigate('/login');

  };

  const settings = [
    {
      label: '个人信息',
      handler: handlePersonalInfo
    },
    {
      label: '退出登录',
      handler: handleLogout
    }
  ];

  const navItems = [
    {
      key: 'geren',
      text: '个人',
      icon: <InboxIcon />,
      component: <Geren />,
      handler: () => setActiveKey('geren')
    },
    {
      key: 'qita',
      text: '其它',
      icon: <MailIcon />,
      component: <Qita />,
      handler: () => setActiveKey('qita')
    }
    // 新增导航项只需在这里添加配置即可
  ];


  useEffect(() => {
    console.log("登录成功了！！！！！");
    showSnackBar("success", `账号登录成功!`);
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    const authToken = localStorage.getItem('authToken');
    const userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    if (!currentUserData || !authToken) {
      navigate('/login');
    };
    if (userLoginData) {
      if (userLoginData.avatar) {
        setAvatar(userLoginData.avatar);
      }
      setPassword(userLoginData.password);
      setUserName(userLoginData.userName);
    };
  }, []);

  useEffect(() => {
    // 定义事件处理函数
    const handleBeforeUnload = (event) => {
      // 取消事件（遵循标准）
      event.preventDefault();
      // 为了兼容旧版浏览器，需要设置returnValue
      event.returnValue = '';
      // 可以在这里执行一些同步操作，但注意不能是异步的
      // 例如，可以尝试将数据保存到localStorage
      // localStorage.setItem('unsavedData', '一些需要保存的数据');
      console.log("页面即将刷新或关闭");
    };

    // 添加事件监听
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 清理函数：在组件卸载时移除事件监听
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // 空依赖数组表示这个effect只运行一次（在组件挂载和卸载时）

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const showSnackBar = (severity, text, anchorOrigin) => {
    // showSnackBar("error", `已退出账号`);
    // showSnackBar("success", `已退出账号`);
    // showSnackBar("info", `已退出账号`);
    // showSnackBar("warning", `已退出账号`);
    setSnackbarText(text);
    setSnackbarSeverity(severity);
    setSnackbarAnchorOrigin(anchorOrigin);
    setSnackbarShow(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarShow(false);
    setSnackbarText("");
  };

  const handleAlertDialog = () => {
    setAlertDialogShow(!alertDialogShow);
  }

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setUserName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  }

  const alertDialogConfirm = () => {
    console.log("确认");
    setAlertDialogShow();
    const userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    if (userLoginData) {
      userLoginData.userName = userName;
      userLoginData.password = password;
      userLoginData.avatar = avatar;
      userLoginData.loginTime = new Date().toISOString()
    }
    localStorage.setItem('userLoginData', JSON.stringify(userLoginData));
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            asdadasdas
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ paddingRight: "10px" }}>
                {userName}
              </Typography>
              <Tooltip title="设置" >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={avatar || avatarImage} />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}  // 使用label作为key更合适
                  onClick={setting.handler}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    {setting.label}  {/* 这里修正为显示label属性 */}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.handler}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Main open={open} sx={{ width: '100%', height: '100vh' }}>
        <DrawerHeader />
        {/* 从导航配置中找到当前激活的组件并渲染 */}
        {navItems.find(item => item.key === activeKey)?.component}
      </Main>

      <Snackbars
        open={snackbarShow}
        snackbarAnchorOrigin={snackbarAnchorOrigin}
        text={snackbarText}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />

      <AlertDialog
        showSnackBar={showSnackBar}
        open={alertDialogShow}
        title={"个人信息"}

        children={
          <PersonalInformation
            userName={userName}
            password={password}
            onNameChange={handleNameChange}
            onPasswordChange={handlePasswordChange}
            showSnackBar={showSnackBar}
            onSaveAvatar={handleSaveAvatar}
            avatar={avatar || avatarImage}
          />}
        handleClose={handleAlertDialog}
        confirm={alertDialogConfirm}
      />
    </Box>
  );
}

export default PersistentDrawerLeft;
