class User {
  constructor(name, birthYear, email, address, postCode) {
    this.name = name
    this.email = email
    this.birthYear = birthYear // may not need that
    this.address = address
    this.postCode = postCode
    this.present = []
    this.interestIn = []
    this.commentOn = []
    this.acceptThat = []
  }

  addGift(gift) {
    this.present.push(gift)
    gift.presentDate = new Date()
    gift.presentBy = this.name
  }

  showInterest(gift) {
    this.interestIn.push(gift)
    gift.interestBy.push(this)
  }

  makeCommentOn(gift, comment) {
    this.commentOn.push({ gift, comment })
    gift.commentBy.push({ user: this, comment })
  }

  accept(gift) {
    gift.acceptBy = this
    gift.acceptDate = new Date()
    this.acceptThat.push(gift)
  }

  get profile() {
    return (
      `${this.name} ${this.birthYear}\n` +
      `## Gifts: (${this.present.length})\n` +
      `${this.present.map(gift => `#### "${gift.name}" taken by ${gift.acceptBy.name}`).join('\n')}\n` +
      `## Interested (${this.interestIn.length}) gifts\n` +
      `${this.interestIn
        .map(gift => `#### ${gift.name} also 💛 by ${gift.interestBy.map(user => user.name).join(', ')}`)
        .join('\n')}\n` +
      `## Commented (${this.commentOn.length}) times\n` +
      `${this.commentOn.map(({ gift, comment }) => `#### ${gift.name} 💬 "${comment}"`).join('\n')}\n` +
      `## Took (${this.acceptThat.length})\n` +
      `${this.acceptThat.map(gift => `#### "${gift.name}" present by ${gift.presentBy}`).join('\n')}\n`
    )
  }

  set profile(newValue) {
    throw new Error(`profile is only a getter.. you cant override it with ${newValue}`)
  }
}

module.exports = User
