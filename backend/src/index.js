/* eslint-disable no-console */
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    return console.error('Error while starting the app:', err.message);
  }
  return console.log(`Server listening on http://localhost:${PORT}/`);
});
