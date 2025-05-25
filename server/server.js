const app = require('./src/app');
const config = require('./src/config/environment');

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express en http://localhost:${PORT}`);
});