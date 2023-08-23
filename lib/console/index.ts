import helpConsole from './help'
import versionConsole from './version'

export = function(ctx) {
  const { console } = ctx.extend
  // const { log } = ctx
  console.register('help', 'Get help on a command.', {}, helpConsole)
  console.register('version', 'Display version information', {}, versionConsole)
}