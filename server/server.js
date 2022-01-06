const express = require('express');
const cookieParser = require('cookie-parser');
// Allows different web pages to share resources and communicate with each other
// Will be used so that Postman can make HTTP requests to our localhost
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// Parses incoming requests to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server is fired up and ready to go on port ${port}`));