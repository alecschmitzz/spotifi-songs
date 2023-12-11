import { PrismaClient } from '../../prisma/generated/client';
type Song = import('../../prisma/generated/client').Song;
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from './client'

jest.mock('./client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
export { Song }; // Export the Song type