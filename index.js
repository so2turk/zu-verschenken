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

class Gift{
    constructor(name, category, address, location, description, photos){
        this.name = name
        this.category = category
        this.description = description
        this.address = address
        this.location = location
        this.photos = photos
        this.interestedBy = []
        this.commentedBy = []
        this.takenBy = ''
        this.giftedOn = 0                               // date
        this.takenOn = 0                                // date
        this.status = this.perished(this.giftedOn)
    }

    anonymous(){
        this.takenBy = 'anonymously'
        this.takenOn = new Date()
    }

    perished(time){
        let nowTheTime = new Date()
        let timeDiff = (nowTheTime-time)/1000/60/60/24
        return this.takenBy!='' 
                        ? `already taken by ${this.takenBy}` 
                        : timeDiff<=2 
                            ? `${timeDiff} day(s) passed..may still be there`
                            : `${timeDiff} day(s) passed.. probably perished`;
    }
    
}

const serhat = new User('serhat', 1980, 's@zturk.com', 'kreuzberg', 10000)
const armagan = new User('armagan', 2000, 'arm@GainNode.com', 'schoneberg', 11000)
const neslihan = new User('neslihan', 2000, 'n@slihan.com', 'antalya', 02000)
const desire = new User('desire', 2000, 'd@sire.com', '-', '-')
const selman = new User('selman', 2000, 's@lman.com','mitte', 12000)
const dilek = new User('dilek', 2000, 'dil@k.com','mitte', 12000)
const gokce = new User('gokce', 2000, 'g@kce.com','mitte', 12000)
const fatma = new User('fatma', 2000, 'f@tma.com','mitte', 12000)
const bernard = new User('bernard', 2000, 'b@rnard.com','mitte', 12000)
const ceyhan = new User('ceyhan', 2000, 's@lman.com','mitte', 12000)

const oldTable = new Gift('old table', 'furniture', '52.489251391027786, 13.39262301870654', 'outside', 'in good condition, few scratches', ['topLeft', 'bottomLeft'])
serhat.addsGift(oldTable)
const oldMac = new Gift('used mac','electronics', 'schoneberg haubtstr.', 'inside', 'better than nothing', ['keyboard','screen'])
armagan.addsGift(oldMac)
serhat.showsInterest(oldMac)
serhat.makesCommentOn(oldMac, 'is there a ketchup on space button?')
neslihan.showsInterest(oldMac)
armagan.showsInterest(oldTable)
armagan.makesCommentOn(oldTable, 'don\'t you have chairs\?')
const babyTrbirthYear = new Gift('limas trbirthYear', 'child-baby', '52.489251391027786, 13.39262301870654', 'inside', 'like a new one', ['babytrbirthYear'])
serhat.addsGift(babyTrbirthYear)
const backPack = new Gift('best backpack', 'stuff', '52.49896538066073, 13.411730936841417', 'outside', 'need small repairment', [''])
desire.addsGift(backPack)
neslihan.showsInterest(backPack)
neslihan.makesCommentOn(backPack, 'please keep it.. i will take it..')
desire.makesCommentOn(oldTable, 'if there will be chairs gonna take it..')
neslihan.takesThat(oldMac)
armagan.takesThat(oldTable)
serhat.makesCommentOn(backPack, 'sorry.. i am close.. taking it')
serhat.makesCommentOn(oldTable, 'yeah.. sure.. if u want!')
const lamp = new Gift('ikea lamp', 'living-area', '52.521075426921676, 13.403173656345825', 'outside', 'nothing fancy', [])
selman.addsGift(lamp)

console.log(serhat, oldTable)
serhat.takesThat(backPack)
console.log(backPack.giftedOn-backPack.takenOn)
lamp.anonymous()
console.log(lamp)

