const request = require('supertest')
const app = require('../src/app')

describe('Users endpoints', () => {
  it('post request to /mains should create a user', async () => {
    const userToCreate = {
      name: `TestName${Date.now()}`,
      email: `${Date.now()}@lol.com`,
      birthYear: 1800,
      address: 'Kreuzberg',
      postcode: 10000,
    }

    const createdUser = (await request(app).post('/mains').send(userToCreate)).body

    expect(createdUser.name).toBe(userToCreate.name)
    expect(createdUser.email).toBe(userToCreate.email)
    expect(createdUser.birthYear).toBe(userToCreate.birthYear)
    expect(createdUser.address).toBe(userToCreate.address)
    expect(createdUser.postcode).toBe(userToCreate.postcode)

    console.log('-------------first user--', createdUser)
  })

  let createdGift = {}

  it('post request to /gifts should create a gift', async () => {
    const giftToCreate = {
      name: `giftname-${Date.now()}`,
      category: 'electronics',
      address: 'schoneberg',
      location: 'outside',
      description: 'better than nothing',
      photos: ['photo1', 'photo2'],
    }

    createdGift = (await request(app).post('/gifts').send(giftToCreate)).body

    expect(createdGift.name).toBe(giftToCreate.name)
    expect(createdGift.category).toBe(giftToCreate.category)
    expect(createdGift.address).toBe(giftToCreate.address)
    expect(createdGift.location).toBe(giftToCreate.location)
    expect(createdGift.description).toBe(giftToCreate.description)
    //  expect(createdGift.photos).toBe(giftToCreate.photos)

    console.log('-------------first gift--', createdGift)
  })

  it('get request to /mains should list users', async () => {
    const userList = (await request(app).get('/mains')).body
    const usersExist = userList.length > 0

    expect(usersExist).toBe(true)
  })

  it('user should be able to interest in/comment on/accept a gift', async () => {
    // create a gift
    const gift = (
      await request(app)
        .post('/gifts')
        .send({
          name: `giftname-${Date.now()}`,
          category: 'electronics',
          address: 'schoneberg',
          location: 'outside',
          description: 'better than nothing',
          photos: ['photo1', 'photo2'],
        })
    ).body
    console.log('-------------gift--', gift)

    // create a user
    const giftPresenter = (
      await request(app)
        .post('/mains')
        .send({
          name: `GiftPresenter-${Date.now()}`,
          email: `${Date.now()}@lol.com`,
          birthYear: 1800,
          address: 'Kreuzberg',
          postcode: 10000,
        })
    ).body
    console.log('-------------GiftPresenter--', giftPresenter)

    // add the gift to that user
    await request(app).post(`/mains/${giftPresenter._id}/added`).send({ giftId: gift._id })
    await request(app).post(`/mains/${giftPresenter._id}/added`).send({ giftId: createdGift._id })

    // create another user
    const interestedUser = {
      name: `InterestedUser-${Date.now()}`,
      email: `${Date.now()}@lol.com`,
      birthYear: 1800,
      address: 'Kreuzberg',
      postcode: 10000,
    }
    const createdInterestedUser = (await request(app).post('/mains').send(interestedUser)).body
    console.log('-------------createdInterestedUser--', createdInterestedUser)

    const commentingUser = {
      name: `InterestedUser-${Date.now()}`,
      email: `${Date.now()}@lol.com`,
      birthYear: 1800,
      address: 'Kreuzberg',
      postcode: 10000,
    }
    const createdCommentingUser = (await request(app).post('/mains').send(commentingUser)).body
    console.log('-------------createdCommentingUser--', createdCommentingUser)

    const takingUser = {
      name: `TakingUser-${Date.now()}`,
      email: `${Date.now()}@lol.com`,
      birthYear: 1800,
      address: 'Kreuzberg',
      postcode: 10000,
    }
    const createdTakingUser = (await request(app).post('/mains').send(takingUser)).body
    console.log('-------------createdTakingUser--', createdTakingUser)

    // interested in the gift with that interested user
    await request(app).post(`/mains/${createdInterestedUser._id}/interested`).send({ giftId: gift._id })

    // commented on the gift with that commenting user
    await request(app)
      .post(`/mains/${createdCommentingUser._id}/commented`)
      .send({ giftId: gift._id, comment: 'niceeee' })

    // take the gift with that taking user
    await request(app).post(`/mains/${createdTakingUser._id}/took`).send({ giftId: gift._id })

    const finalGift = (await request(app).get(`/gifts/${gift._id}/json`)).body
    console.log('-------------finalGift--', finalGift)

    const finalPresenter = (await request(app).get(`/mains/${giftPresenter._id}/json`)).body
    console.log('-------------finalPresenter--', finalPresenter)

    const finalInterestedUser = (await request(app).get(`/mains/${createdInterestedUser._id}/json`)).body
    console.log('-------------finalInterestedUser--', finalInterestedUser)

    const finalCommentedUser = (await request(app).get(`/mains/${createdCommentingUser._id}/json`)).body
    console.log('-------------finalCommentedUser--', finalCommentedUser)

    const finalTaker = (await request(app).get(`/mains/${createdTakingUser._id}/json`)).body

    expect(finalPresenter.present.length).toBe(2)
    expect(finalInterestedUser.interestIn.length).toBe(1)
    expect(finalCommentedUser.commentOn.length).toBe(0)
    expect(finalTaker.acceptThat.length).toBe(1)

    expect(finalPresenter.present[0].interestBy[0]).toBe(finalInterestedUser._id)
    expect(finalPresenter.present[0].commentBy[0].user).toBe(finalCommentedUser._id)
    expect(finalTaker.acceptThat[0]._id).toBe(finalPresenter.present[0]._id)
    //  expect(finalGift.presentBy._id).toBe(finalPresenter._id)
  })
})
