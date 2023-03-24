import { createLibp2p, Libp2pOptions } from 'libp2p'
import { MemoryDatastore } from 'datastore-core'
import { MemoryBlockstore } from 'blockstore-core'
import { createHelia } from 'helia'
import type { Helia } from '@helia/interface';
import { UnixFS, unixfs } from '@helia/unixfs'

export class PhantomIPFS {

  private _node: Helia | undefined;
  private _fs: UnixFS | undefined;

  constructor() { }

  public get node() {
    if(!this._node) return new Error("PhantomIPFS must be initialized before accessing 'node'! Try calling PhantomIPFS.init() before this.");
    return this._node;
  }

  public get fs() {
    if(!this._fs) return new Error("PhantomIPFS must be initialized before accessing 'fs'! Try calling PhantomIPFS.init() before this.");
    return this._fs;
  }

  public async init(libp2pOptions?: Libp2pOptions) {
    this._node = await createHelia({
      blockstore: new MemoryBlockstore(),
      datastore: new MemoryDatastore(),
      libp2p: await createLibp2p(libp2pOptions ?? {})
    });
    this._fs = unixfs(this._node);
    return this;
  }

  public async response(request: Request) {
    // TODO
  }
  
}