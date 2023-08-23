import minimist from 'minimist';
import findPkg from './find_pkg'
import Context from './context'
import registerConsole from './console'

function entry(cwd = process.cwd(), args) {
  args = minimist(process.argv.slice(2), { string: ['_', 'p', 'path', 's', 'slug'] });

  let hexo = new Context(cwd, args)
  let { log } = hexo

  process.title = 'hexo'


  return findPkg(cwd, args).then(path => {
    if(!path) return
  }).then((mod) => {
    
    registerConsole(hexo)

    hexo.init()
  }).then(() => {
    let cmd = 'help'
    if(!args.h && !args.help) {
      const c = args._.shift()
      if (c && hexo.extend.console.get(cmd)) cmd = c
    }

    return hexo.callIT(cmd, args).then(() => hexo.exit())
  })


}

export = entry;