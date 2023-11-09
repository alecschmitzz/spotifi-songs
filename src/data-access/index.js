import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


import makeSongsDb from './songs-db';

const songsDb = makeSongsDb({ prisma });
export default songsDb;
