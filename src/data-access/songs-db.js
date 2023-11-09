export default function makeSongsDb({ prisma }) {
  return Object.freeze({
    findAll,
    findById,
    findByHash,
    insert,
    update,
    remove,
  });

  async function findAll() {
    return prisma.song.findMany();
  }

  async function findById({ id }) {
    return prisma.song.findFirst({
      where: { id },
    });
  }

  async function findByHash({ hash }) {
    return prisma.song.findFirst({
      where: { hash }
    });
  }

  async function insert(song) {
    return prisma.song.create({
      data: song,
    });
  }

  async function update({ id, ...songInfo }) {
    return prisma.song.update({
      where: { id },
      data: songInfo,
    });
  }

  async function remove({ id }) {
    return prisma.song.delete({
      where: { id },
    });
  }
}
