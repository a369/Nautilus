import {expect} from 'chai';
import * as N from './Nautilus.js';

describe('search', () => {
	it('key, evaluateFirst', () => {
		let obj = {a: 10};
		expect(N.search(obj).key('a').evaluateFirst()).to.equal(10);
	});
	it('matchAll, evaluateAll', () => {
		let obj = {a: 10, b: 11, c: 12};
		expect(N.search(obj).matchAll().evaluateAll().length).to.equal(3);
	});
	it('all, oftype, evaluateWith', () => {
		let obj = {a: 10, b: {a: [23, 45]}, c: 12};
		expect(N.search(obj).all().oftype('number').evaluateWith(Math.max, 0)).to.equal(45);
	});
});

describe('satisfy', () => {
	let obj = {a: 10, b: {a: [23, 45]}, c: 12};
	let pipeline = N.search(obj).all().oftype('number');
	it('satisfyAll true',   () => {
		expect(pipeline.evaluateWith(N.satisfyAll(n => n > 2))).to.equal(true);
	});
	it('satisfyAll false',  () => {
		expect(pipeline.evaluateWith(N.satisfyAll(n => n > 11))).to.equal(false);
	});
	it('satisfySome true',  () => {
		expect(pipeline.evaluateWith(N.satisfySome(n => n > 20))).to.equal(true);
	});
	it('satisfySome false', () => {
		expect(pipeline.evaluateWith(N.satisfySome(n => n > 50))).to.equal(false);
	});
	it('satisfyNone true',  () => {
		expect(pipeline.evaluateWith(N.satisfyNone(n => n < 2))).to.equal(true);
	});
	it('satisfyNone false', () => {
		expect(pipeline.evaluateWith(N.satisfyNone(n => n < 11))).to.equal(false);
	});
});

describe('apply over', () => {
	let pipeline = N.search(10);
	it('apply over', () => {
		expect(pipeline.over(9).evaluateFirst()).to.equal(9);
	});
	it('pipeline is static', () => {
		expect(pipeline.evaluateFirst()).to.equal(10);
	});
});

describe('list', () => {
	let obj = {a: 10, b: {a: [23, 45]}, c: 12};
	let pipeline = N.search(obj).all().oftype('number');
	it('list', () => {
		expect(pipeline.where(n => N.list(3)).list().evaluateAll().length).to.equal(12);
	});
});

