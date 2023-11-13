import prisma from './client'
import { SongsDb } from '../use-cases/types';
import makeSongsDb from './songs-db';

const songsDb: SongsDb = makeSongsDb({ prisma });

export default songsDb;
