const lib = require('./app.js');
const supertest = require('supertest');
const request = supertest(lib.app)

describe("Post/metric-springfield-residents", () => {
    test("Should respond with 200 status with valid value",  async () => {
        const res =  await request.post("/metric/springfield-residents").send(
            {
                "value": "10"
            }
        )
        //console.log(res)
        expect(res.status).toBe(200)
    })

    test("Should respond with 400 status with float metric",  async () => {
        const res =  await request.post("/metric/springfield-residents").send(
            {
                "value": "10.1"
            }
        )
        //console.log(res)
        expect(res.status).toBe(400)
    })

    test("Should respond with 400 status with string metric",  async () => {
        const res =  await request.post("/metric/springfield-residents").send(
            {
                "value": "some string"
            }
        )
        //console.log(res)
        expect(res.status).toBe(400)
    })

    test("Should respond with 400 status with no value",  async () => {
        const res =  await request.post("/metric/springfield-residents").send(
            {
                "name": "some string"
            }
        )
        //console.log(res)
        expect(res.status).toBe(400)
    })
})

describe("Get/metric-springfield-residents", () => {
    test("Should return the sum",  async () => {
        //const addMock = jest.spyOn(app, "processData");
        const processData = (data) => 0;
        const res =  await request.get("/metric/springfield-residents/sum").send()
        expect(res.status).toBe(200)
    })
})

describe("Test ProcessData", () => {
    test("verify sum",  async () => {
        let m = new Map();
        m.set(Date.now() - 1000, 40);
        m.set(Date.now() - 60*1000, 20);
        m.set(Date.now() - 70*60*1000, 50);
        expect(lib.processData(m)).toBe(60);
    })
})