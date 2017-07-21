import expect, { createSpy, spyOn, isSpy } from 'expect'

class Tester {
	constructor() {
		this.truthy = true
		this.falsey = false
		this.zeroy = 0
		this.quotey = ""
		this.nully = null
		this.undefinedey = undefined
		this.nan = NaN

		this.falseyClone = this.falsey

		this.one = 1
		this.two = 2
		this.three = 3

		this.word = "word"
	}

	badFunc() {
		throw new Error('bad stuff is happening')
	}

	goodFunc() {
		// good things happening
	}
}

class Other {
	constructor() {
		// things in constructor
	}

	method() {
		// things in methods
	}
}

// ---------------------------

const tester = new Tester()

expect(tester.truthy).toExist()
expect(tester.falsey).toNotExist()
expect(tester.zeroy).toNotExist()
expect(tester.quotey).toNotExist()
expect(tester.nully).toNotExist()
expect(tester.undefinedey).toNotExist()
expect(tester.nan).toNotExist()

expect(tester.falseyClone).toBe(tester.falsey)
expect(tester.falseyClone).toNotBe(tester.zeroy)

expect(tester.one).toEqual(1, console.log(tester.one + ' is equal to 1'))
expect(tester.two).toEqual(2, console.log(tester.two + ' is equal to 2'))
expect(tester.three).toEqual(3, console.log(tester.three + ' is equal to 3'))
expect(tester.one).toNotEqual(2, console.log(tester.one + ' is not equal to 2'))
expect(tester.two).toNotEqual(3, console.log(tester.two + ' is not equal to 3'))
expect(tester.three).toNotEqual(4, console.log(tester.three + ' is not equal to 4'))

expect(tester.badFunc).toThrow(/bad stuff/, console.log('throwError threw an error'))
expect(tester.goodFunc).toNotThrow(console.log('no bad things happened'))

expect(new Tester).toBeA(Tester, console.log('Tester is a constructor'))
expect(new Other).toNotBeA(Tester, console.log('Other is not a tester'))
expect(tester.word).toBeA('string', console.log(tester.word + ' is a string'))
expect(tester.one).toBeA('number', console.log(tester.one + ' is a number'))
expect(tester.two).toNotBeA('string', console.log(tester.two + ' is not a string'))

expect('string').toMatch(/string/, console.log('string matches /string/'))
expect({
  key: 'this is a key'
}).toMatch({
  key: /key/
}, console.log('\'this is a key\' has /key/ inside it'))
expect('string').toNotMatch(/number/, console.log('string does not match /number/'))

expect(3).toBeLessThan(4, console.log('3 is less than 4'))
expect(3).toBeLessThanOrEqualTo(3.1, console.log('3 is less than or equal to 3.1'))
expect(4).toBeGreaterThan(3, console.log('4 is greater than 3'))
expect(4).toBeGreaterThanOrEqualTo(3.9, console.log('4 is greater than or equal to 3.9'))

expect([4, 5, 6]).toInclude(5, console.log('the array has 5 in it'))
expect({a: 1, b: 2, c: 3}).toInclude({b: 2}, console.log('the object has \'b: 2\' in it'))

expect([4, 5, 6]).toExclude(1, console.log('the array does not have 1 in it'))
expect({a: 1, b: 2, c: 3}).toExclude({c: 4}, console.log('the object does not have \'c: 4\' in it'))

// Note that the following functions distinguish between 'Key' and 'Keys'
expect({a: 1}).toIncludeKey('a', console.log('the object include the \'a\' key'))
expect({a: 1, b: 2}).toIncludeKeys(['a', 'b'], console.log('the object includes the \'a\' and \'b\' keys'))

expect({a: 1}).toExcludeKey('b', console.log('the object does not have the \'b\' key in it'))
expect({a: 1, b: 2, c: 3}).toExcludeKeys(['d', 'e'], console.log('the object does not have the \'d\' or \'e\' keys'))

let spy = expect.spyOn(tester, 'goodFunc')
tester.goodFunc()
expect(spy).toHaveBeenCalled(console.log('goodFunc was called'))
spy = expect.spyOn(tester, 'badFunc')
// tester.badFunc()
expect(spy).toNotHaveBeenCalled(console.log('badFunc was not called'))
// expect(spy).toHaveBeenCalledWith(...args)

expect(tester.three).toEqual(3)
                    .toBeLessThan(4)
                    .toBeGreaterThan(2, console.log('3 is equal to 3, less than 4 and greater than 2'))

// more spy functions...

console.log('\nTests passed!')