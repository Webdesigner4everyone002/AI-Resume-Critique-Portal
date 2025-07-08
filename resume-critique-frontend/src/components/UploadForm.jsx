import React, { useState } from 'react';
import './UploadForm.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobRole) {
      setMessage("Please upload a resume and select a job role.");
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
        setMessage("Resume uploaded successfully! Processing...");
        console.log(data); // You can navigate to /results later
      } else {
        setMessage(data.error || "Upload failed.");
      }
    } catch (error) {
      setMessage("Server error: " + error.message);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      <select value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
        <option value="">Select Job Role</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="Data Scientist">Data Scientist</option>
        <option value="Product Manager">Product Manager</option>
      </select>
      <button type="submit">Submit</button>
      {message && <p className="upload-message">{message}</p>}
    </form>
  );
};

export default UploadForm;
