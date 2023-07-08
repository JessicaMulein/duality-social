import express from 'express';
import path from 'path';
import rateLimit from 'express-rate-limit';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const rootPath = process.env.ROOT_PATH ?? path.join(__dirname, '../../../../../..');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: "Too many requests from this IP, please try again later"
});

app.use(limiter);

app.use(express.static(path.join(rootPath, 'dist/packages/duality-social-react')));

app.get('*', (req, res) => {
  res.sendFile(path.join(rootPath, 'dist/packages/duality-social-react/index.html'));
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
