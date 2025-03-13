import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { path: filePath } = req.query;
  
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }
  
  try {
    // Read the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Determine content type based on file extension
    const extension = path.extname(filePath).toLowerCase();
    let contentType = 'text/plain';
    
    if (extension === '.md') {
      contentType = 'text/markdown';
    } else if (extension === '.json') {
      contentType = 'application/json';
    } else if (extension === '.js') {
      contentType = 'text/javascript';
    } else if (extension === '.css') {
      contentType = 'text/css';
    }
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.status(200).send(fileContent);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
}
