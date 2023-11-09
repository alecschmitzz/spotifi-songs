import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
  postSong,
  getSong,
  getSongs,
  patchSong,
  deleteSong,
  notFound,
} from './controllers'; // Adjust the import paths according to your project structure
import makeCallback from './express-callback';

dotenv.config();

const apiRoot = process.env.API_ROOT;
const app = express();
app.use(bodyParser.json());
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
  res.set({ Tk: '!' });
  next();
});
app.post(`${apiRoot}/songs`, makeCallback(postSong));
app.delete(`${apiRoot}/songs/:id`, makeCallback(deleteSong));
app.delete(`${apiRoot}/songs`, makeCallback(deleteSong));
app.patch(`${apiRoot}/songs/:id`, makeCallback(patchSong));
app.patch(`${apiRoot}/songs`, makeCallback(patchSong));
app.get(`${apiRoot}/songs`, makeCallback(getSongs));
app.get(`${apiRoot}/songs/:id`, makeCallback(getSong));
app.use(makeCallback(notFound));

// listen for requests
app.listen(3000, () => {
  console.log(`Server is listening on port 3000${apiRoot}`);
});

export default app;
