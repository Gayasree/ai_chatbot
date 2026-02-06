import React from 'react';
import { LayoutDashboard, BookOpen, MessageCircle, Settings, LogOut, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <BookOpen size={20} />, label: 'Study Vault', active: false },
    { icon: <MessageCircle size={20} />, label: 'Socratic AI', active: false },
  ];

  return (
    <div className="sidebar p-4 bg-white border-end d-flex flex-column">
      <div className="logo d-flex align-items-center mb-5">
        <div className="bg-indigo p-2 rounded-3 me-2 text-white">
          <BookOpen size={24} />
        </div>
        <h4 className="fw-bold mb-0 text-indigo">SOAL</h4>
      </div>

      <div className="nav-menu flex-grow-1">
        {menuItems.map((item, i) => (
          <div key={i} className={`d-flex align-items-center p-3 rounded-3 mb-2 cursor-pointer transition-all ${
            item.active ? 'bg-indigo text-white shadow-sm' : 'text-muted hover-bg-light'
          }`} style={{ cursor: 'pointer' }}>
            <span className="me-3">{item.icon}</span>
            <span className="fw-medium">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-footer pt-4 border-top">
        <div className="d-flex align-items-center p-3 text-muted mb-2">
          <HelpCircle size={20} className="me-3" />
          <span className="fw-medium">Help Center</span>
        </div>
        <div className="d-flex align-items-center p-3 text-danger">
          <LogOut size={20} className="me-3" />
          <span className="fw-medium">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;