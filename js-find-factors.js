// Write a program to get numbers whose product is 96

function findPairs(product) {
	let pairs = [];
	for (let i = 1; i <= Math.sqrt(product); i++) {
		if (product % i === 0) {
			pairs.push([i, product / i]);
		}
	}
	return pairs;
};

console.log(findPairs(97));