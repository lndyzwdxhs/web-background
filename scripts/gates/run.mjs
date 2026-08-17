import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const readIfExists = (file) => existsSync(resolve(root, file))
  ? readFileSync(resolve(root, file), 'utf8')
  : null

let pkg
try {
  pkg = JSON.parse(readIfExists('package.json'))
} catch (error) {
  console.error('[gates] invalid package.json:', error.message)
  process.exit(1)
}

const errors = []
  if (pkg.name !== "web-background") errors.push('package.json name does not match scaffold name')
  if (!existsSync(resolve(root, "lib/index.js"))) errors.push('missing required file: lib/index.js')
  if (!existsSync(resolve(root, "README.md"))) errors.push('missing required file: README.md')
  if (!existsSync(resolve(root, "cordis.patch.yml"))) errors.push('missing required file: cordis.patch.yml')
  if (!existsSync(resolve(root, "lib/client.js"))) errors.push('missing required file: lib/client.js')
  const patch = readIfExists('cordis.patch.yml')
  if (!patch || !patch.includes('- insert:') || !patch.includes(pkg.name)) errors.push('cordis.patch.yml must insert the package name')
  const client = readIfExists('lib/client.js')
  if (!client || !client.includes(`window.__ModuleLoader__.load({ id: ${JSON.stringify(pkg.name)}`)) errors.push('lib/client.js does not register the expected client id')

if (errors.length > 0) {
  console.error('[gates] failed')
  for (const error of errors) console.error('  -', error)
  process.exit(1)
}

console.log('[gates] ok')
