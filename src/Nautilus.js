export default search;

export function search(inp, cores = []){
	let isObject = o => typeof o === 'object' && o !== null;
	let unfoldAll = (os, c, m) => 
		os.reduce((m1, o) => (isObject(o) ?
			unfoldAll(Object.values(o), c, m1):
			(Array.isArray(o) ?
				unfoldAll(o, c, m1) : m1)
		), os.reduce(c, m));
	let reduce = (f, m) => {
		if(Array.isArray(f)){
			m = f[1];
			f = f[0];
		}
		cores.push((m, o, core, f) => f(m, o));
		return cores[0](m, inp, retCore(cores, 1, f), f);
	};
	let retCore = (cs, i, f) => {
		return (m, o) => cs[i](m, o, retCore(cs, i + 1, f), f);
	};
	let result = (c) => {
		cores.push(c);
		return search(inp, cores);
	};
	return {
		evaluateWith: reduce,
		evaluateAll:   () => reduce((res, cur) => {res.push(cur); return res}, []),
		evaluateFirst: () => reduce((res, cur) => cur),
		matchAll: () => result(
			(m, o, core) => isObject(o) ? 
				Object.values(o).reduce((res, cur) => core(res, cur), m) : m),
		all:   () => result(
			(m, o, core) => isObject(o) ?
				unfoldAll([o], (res, cur) => core(res, cur), m) :
				(Array.isArray(o) ?
					unfoldAll(o, (res, cur) => core(res, cur), m) : m)),
		list:  () => result(
			(m, o, core) => Array.isArray(o) ?
				o.reduce((res, cur) => core(res, cur), m) : m),
		key:    k => result(
			(m, o, core) => isObject(o) && k in o ? core(m, o[k]) : m),
		oftype: t => result(
			(m, o, core) => typeof o === t ? core(m, o) : m),
		select: f => result(
			(m, o, core) => f(o) ? core(m, o) : m),
		where:  f => result(
			(m, o, core) => core(m, f(o))),
		custom: c => result,
		over:   i => search(i, cores)
	};
}

export function satisfyAll(f){
	return [(res, cur) => f(cur) && res, true];
}

export function satisfySome(f){
	return [(res, cur) => f(cur) || res, false];
}

export function satisfyNone(f){
	return [(res, cur) => !f(cur) && res, true];
}

export function list(n){
	return Array.from(Array(n).keys());
}
