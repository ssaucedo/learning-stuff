import service from './cache'

const log = d => console.log(d)

const c = d => console.log(`   Element: ${JSON.stringify(d)}`)

c(service.get(1))

setTimeout(function(){
  c(service.get(2))
}, 1200)

setTimeout(function(){
  c(service.get(2))
}, 1700)

setTimeout(function(){
  c(service.get(3))
}, 2700)

setTimeout(function(){
  c(service.get(4))
}, 3000)

setTimeout(function(){
  c(service.get(5))
}, 5000)

setTimeout(function(){
  c(service.get(6))
}, 8200)

setTimeout(function(){
  log('---------------- FINAL STATE ----------------')
  log(service.cacheInfo())
}, 8500)
