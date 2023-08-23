import { resolve, join, dirname } from 'path'
import { readFile } from 'hexo-fs'

interface findPkgArgs {
  cwd?: string
}

function findPkg(cwd: string, args: findPkgArgs = {}) {
  if(args.cwd) {
    cwd = resolve(args.cwd, cwd)
  }

  return checkPkg(cwd)
}

function checkPkg(path: string) {
  const pkgPath = join(path, 'package.json')

  return readFile(pkgPath).then(content => {
    // no conditionals at all.
    return path;
  })
}

export = findPkg