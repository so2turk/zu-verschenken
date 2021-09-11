let giftInstances = [];

class Gift {
  constructor(name, category, address, location, description, photos) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.address = address;
    this.location = location;
    this.photos = photos;
    this.presentBy = "";
    this.interestBy = [];
    this.commentBy = [];
    this.acceptBy = "";
    this.presentDate = 0; // date
    this.acceptDate = 0; // date
  }

  anonymous() {
    this.acceptBy = "anonymously";
    this.acceptDate = new Date();
  }

  get status() {
    return this.perished(this.presentDate);
  }

  perished(presentDate) {
    const now = new Date();
    const timeDiff = (now - presentDate) / 1000 / 60 / 60 / 24;
    if (this.acceptBy.length > 0) return `already taken by ${this.acceptBy}`;
    if (timeDiff <= 2)
      return `${Math.floor(timeDiff)} day(s) passed.. may still be there`;
    return `${Math.floor(
      timeDiff
    )} day(s) passed.. nobody took it.. probably perished`;
  }

  get profile() {
    return (
      `${this.name} gifted by ${this.presentBy}\n` +
      `## Commented: (${this.commentBy.length}) times\n` +
      `${this.commentBy
        .map(({ user, comment }) => `#### ${user.name} 💬 "${comment}"`)
        .join("\n")}\n` +
      `## Interested (${this.interestBy.length}) times\n` +
      `${this.interestBy
        .map(
          (user) =>
            `#### ${user.name} also 💛 ${user.interestIn
              .map((gift) => `"${gift.name}"`)
              .join(", ")}`
        )
        .join("\n")}\n` +
      `## Status: ${this.status}\n`
    );
  }

  set profile(newValue) {
    throw new Error(
      `profile is only a getter.. you cant override it with ${newValue}`
    );
  }
}

module.exports = Gift;
