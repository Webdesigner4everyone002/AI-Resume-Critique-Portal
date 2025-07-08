const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { extractTextFromFile, parseResumeSections } = require('./utils/parser');
const { getSectionFeedback } = require('./utils/aiFeedback');

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // You MUST create this folder manually
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage });

// Resume upload & feedback API
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  const jobRole = req.body.jobRole;
  const file = req.file;

  if (!file || !jobRole) {
    return res.status(400).json({ error: 'File or job role missing' });
  }

  try {
    // Step 1: Extract text from resume
    const rawText = await extractTextFromFile(file.path);

    // Step 2: Parse sections (e.g., Skills, Education, etc.)
    const parsedSections = parseResumeSections(rawText);

    // Step 3: Generate AI feedback for each section
    const feedback = {};
    for (const section in parsedSections) {
      const text = parsedSections[section];
      feedback[section] = await getSectionFeedback(text, section, jobRole);
    }

    // Step 4: Respond with parsed sections + feedback
    return res.json({
      message: '✅ Resume processed successfully!',
      jobRole,
      sections: parsedSections,
      feedback: feedback
    });
  } catch (error) {
    console.error('Error during resume processing:', error);
    return res.status(500).json({ error: '❌ Failed to process resume' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))