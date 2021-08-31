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

module.exports = Gift