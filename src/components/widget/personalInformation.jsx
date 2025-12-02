import React, { useEffect, useState, useRef } from 'react';
import {
  List,
  ListSubheader,
  Box,
  Avatar,
  Button
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
  TextItem,
  PasswordText,
  IconButtonItem
} from './listItemChildren';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import AlertDialog from './dialog';

const PersonalInformation = (props) => {
  const [avatar, setAvatar] = useState(null);
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // 打开头像更换对话框
  const changeAvatar = () => {
    setAvatarDialogOpen(true);
  }

  // 关闭对话框
  const handleCloseDialog = () => {
    setAvatarDialogOpen(false);
    setSelectedImage(null);
  }

  // 处理文件选择
  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    // 验证文件类型和大小
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      props.showSnackBar("error", "请选择图片文件");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB限制
      props.showSnackBar("error", "图片大小不能超过5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  // 保存新头像
  const saveAvatar = () => {
    if (selectedImage) {
      setAvatar(selectedImage);
      props.onSaveAvatar(selectedImage);
      setAvatarDialogOpen(false);
    }
  }

  // 触发文件选择
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>{props.title}</ListSubheader>}
    >
      <TextItem
        name="用户名"
        icon={<BadgeIcon />}
        type="text"
        value={props.userName}
        onChange={props.onNameChange}
      />
      <PasswordText
        name="密码"
        icon={<KeyIcon />}
        value={props.password}
        onChange={props.onPasswordChange}
      />
      <IconButtonItem
        name="头像"
        icon={<AccountCircleIcon />}
        avatarImage={props.avatar}
        onClick={changeAvatar}
      />

      <AlertDialog
        minWidth={400}
        open={avatarDialogOpen}
        title={"头像选择"}
        children={
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Avatar
              src={selectedImage || avatar}
              sx={{ width: 120, height: 120, mb: 2 }}
            />

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              style={{ display: 'none' }}
            />

            <Button
              variant="contained"
              component="span"
              onClick={triggerFileSelect}
              startIcon={<PhotoCameraIcon />}
            >
              选择图片
            </Button>
          </Box>
        }
        handleClose={handleCloseDialog}
        confirm={saveAvatar}
      />

    </List>
  );
}
export default PersonalInformation