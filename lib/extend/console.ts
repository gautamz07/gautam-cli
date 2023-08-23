

import Promise from 'bluebird'
import abbrev from 'abbrev'

interface CallBack {
  (args?: object): any,
  options?: object,
  desc?: string
}

interface Store {
  /*
    UNDERSTAND :-
    1. [ key : string ] .. what is this type ?
    2. Why CallBack as the type ?
  */
  [key : string]: CallBack,
}

interface Alias {
  [key : string]: string,
}

class Console {
  store: Store
  alias: Alias

  constructor() {
    this.store = {}
    this.alias = {}
  }


  get(name: string) {
    name = name.toLocaleLowerCase()
    return this.store[this.alias[name]]
  }

  list() {
    return this.store
  }

  /* 
    UNDERSTAND :-
    1. What are the repurcussions i.e. what if we don't define one of the register types.
      - look into function overloading in typescript.
      - compile and see output my removing some of the `register` overloads. 
  */
  register(name: string, desc: string, options: object, fn: CallBack): void;
  register(name: string, options: string, fn: CallBack): void;
  register(name: string, desc: string, fn: CallBack): void;
  register(name: string, fn: CallBack): void;
  register(name: string, desc: string | object | CallBack, options?: object | CallBack, fn?: CallBack) {

    if(!fn) {
      if (options) {
        if (typeof options === 'function') {
          fn = options as CallBack

          if (typeof desc === 'object') {
            options = desc
            desc = ''
          } else {
            options = {}
          }
        } else {
          throw new Error('fn must be a function')
        }
      } else {
        if (typeof desc === 'function') {
          fn = desc as CallBack;
          options = {}
          desc = ''
        } else {
          throw new Error('fn must be a function')
        }
      }
    }

    if (fn.length > 1) {
      fn = Promise.promisify(fn)
    } else {
      fn = Promise.method(fn)
    }

    this.store[name.toLowerCase()] = fn
    const c = fn
    c.options = options
    c.desc = desc as string

    this.alias = abbrev(Object.keys(this.store));
  }
}

export = Console
