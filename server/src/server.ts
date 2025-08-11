import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

console.log('--- SERVER PROCESS STARTED ---'); // Log to confirm the file runs

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// --- THE FIX ---
// Use cors() as the VERY FIRST middleware.
// Calling it with no options allows requests from ALL origins.
// This is our best chance to bypass the block.
app.use(cors());
// --- END OF FIX ---

app.use(express.json());

app.get('/api', (req, res) => {
  console.log('✅ Request received at /api endpoint');
  res.json({ message: '✅ API is running and connection is successful!' });
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});