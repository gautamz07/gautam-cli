import os from 'os'
import BlueBirdPromise from 'bluebird';

// import Promise from 'bluebird'
import { spawn } from 'hexo-util'

async function versionConsole() {

  const { versions, platform } = process
  const keys = Object.keys(versions)



  let osInfo: string | void | Buffer

  if(platform === 'darwin') osInfo = await spawn('sw_vers', '-productVersion')

  osInfo = `${os.platform()} ${os.release()} ${osInfo}`
  console.log('os:', osInfo)


  await BlueBirdPromise.resolve()
}

export = versionConsole