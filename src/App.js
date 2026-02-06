import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import SocraticChat from './components/SocraticChat';
import { Search, Bell, User } from 'lucide-react';

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      
      <main className="main-content flex-grow-1">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center mb-5">
          <div className="search-bar flex-grow-1 max-w-md">
            <div className="input-group bg-white rounded-pill px-3 py-1 shadow-sm border" style={{ maxWidth: '400px' }}>
              <span className="input-group-text bg-transparent border-0 text-muted">
                <Search size={18} />
              </span>
              <input 
                type="text" 
                className="form-control bg-transparent border-0 shadow-none" 
                placeholder="Search topics or files..." 
              />
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light rounded-circle p-2 shadow-sm border position-relative">
              <Bell size={20} className="text-muted" />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
            <div className="d-flex align-items-center gap-2 bg-white p-1 pe-3 rounded-pill shadow-sm border">
              <div className="bg-indigo rounded-circle p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <User size={18} />
              </div>
              <span className="fw-semibold small">Dharshini</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-5">
          <h2 className="fw-bold mb-1">Welcome back, Dharshini! 👋</h2>
          <p className="text-muted">You're currently in <strong>Apply</strong> mode for Neural Networks.</p>
        </section>

        <Dashboard />

        <div className="row g-4">
          <div className="col-lg-5">
            <FileUpload />
          </div>
          <div className="col-lg-7">
            <SocraticChat />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;