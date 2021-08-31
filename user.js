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
    }

    showsInterest(gift){
        this.interestedIn.push(gift)
        gift.interestedBy.push(this)
    }

    makesCommentOn(gift, comment){
        this.commentedOn.push({ name: gift.name, comment : comment })
        gift.commentedBy.push({name: this.name, comment: comment })
    }

    takesThat(gift){
        gift.takenBy = this
        gift.takenOn = new Date()
        this.tookThat.push({ name: gift.name, date : gift.takenOn })
    }
}



module.exports = User
