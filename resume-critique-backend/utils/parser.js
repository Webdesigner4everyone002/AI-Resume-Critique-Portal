const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractTextFromFile(filePath) {
  if (filePath.endsWith('.pdf')) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } else if (filePath.endsWith('.docx')) {
    const data = await mammoth.extractRawText({ path: filePath });
    return data.value;
  } else {
    throw new Error('Unsupported file type');
  }
}

// Basic heuristic-based section parser
function parseResumeSections(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '');
  const joined = lines.join('\n');

  const sectionMap = {
    NameAndContact: lines.slice(0, 5).join(' '), // crude guess: first 3-5 lines
    Summary: extractSection(joined, /(summary|about me)/i),
    Skills: extractSection(joined, /skills/i),
    Experience: extractSection(joined, /(experience|work history)/i),
    Education: extractSection(joined, /education/i),
    Projects: extractSection(joined, /projects|personal projects/i),
  };

  return sectionMap;
}

function extractSection(text, headingRegex) {
  const regex = new RegExp(`(${headingRegex.source})([\\s\\S]*?)(\\n\\s*\\n|$)`, 'i');
  const match = regex.exec(text);
  return match ? match[2].trim() : 'Not Found';
}

module.exports = {
  extractTextFromFile,
  parseResumeSections
};
