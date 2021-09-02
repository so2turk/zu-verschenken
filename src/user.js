class User{
    constructor(name, birthYear, email, address, postCode){
        this.name = name
        this.email = email
        this.birthYear = birthYear              // may not need that
        this.address = address
        this.postCode = postCode
        this.gifted = []
        this.interestedIn = []
        this.commentedOn = []
        this.tookThat = []
    }

    addsGift(gift){
        this.gifted.push(gift)
        gift.giftedOn = new Date()
        gift.giftedBy = this.name
    }

    showsInterest(gift){
        this.interestedIn.push(gift)
        gift.interestedBy.push(this)
    }

    makesCommentOn(gift, comment){
        this.commentedOn.push( { gift , comment })
        gift.commentedBy.push( { user : this , comment })
    }

    takesThat(gift){
        gift.takenBy = this
        gift.takenOn = new Date()
        this.tookThat.push(gift)
    }

    get profile() {
        return `${this.name} ${this.birthYear}\n` + 
                `## Gifts: (${this.gifted.length})\n` +
                    `${this.gifted.map(gift => {
                        return  `#### "${gift.name}" taken by ${gift.takenBy.name}`}).join("\n")}\n` +
                `## Interested (${this.interestedIn.length}) gifts\n` +
                    `${this.interestedIn.map(gift => {
                        return  `#### ${gift.name} also 💛 by ${gift.interestedBy.map(user => user.name).join(', ')}`}).join("\n")}\n` +
                `## Commented (${this.commentedOn.length}) times\n` +
                    `${this.commentedOn.map(({gift, comment}) => {
                        return  `#### ${gift.name} 💬 "${comment}"`}).join('\n')}\n` +
                `## Took (${this.tookThat.length})\n` +
                    `${this.tookThat.map(gift => {
                        return  `#### "${gift.name}" gifted by ${gift.giftedBy}`}).join("\n")}\n`
    }

    set profile(newValue){
        throw new Error('profile is only a getter.. you cant override it with ${newValue}')
    }

}

module.exports = User
