import chai from 'chai';
import greetings from '../app.js';
import {addition} from '../app.js';
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const man = "man";

describe('Unit Test Cases (ASSERT)', function(){
    it('returns Hey', function(){
        assert.equal(greetings(), 'Hey', 'True');
    }),
    it('returns type string', function(){
        assert.typeOf(greetings(), 'string')
        
    }),
    it('greater than 5', function(){
        assert.isAbove(addition(2,4), 5)
    }),
//Checking if all the test cases run or the duplicate one's are discarded
    it('Duplicate test cases are not ignored or discarded', function(){
        assert.isAbove(addition(2,4), 5)
    })
})

describe('Unit Test Cases (EXPECT)', function(){
    it('Sum equal to 9', function(){
        expect(addition(4,5)).to.equal(9);
    }),
    it('Expects return string length to be 3', function(){
        expect(greetings()).to.have.lengthOf(3);
    })
})

describe('Unit Test Cases (SHOULD)', function(){
    it('should have a length of 3', function(){
        man.should.have.lengthOf(3);
    })
})