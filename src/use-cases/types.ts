export type Song = {
    id?: string;
    title?: string;
    artist?: string;
    duration?: number;
    genre?: string;
    released?: boolean;
    album?: string;
    hash?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SongsDb {
    findAll: () => Promise<Song[]>;
    findById: (params: { id: string }) => Promise<Song | null>;
    findByHash: (params: { hash: string }) => Promise<Song | null>;
    insert: (song: any) => Promise<Song>;
    update: (params: { id: string } & Partial<Song>) => Promise<Song>;
    remove: (params: { id: string }) => Promise<Song>;
}

export interface HttpRequest {
    body: any;
    query: any;
    params: any;
    ip?: string;
    method: string;
    path: string;
    headers: {
        'Content-Type'?: string;
        Referer?: string;
        'User-Agent'?: string;
    };
}

export interface HttpResponse {
    statusCode: number;
    headers?: Record<string, string>;
    body?: any;
}
