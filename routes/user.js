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
    /* return `
      ${this.name}
      ${this.email}
      ${this.birthYear}
      ${this.address}
      ${this.postCode}
      ${this.present}
      ${this.interestIn}
      ${this.commentOn}
      ${this.acceptThat}
    ` */

    return (
      `${this.name} ${this.birthYear}` +
      `## Gifts: (${this.present.length})` +
      `${this.present.map(gift => `#### "${gift.name}" taken by ${gift.acceptBy.name}`).join('')}` +
      `## Interested (${this.interestIn.length}) gifts` +
      `${this.interestIn
        .map(gift => `#### ${gift.name} also 💛 by ${gift.interestBy.map(user => user.name).join(', ')}`)
        .join('')}` +
      `## Commented (${this.commentOn.length}) times` +
      `${this.commentOn.map(({ gift, comment }) => `#### ${gift.name} 💬 "${comment}"`).join('')}` +
      `## Took (${this.acceptThat.length})` +
      `${this.acceptThat.map(gift => `#### "${gift.name}" present by ${gift.presentBy}`).join('')}`
    )
  }

  set profile(newValue) {
    throw new Error(`profile is only a getter.. you cant override it with ${newValue}`)
  }
}

module.exports = User
