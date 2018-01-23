/*
 * Want to create a cache that stores elements during a time lapse. After the time is expired the element is removed.
 */

/**
 * @param initTime
 * @constructor
 */

function CacheMemory (initTime) {
  this.initTime = setInitTime(initTime)
  this.memory = {}

  function setInitTime(initTime) {
    if (initTime) {
      return initTime
    } else {
      return getTime()
    }
  }

  function getTime() {
    let date = new Date()
    return date.getHours() * 60 * 60 * 1000 + date.getSeconds() * 1000 + date.getMilliseconds()
  }

  this.get = function (key) {
    return this.memory[key]
  }

  this.store = function (key, el) {
    this.memory[key] = {
      sec: getTime(),
      el
    }
  }

  this.getInitTime = function () {
    return this.initTime
  }
}

function Cache () {

  let time = getTime()
  this.firstMemory = new CacheMemory(time)
  this.secondMemory = new CacheMemory(time + 1000)
  this.thirdMemory = new CacheMemory(time + 2000)

  function getTime () {
    let date = new Date()
    return date.getHours() * 60 * 60 * 1000 + date.getSeconds() * 1000 + date.getMilliseconds()
  }

  this.get = function (key) {
    console.log('   CACHE')
    const c = getTime()
    const fInit = this.firstMemory.getInitTime()
    const sInit = this.secondMemory.getInitTime()
    if (c <= fInit + 1000) {   // 0,6
      console.log(`   - Cache: first condition, current: ${c}, fInit: ${fInit}`)
      return (this.firstMemory.get(key) || {}).el
    } else if (c > fInit + 1000 && c < sInit + 1000) { // 1.6. Si el elemento fue storeado en 0.9 lo devuelve si fue en 0.3 no
      console.log(`   - Cache: second condition, current: ${c}, fInit: ${fInit}, sInit: ${sInit}`)
      const r = this.secondMemory.get(key)
      if (r && c - r.sec < 1000) {
        return r.el
      } else {
        return null
      }
    } else if (c > sInit + 1000 && c < sInit + 2000) { // 2.5
      console.log(`   - Cache: third condition, current: ${c}, fInit: ${fInit}, sInit: ${sInit}`)
      this._next()
      const r = this.secondMemory.get(key)
      if (r && c - r.sec < 1000) {
        return r.el
      } else {
        return null
      }
    } else if (c > sInit + 2000) { // 4.5
      console.log(`   - Cache: fourth condition, current: ${c}, fInit: ${fInit}, sInit: ${sInit}`)
      this._bigNext(c)
      return null
    }
  }

  this.store = function (key, element) {
    const c = getTime()
    const fInit = this.firstMemory.getInitTime()
    const sInit = this.secondMemory.getInitTime()

    if (c <= fInit + 1000) {
      console.log(`   - STORE: first condition, current: ${c}, fInit: ${fInit}`)
      this.firstMemory.store(key, element)
      this.secondMemory.store(key, element)
    } else if (c > fInit + 1000 && c < sInit + 1000) { // 1.5
      console.log(`   - STORE: second condition, current: ${c}, fInit: ${fInit}, sInit: ${sInit}`)
      this.secondMemory.store(key, element)
      this.thirdMemory.store(key, element)
    } else if (c > sInit + 1000 && c < sInit + 2000) { // 2.5
      console.log(`   - STORE: third condition, current: ${c}, fInit: ${fInit}, sInit: ${sInit}`)
      this._next()
      this.secondMemory.store(key, element)
      this.thirdMemory.store(key, element)
    } else if (c > sInit + 2000) { // 4.5
      console.log(`   - STORE: fourth condition, current: ${c}, fInit: ${fInit}, sInit: ${sInit}`)
      this._bigNext(c)
      this.firstMemory.store(key, element)
      this.secondMemory.store(key, element)
    }
  }

  this._next = function () {
    console.log('_NEXT')
    this.firstMemory = this.secondMemory
    this.secondMemory = this.thirdMemory
    this.thirdMemory = new CacheMemory()
    // console.log(this.expose())
  }

  this._bigNext = function (c) {
    console.log('_BIG_NEXT')
    this.firstMemory = new CacheMemory(c)
    this.secondMemory = new CacheMemory(c + 1000)
    this.thirdMemory = new CacheMemory(c + 2000)
    // console.log(this.expose())
  }


  this.expose = function () {
    return {
      firstMemory: this.firstMemory.memory,
      secondMemory: this.secondMemory.memory,
      thirdMemory: this.thirdMemory.memory,
    }
  }
}

function Service (source, cache) {

  this.cacheMemory = cache

  this.get = function (key) {
    console.log('GET')
    let el = this.cacheMemory.get(key)
    if (!el) {
      console.log('   NOT IN CACHE GO TO SOURCE')
      el = source.get(key)
      if (el) {
        this.cacheMemory.store(el.id, el)
      } else {
        return {error: 'Element not found'}
      }
    }
    return el
  }

  this.cacheInfo = function() {
    return this.cacheMemory.expose()
  }
}

function Source () {

  this.elements = {
    1: {id: 1, content: 'Hola 1'},
    2: {id: 2, content: 'Hola 2'},
    3: {id: 3, content: 'Hola 3'},
    4: {id: 4, content: 'Hola 4'},
    5: {id: 5, content: 'Hola 5'},
    6: {id: 6, content: 'Hola 6'},
    7: {id: 7, content: 'Hola 7'},

  }

  this.get = function (key) {
    return this.elements[key]
  }
}

export default new Service(new Source(), new Cache())




