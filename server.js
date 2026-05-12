const express = require('express');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/config');
const app = express();
const port = 3000;
connectDB()
.then(() => {
  console.log('Database connected successfully');
  app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
})
.catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});



app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Ashish!');
});


