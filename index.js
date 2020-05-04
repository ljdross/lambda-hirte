const path = require('path');
const express = require('express');
const index = express();

// Setup view engine
index.set('view engine', 'pug');

index.use(express.static('dist'));
index.use(express.static('src'));

index.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 80;
index.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
