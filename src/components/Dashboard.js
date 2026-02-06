import React from 'react';
import { BarChart2, Target, Award, Layers } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Remembering', val: 90, color: 'bg-primary' },
    { label: 'Understanding', val: 75, color: 'bg-info' },
    { label: 'Applying', val: 40, color: 'bg-success' },
    { label: 'Analyzing', val: 15, color: 'bg-warning' },
    { label: 'Evaluating', val: 5, color: 'bg-danger' },
  ];

  return (
    <div className="row g-4 mb-4">
      <div className="col-md-7">
        <div className="card glass-card rounded-4 p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold mb-0 d-flex align-items-center">
              <Layers className="text-indigo me-2" size={20} />
              Bloom's Taxonomy Progress
            </h6>
            <Target size={18} className="text-muted" />
          </div>
          
          {stats.map((item, i) => (
            <div key={i} className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span className="small text-muted">{item.label}</span>
                <span className="small fw-bold">{item.val}%</span>
              </div>
              <div className="progress rounded-pill" style={{ height: '10px' }}>
                <div 
                  className={`progress-bar ${item.color} rounded-pill`} 
                  role="progressbar" 
                  style={{ width: `${item.val}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-md-5">
        <div className="card glass-card rounded-4 p-4 h-100 border-indigo-soft shadow-sm">
          <h6 className="fw-bold mb-3 d-flex align-items-center">
            <Award className="text-indigo me-2" size={20} />
            Learning Milestones
          </h6>
          <div className="milestone-item d-flex align-items-center mb-3 p-3 bg-white rounded-3 border">
            <div className="bg-success-soft p-2 rounded-circle me-3">
              <i className="bi bi-check2 text-success"></i>
            </div>
            <div>
              <div className="fw-bold small">Concept Mastery</div>
              <div className="text-muted small">You mastered "Gradient Descent"</div>
            </div>
          </div>
          <div className="milestone-item d-flex align-items-center p-3 bg-light rounded-3 opacity-75">
            <div className="bg-secondary-soft p-2 rounded-circle me-3">
              <i className="bi bi-lock text-muted"></i>
            </div>
            <div>
              <div className="fw-bold small">Synthesis Expert</div>
              <div className="text-muted small">Apply concepts to new scenarios</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;