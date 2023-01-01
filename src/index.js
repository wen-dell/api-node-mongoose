const app = require('./app');
const loaders = require('./loaders');

loaders.start();

app.listen(3333, () => console.log('Server is running'));