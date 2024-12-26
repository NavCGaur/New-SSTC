import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/test', (req, res) => {
  res.send('Test endpoint hit');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

export default app;
