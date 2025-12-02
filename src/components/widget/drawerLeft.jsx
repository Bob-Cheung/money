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

  const navigate = useNavigate();

  const handlePersonalInfo = () => {
    handleCloseUserMenu(); // 关闭菜单
    console.log('个人信息');
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
    showSnackBar("success", `账号登录成功!`);
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    const authToken = localStorage.getItem('authToken');
    if (!currentUserData || !authToken) {
      navigate('/login');
    }
  }, []);

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
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={avatarImage} />
              </IconButton>
            </Tooltip>
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
    </Box>
  );
}

export default PersistentDrawerLeft;
