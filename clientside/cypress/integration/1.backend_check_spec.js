describe('Backend service check', () => {
    it('Check whether the backend service is accessible', () => {
        // Check whether the backend microservice is accessible, and
        // whether the get_time and get_disciplines urls are returning
        // the right data 
        cy
        .request({
            method: 'GET',
            url: 'http://localhost:3100/orders/v1/get_time',
            headers: {
                //'accept': 'application/json',
                'origin': 'http://localhost:4100'
            }
        })
        .then((response) => {
          // response.body is automatically serialized into JSON
          expect(response.body).to.be.a('array') // true
          expect(response.body).to.have.length(24) // true
        })
        cy
        .request({
            method: 'GET',
            url: 'http://localhost:3100/orders/v1/get_disciplines',
            headers: {
                //'accept': 'application/json',
                'origin': 'http://localhost:4100'
            }
        })
        .then((response) => {
          // response.body is automatically serialized into JSON
          expect(response.body).to.be.a('array') // true
          expect(response.body).to.have.length(19) // true
        })
    })
})