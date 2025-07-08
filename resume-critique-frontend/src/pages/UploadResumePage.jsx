import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UploadResumePage = () => {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !jobRole) {
      alert('Please select a resume and enter job role');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobRole', jobRole);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to /results with state
        navigate('/results', { state: { result: data } });
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading resume');
    }
  };

  return (
   
    <div style={{ padding: '2rem' }}>
       <Navbar/>
      <h2>Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Enter Job Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Upload & Analyze</button>
      </form>
    </div>
  );
};

export default UploadResumePage;
