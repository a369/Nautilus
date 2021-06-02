import {expect} from 'chai';
import search from './Nautilus.js';

describe('search', () => {
	it('key evaluateFirst', () => {
		let obj = {a: 10};
		expect(search(obj).key('a').evaluateFirst()).to.equal(10);
	});
	it('matchAll evaluateAll', () => {
		let obj = {a: 10, b: 11, c: 12};
		expect(search(obj).matchAll().evaluateAll().length).to.equal(3);
	});
	it('all oftype evaluateWith', () => {
		let obj = {a: 10, b: {a: [23, 45]}, c: 12};
		expect(search(obj).all().oftype('number').evaluateWith(Math.max, 0)).to.equal(45);
	});
});
