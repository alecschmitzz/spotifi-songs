import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
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
app.get(`${apiRoot}`, (req, res) => {
  res.json({ message: "Ok it works...", hostname: os.hostname(), version: "0.0.1-beta2" })
})
app.use(makeCallback(notFound));

// listen for requests
app.listen(`${process.env.PORT}`, () => {
  console.log(`============ ${process.env.STATUS} ============`);
  console.log(`Server is listening on port ${process.env.PORT}${apiRoot}`);
});

export default app;
