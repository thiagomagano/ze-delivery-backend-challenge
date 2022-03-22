const express = require('express');


const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello Server!' });
})

app.listen(process.env.PORT || 8080, () => console.log('Server runnning in http://localhost:8080'))