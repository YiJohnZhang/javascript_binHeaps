
let testArr = [5, 1, -1, 0, 9, 7, 4, 3, 2, 2];
let testMinBinHeap = new MinBinaryHeap(testArr);
console.log(testMinBinHeap.__repr__());
for(let i=0; i<testArr.length;i++)
	console.log(testMinBinHeap.pop());
  
// expect()
[-1, 0, 1, 2, 2, 3, 4, 5, 7, 9];