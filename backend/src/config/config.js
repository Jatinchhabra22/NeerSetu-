module.exports = {
  // Database configuration
  database: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/neersetu',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h'
  },
  
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost'
  },
  
  // IoT configuration
  iot: {
    enabled: true,
    updateInterval: 30000, // 30 seconds
    maxRetries: 3
  },
  
  // ML Service configuration
  ml: {
    baseUrl: process.env.ML_SERVICE_URL || 'http://localhost:8001',
    timeout: 10000
  }
};
