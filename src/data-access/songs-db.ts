import { PrismaClient, Song } from "../../prisma/generated/client";
import { SongsDb } from "../use-cases/types";

export default function makeSongsDb({ prisma }: { prisma: PrismaClient }): SongsDb {
  return Object.freeze({
    findAll,
    findById,
    findByHash,
    insert,
    update,
    remove,
  });

  async function findAll(): Promise<Song[]> {
    return prisma.song.findMany();
  }

  async function findById({ id }: { id: string }): Promise<Song | null> {
    return prisma.song.findFirst({
      where: { id },
    });
  }

  async function findByHash({ hash }: { hash: string }): Promise<Song | null> {
    return prisma.song.findFirst({
      where: { hash },
    });
  }

  async function insert(song: Song): Promise<Song> {
    return prisma.song.create({
      data: song,
    });
  }

  async function update({ id, ...songInfo }: { id: string } & Partial<Song>): Promise<Song> {
    return prisma.song.update({
      where: { id },
      data: songInfo,
    });
  }

  async function remove({ id }: { id: string }): Promise<Song> {
    return prisma.song.delete({
      where: { id },
    });
  }
}
