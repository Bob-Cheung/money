import React from 'react';
// 1. 把 BrowserRouter 改成 HashRouter（核心修改）
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerPage';
import PasswordRecoveryPage from './components/PasswordRecoveryPage';
import Home from './components/home';

function App() {
  return (
    <Router>
      <Routes>
        {/* 路由路径无需修改，HashRouter 会自动处理 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/passwordRecovery" element={<PasswordRecoveryPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;