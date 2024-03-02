const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const getconfig = require('./src/config/config');
const app = express();
const cors = require('cors');
const authenController = require('./src/controllers/authenController')


app.use(cors({credentials: true,
  origin: true,}));


// Serve static files
app.use(express.static(path.join(__dirname, '..', 'apartment-management-fontend', 'build')));

// Catch-all route for serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'apartment-management-fontend', 'build', 'index.html'));
});


app.use((req, res, next) => {
  const dbName = req.header('dbName')
  const token = req.header('Authorization')
  console.log(token)
  if(req.path === '/Login' || req.path ==='/Authen'){
    console.log('Proxying to original server');
    return createProxyMiddleware({ target: `http://localhost:4600`, changeOrigin: true })(req, res, next);
  }
  else if (dbName === 'LaithongHouse') {
     console.log('Proxying to target server');
    return createProxyMiddleware({ target: `http://localhost:4600`, changeOrigin: true })(req, res, next);
  }else if(dbName === 'LaithongResort'){
    console.log('Proxying to target server');
    return createProxyMiddleware({ target: `http://localhost:4700`, changeOrigin: true })(req, res, next);
  } 
  else{
    console.log('Proxying to original server');
    return createProxyMiddleware({ target: `http://localhost:4600`, changeOrigin: true })(req, res, next);
  }
});

app.listen(getconfig.PORT, function () {
  console.log(`CORS-enabled web server listening on port ${getconfig.PORT}`);
});
