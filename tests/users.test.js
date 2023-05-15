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