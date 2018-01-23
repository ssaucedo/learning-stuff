import service from './cache'

/**
 * Bug on suite 2. On this case the service should only load the value from source one time but:
 *
 * GET
    CACHE
      - Cache: second condition, current: 68457417, fInit: 68456212, sInit: 68457212
      NOT IN CACHE GO TO SOURCE
      - STORE: second condition, current: 68457417, fInit: 68456212, sInit: 68457212
      Element: {"id":2,"content":"Hola 2"}
  GET
    CACHE
      - Cache: second condition, current: 68457914, fInit: 68456212, sInit: 68457212
      Element: {"id":2,"content":"Hola 2"}
  GET
    CACHE
      - Cache: third condition, current: 68458419, fInit: 68456212, sInit: 68457212
      _NEXT
      NOT IN CACHE GO TO SOURCE
      - STORE: second condition, current: 68458419, fInit: 68457212, sInit: 68458212
      Element: {"id":2,"content":"Hola 2"}
 *
 */

const log = d => console.log(d)

const c = d => console.log(`   Element: ${JSON.stringify(d)}`)

setTimeout(function(){
  c(service.get(2))
}, 1200)

setTimeout(function(){
  c(service.get(2))
}, 1700)

setTimeout(function(){
  c(service.get(2))
}, 2200)


setTimeout(function(){
  log('---------------- FINAL STATE ----------------')
  log(service.cacheInfo())
}, 8500)
