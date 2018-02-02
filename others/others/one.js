/*
 How would you model facebook's messaging system
 */

const Facebook = function () {
  this.conversations = {}


  this.registerConversation = function()

}

const Message = function (content) {
  this.received = false,
    this.content = content
}

const User = function () {

  this.startConversation = function (user) {

  }

}

const Conversation = function () {
  this.members = [new User(), new User()]
  this.date = new Date()                        // Going to use this to order conversations.
  this.messages = []

  this.addMessage = function (message) {
    this.messages = [...this.messages, new Message(message)]
  }

}





