require('dotenv').config();
const server = require('./server');
const db = require('../users/users');
const knexDB = require('../database/dbConfig')
const request = require('supertest');

describe('GET/', () => {

    it('should return 200 ok', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
        })   


    it('should return a json object', async () =>{
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json');
    })

})

describe('POST/', () => {
    beforeEach(async () => {
        await knexDB('users').truncate();
    })
    //TEST 
    it('should insert a user}', async () => {
        await db.add({username:'User1', password: 'password1'});

        const users = await knexDB('users');
        expect(users).toHaveLength(1);
    })
    it('should return 200 ok', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
        })   

}) 