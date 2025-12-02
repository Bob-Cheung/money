import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const Geren = (props) => {

  const handleFileChange = (event) => {
    console.log(event.target.files);
  }
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', width: '80%', display: 'flex', flexDirection: "column", alignItems: 'center' }}>
        <Typography variant="h2" >
          人声分离
        </Typography>
        <Typography variant="h5">
          通过人工智能技术，对音视频进行高质量的分离，分离出人声和背景音乐，短视频链接一键提取音乐。常用于人声消除、bgm提取、人声提取、伴奏提取、卡拉ok伴奏制作、视频转音频
        </Typography>
        <Box sx={{ width: '100%', height: 455, marginTop: "50px", backgroundColor: "#dedede" }}>
          <Box sx={{ width: '100%', height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              选择音频/视频文件
              <VisuallyHiddenInput
                type="file"
                accept=".mp3, .mp4"
                onChange={handleFileChange}
                multiple
              />
            </Button>
            <Typography sx={{ color: '#606266', fontSize: '14px', marginTop: '10px' }}>
              支持时长 10 分钟内的 mp4、wav、mp3 等主流格式，且不超过500M
            </Typography>
          </Box>
          <Box sx={{ width: '500px', height: '30px', backgroundColor: 'red' }}>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default Geren;