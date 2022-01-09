const dbMicroServiceConnection = require('../functions/db-microservice-connection')

// eslint-disable-next-line no-undef
test('The database microservice is connected successfully', async () => {
  // eslint-disable-next-line no-undef
  await expect(dbMicroServiceConnection()).resolves.toBe('database microservice connected successfully')
})
