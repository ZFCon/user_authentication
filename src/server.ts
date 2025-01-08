import app from './app';
import connectDB from './config/db.config';

const PORT = +(process.env.PORT || '5000');

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
