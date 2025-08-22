import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const DrawerLeftListItem = (props) => {

  const handleItemA = () => {
    console.log('Item A clicked');
  };
  const handleItemB = () => {
    console.log('Item B clicked');
  }

  const listItems = [
    { text: '个人', icon: <InboxIcon />, handler: handleItemA },
    { text: '其它', icon: <MailIcon />, handler: handleItemB },
    // 其他项...
  ];
  return (
    <List>
      {listItems.map((item, index) => (
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
  )
}

export default DrawerLeftListItem