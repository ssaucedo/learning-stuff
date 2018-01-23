/*
 * Want to create a cache that stores elements during a time lapse. After the time is expired the element is removed.
 */

/**
 * @param initTime
 * @constructor
 */

function CacheMemory (initTime) {
  this.initTime = initTime || new Date().getMilliseconds()
  this.memory = {}

  function setInitTime(initTime) {
    if (initTime) {
      this.initTime = initTime
    } else {
      const date = new Date()
      this.initTime = date.getSeconds() * 1000 + date.getMilliseconds()
    }
  }

  this.get = function (key) {
    return this.memory[key]
  }

  this.store = function (key, el) {
    const date = new Date()
    this.memory[key] = {
      sec: date.getSeconds() * 1000 + date.getMilliseconds(),
      el
    }
  }

  this.getInitTime = function () {
    return this.initTime
  }
}

function Cache () {

  let date = new Date()
  let init = date.getSeconds() * 1000 + date.getMilliseconds()
  this.firstMemory = new CacheMemory(init)
  this.secondMemory = new CacheMemory(init + 1000)
  this.thirdMemory = new CacheMemory(init + 2000)

  this.get = function (key) {
    const date = new Date()
    const c = date.getSeconds() * 1000 + date.getMilliseconds()
    const fInit = this.firstMemory.getInitTime()
    const sInit = this.secondMemory.getInitTime()
    if (c <= fInit + 1000) {   // 0,6
      return (this.firstMemory.get(key) || {}).el
    } else if (c > fInit + 1000 && c < sInit + 1000) { // 1.6. Si el elemento fue storeado en 0.9 lo devuelve si fue en 0.3 no
      const r = this.secondMemory.get(key)
      if (r && c - r.sec < 1000) {
        return r.el
      } else {
        return null
      }
    } else if (c > sInit + 1000 && c < sInit + 2000) { // 2.5
      this._next()
      const r = this.secondMemory.get(key)
      if (r && c - r.sec < 1000) {
        return r.el
      } else {
        return null
      }
    } else if (c > sInit + 2000) { // 4.5
      this._bigNext(c)
      return null
    }
  }

  this.store = function (key, element) {
    const c = new Date().getSeconds() * 1000 + date.getMilliseconds()
    const fInit = this.firstMemory.getInitTime()
    const sInit = this.secondMemory.getInitTime()

    if (c <= fInit + 1000) {
      this.firstMemory.store(key, element)
      this.secondMemory.store(key, element)
    } else if (c > fInit + 1000 && c < sInit + 1000) { // 1.5
      this.secondMemory.store(key, element)
      this.thirdMemory.store(key, element)
    } else if (c > sInit + 1000 && c < sInit + 2000) { // 2.5
      this._next()
      this.secondMemory.store(key, element)
      this.thirdMemory.store(key, element)
    } else if (c > sInit + 2000) { // 4.5
      this._bigNext(c)
      this.firstMemory.store(key, element)
      this.secondMemory.store(key, element)
    }
  }

  this._next = function () {
    this.firstMemory = this.secondMemory
    this.secondMemory = this.thirdMemory
    this.thirdMemory = new CacheMemory()
  }

  this._bigNext = function (c) {
    this.firstMemory = new CacheMemory(c)
    this.secondMemory = new CacheMemory(c + 1000)
    this.thirdMemory = new CacheMemory(c + 2000)
  }

}

function Service (source, cache) {

  this.cacheMemory = cache

  this.get = function (key) {
    let el = this.cacheMemory.get(key)
    if (!el) {
      el = source.get(key)
      if (el) {
        this.cacheMemory.store(el.id, el)
      } else {
        return {error: 'Element not found'}
      }
    }
    return el
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
    console.log('Retrieved from Source')
    return this.elements[key]
  }
}

const service = new Service(new Source(), new Cache())
