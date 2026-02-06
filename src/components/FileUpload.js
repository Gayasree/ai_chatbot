import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Trash2 } from 'lucide-react';

const FileUpload = () => {
  const [files, setFiles] = useState([
    { name: 'Lecture_Notes_Unit1.pdf', size: '2.4 MB', status: 'Analyzed' }
  ]);

  return (
    <div className="card glass-card rounded-4 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Study Materials</h5>
        <span className="badge bg-indigo-soft text-indigo rounded-pill px-3 py-2">
          {files.length} Documents
        </span>
      </div>

      <div className="upload-zone rounded-4 p-5 text-center mb-4">
        <Upload className="text-indigo mb-3" size={40} />
        <h6 className="fw-semibold">Upload Research PDF or Lecture Notes</h6>
        <p className="text-muted small">Max file size: 50MB. Support for PDF, DOCX</p>
        <button className="btn btn-indigo px-4 py-2 rounded-pill mt-2">
          Select Files
        </button>
      </div>

      <div className="file-list">
        {files.map((file, idx) => (
          <div key={idx} className="d-flex align-items-center p-3 mb-2 bg-white rounded-3 border">
            <div className="bg-indigo-soft p-2 rounded-2 me-3">
              <FileText size={20} className="text-indigo" />
            </div>
            <div className="flex-grow-1">
              <div className="fw-medium small">{file.name}</div>
              <div className="text-muted" style={{ fontSize: '11px' }}>{file.size} • {file.status}</div>
            </div>
            <CheckCircle size={18} className="text-success me-3" />
            <button className="btn btn-link text-danger p-0">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;