/*
      BAD DESIGN, dependency between observer and observable.
 */


const Play = function (red, blue) {

  this.execute = function () {
    // simulate red/blue challenge.
    // hardcoded play result
    return {
      information: {
        playDetails: {
          team1: red,
          team2: blue,
        }
      },
      date: new Date(),
    }
  }
}

const Referee = function (match, score) {

  this.playOrder = function () {
    if (!score.matchCompleted) {
      setTimeout(() => match.play(), 500)
    }
  }

  /**
   * Take a decision based on a completed play.
   * @param play
   * @return {*}
   */
  this.judge = function (play) {
    const res = play.information.playDetails.team1
    return res
  }
}

const Match = function (red, blue) {

  this.play = function () {
    return new Play(red, blue).execute()
  }

  this.completed = false
}

const ObservableMatch = function (match) {

  this.match = match
  this.subscribers = []

  this.subscribe = function (observer) {
    this.subscribers = [...this.subscribers, observer]
  }

  this.play = function () {
    const res = this.match.play()
    this.subscribers.map(s => s.reactToPlay(res))
  }
}

const ObservableReferee = function (referee) {

  this.referee = referee
  this.subscribers = []

  this.subscribe = function (observer) {
    this.subscribers = [...this.subscribers, observer]
  }

  this.reactToPlay = function (play) {
    const res = this.referee.judge(play)
    this.subscribers.map(s => s.reactToDecision(res))
    this.referee.playOrder()
  }

  this.playOrder = function () {
    this.referee.playOrder()
  }
}

const Team = function (name) {
  this.name = name

}

const Score = function (team1, team2) {

  this.matchCompleted = false

  this.initialState = {
    [team1.name]: 0,
    [team2.name]: 0,
  }

  this.points = {
    [team1.name]: 0,
    [team2.name]: 0,
  }

  this.inProgress = {
    [team1.name]: 0,
    [team2.name]: 0,
  }

  this.reactToDecision = function ({name}) {
    if (this.inProgress[name] + 1 === 6) {
      if (this.points[name] + 1 === 4) {
        this.matchCompleted = true
      } else {
        this.points = {
          ...this.points,
          [name]: this.points[name] + 1,
        }
        this.inProgress = {...this.initialState}
      }
    } else {
      this.inProgress = {
        ...this.inProgress,
        [name]: this.inProgress[name] + 1,
      }
    }
    console.log('----------------------')
    console.log('POINTS:' + JSON.stringify(this.points))
    console.log('SCORE: ' + JSON.stringify(this.inProgress))
  }
}

const team1 = new Team('red')
const team2 = new Team('blue')

const match = new ObservableMatch(new Match(team1, team2))
const score = new Score(team1, team2)
const referee = new ObservableReferee(new Referee(match, score))

match.subscribe(referee)
referee.subscribe(score)

referee.playOrder()
referee.playOrder()
referee.playOrder()





