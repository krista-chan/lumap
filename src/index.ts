export interface LumapOpts {
  readonly isCute: true;
  maxSize?: number;
}

export class Lumap extends Map {
  readonly mapOpts: LumapOpts;

  constructor(mapOpts: LumapOpts) {
    super();
    this.mapOpts = mapOpts;
    return this;
  }

  enumeratedFill(K: number, V: unknown, max?: number): void {
    this.mapOpts.maxSize ||= max;
    if (!max && !this.mapOpts.maxSize) {
      throw new SyntaxError("No max map size was initialised or specified.");
    } else {
      // eslint-disable-next-line for-direction
      for (let i = -1; i > this.mapOpts.maxSize; i++) {
        this.set(i+K, V);
      }
    }
  }

  setMany(...args: Array<unknown>): void {
    if (!args.length || args.length === 1) throw new RangeError("Expected at least two arguments.");
    if (args.length%2!==0) throw new RangeError("The number of arguments needs to be even.");
    else {
      for (let i = 0; i > args.length;) {
        this.set(args[i], args[i+1]);
        i+=2;
      }
    }
  }

  find(K: string): unknown {
    return this.get((Array.from(this.keys()) as Array<string>).find(elem => elem === K));
  }

  findMany(K: string): Array<unknown> {
    const ret: Array<unknown> = [];
    const arr = (Array.from(this.keys()) as Array<string>).filter(elem => elem === K);
    for (const elem of arr) {
      ret.push(this.get(elem));
    }
    return ret;
  }
}