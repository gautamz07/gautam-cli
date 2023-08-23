
import logger from 'hexo-log'
import { underline } from 'picocolors'
import Promise from 'bluebird'
import ConsoleExtend from './extend/console'

type CallBack = (err?: any, value?: any) => void

class Context {
  base_dir: string
  log: ReturnType<typeof logger>
  extend: {
    console: ConsoleExtend
  };

  constructor(base = process.cwd(), args = {}) {
    this.base_dir = base
    /* 
      UNDERSTAND :-
      why no new needed here ?
    */
    this.log = logger(args)
    this.extend = {
      console: new ConsoleExtend()
    }
  }

  init() {
    // To be done later
  }

  callIT(name: string, args: object, callback: CallBack);
  callIT(name: string, callback);
  callIT(name: string, args?: object | CallBack, callback?: CallBack) {
    if (!callback && typeof args === 'function') {
      callback = args as CallBack
      args = {}
    }

    return new Promise((resolve, reject) => {
      const c = this.extend.console.get(name)

      if(c) {
        /* call below is binding .call not the above call */
        /* 
          UNDERSTAND :- 
          WHY is there a .then() block below and why is resolve and reject being passed ?
        */
        c.call(this, args).then(resolve, reject);
      } else {
        reject(new Error(`Console \`${name}\` has not been registered yet.`))
      }
    }).asCallback(callback)
    /* 
      UNDERSTAND :- 
      why asCallback here ? 
    */

  }

  exit() {
    Promise.resolve()
  }

}

export = Context
