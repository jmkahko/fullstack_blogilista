const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const testHelper = require('../utils/test_Helper')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(process.env.TEST_SECRET, 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('Created user', async () => {
  const usersFirst = await testHelper.usersInDatabase()

  const newUser = {
    username: 'janne',
    name: 'Janne Kähkönen',
    password: 'bigsecret'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersLast = await testHelper.usersInDatabase()
  expect(usersLast).toHaveLength(usersFirst.length +1)
})

test('Not created user if username or password too short', async () => {
  const usersFirst = await testHelper.usersInDatabase()

  const newUser = {
    username: 'ja',
    name: 'Janne Kähkönen',
    password: 'bi'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const usersLast = await testHelper.usersInDatabase()
  expect(usersLast).toHaveLength(usersFirst.length)
})

test('Minimun length username and password test', async () => {
  const usersFirst = await testHelper.usersInDatabase()

  const newUser = {
    username: 'jan',
    name: 'Janne Kähkönen',
    password: 'big'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersLast = await testHelper.usersInDatabase()
  expect(usersLast).toHaveLength(usersFirst.length +1)
})