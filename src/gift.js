class Gift {
  constructor(name, category, address, location, description, photos) {
    this.name = name
    this.category = category
    this.description = description
    this.address = address
    this.location = location
    this.photos = photos
    this.giftedBy = ''
    this.interestedBy = []
    this.commentedBy = []
    this.takenBy = ''
    this.giftedOn = 0 // date
    this.takenOn = 0 // date
  }

  anonymous() {
    this.takenBy = 'anonymously'
    this.takenOn = new Date()
  }

  get status() {
    return this.perished(this.giftedOn)
  }

  perished(time) {
    const nowTheTime = new Date()
    const timeDiff = (nowTheTime - time) / 1000 / 60 / 60 / 24
    if (this.takenBy.length > 0) return `already taken by ${this.takenBy}`
    if (timeDiff <= 2) return `${Math.floor(timeDiff)} day(s) passed.. may still be there`
    return `${Math.floor(timeDiff)} day(s) passed.. nobody took it.. probably perished`
  }

  get profile() {
    return (
      `${this.name} gifted by ${this.giftedBy}\n` +
      `## Commented: (${this.commentedBy.length}) times\n` +
      `${this.commentedBy.map(({ user, comment }) => `#### ${user.name} 💬 "${comment}"`).join('\n')}\n` +
      `## Interested (${this.interestedBy.length}) times\n` +
      `${this.interestedBy
        .map(user => `#### ${user.name} also 💛 ${user.interestedIn.map(gift => `"${gift.name}"`).join(', ')}`)
        .join('\n')}\n` +
      `## Status: ${this.status}\n`
    )
  }

  set profile(newValue) {
    throw new Error(`profile is only a getter.. you cant override it with ${newValue}`)
  }
}

module.exports = Gift
