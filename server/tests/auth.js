const request = require('supertest')
const expect = require('chai').expect
const app = require('../index') // 调整路径以适应您的项目结构

console.log('122222222222222222222')

describe('POST /signup', function () {
  it('should respond with json', function (done) {
    request(app)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json') // 设置请求头部
      .send({ username: '15290631595', password: '21332134' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        // 进行断言
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('success')
        done()
      })
  })

  // 其他测试案例...
})
