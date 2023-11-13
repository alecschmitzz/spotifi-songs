import { PrismaClient } from '../../prisma/generated/client';
import { SongsDb } from '../use-cases/types';
import makeSongsDb from './songs-db';

const prisma = new PrismaClient();

const songsDb: SongsDb = makeSongsDb({ prisma });

export default songsDb;
