//	John Zhang
//	derivative of my `BinaryHeap` but a lightweight min Binary Heap for leetcode js heap problems
//	https://github.com/YiJohnZhang/javascript_nodal_DS_w_OOP/blob/main/_js_src/binaryHeap.js
//	idea: negate all eleements to mimic a max bin heap.

class MinBinaryHeap{

	constructor(initArray = []){
		
		this.arrayRepresentation = [];

		if(initArray.length){

			initArray.forEach((element) => {

				// if(typeof element === 'number'){
					this.push(element);
				// }else{
				// 	throw new Error('Each element of the array must be of type `Number`.');
				// }

			});

		}

	}

	// static getParentIndex(childIndex){
	// 	return Math.ceil(childIndex/2) - 1;
	// }

	// static getLeftIndex(parentIndex){
	// 	return parentIndex * 2 + 1;
	// }

	// static getRightIndex(parentIndex){
	// 	return parentIndex * 2 + 2;
	// }

	static willSwapDown(incumbentIndex, contendingIndex){

		return this.arrayRepresentation[incumbentIndex] > this.arrayRepresentation[contendingIndex];

	}

	static willSwapUp(incumbentIndex, contendingIndex){
		return !this.constructor.willSwapDown.call(this, incumbentIndex, contendingIndex);
	}

	static swap(indexA, indexB){

		const temp = this.arrayRepresentation[indexA];
		this.arrayRepresentation[indexA] = this.arrayRepresentation[indexB];
		this.arrayRepresentation[indexB] = temp;

		return;

	}

	static heapifyDown(startIndex){

		let extremaIndex = startIndex;
		const leftChildIndex = startIndex * 2 + 1;
		const rightChildIndex = startIndex * 2 + 2;

		if(leftChildIndex < this.arrayRepresentation.length)
			if(this.constructor.willSwapDown.call(this, extremaIndex, leftChildIndex))
				extremaIndex = leftChildIndex;

		if(rightChildIndex < this.arrayRepresentation.length)
			if(this.constructor.willSwapDown.call(this, extremaIndex, rightChildIndex))
				extremaIndex = rightChildIndex;
		
		if(startIndex !== extremaIndex){

			this.constructor.swap.call(this, startIndex, extremaIndex);
			this.constructor.heapifyDown.call(this, extremaIndex);

		}

	}

	static heapifyUp(startIndex){

		let extremaIndex = startIndex;
		const parentIndex = Math.ceil(startIndex/2) - 1;

		if(parentIndex >= 0)
			if(this.constructor.willSwapUp.call(this, startIndex, parentIndex))
				extremaIndex = parentIndex;
		
		if(startIndex !== extremaIndex){

			this.constructor.swap.call(this, startIndex, extremaIndex);
			this.constructor.heapifyUp.call(this, extremaIndex);

		}

	}

	// __str__(){
	// 	return this.arrayRepresentation;
	// }

	// __repr__(){
	// 	console.log(this.__str__());
	// 	return;
	// }

	// getAtIndex(index){
	// 	return this.arrayRepresentation[index];
	// }

	// removeAtIndex(index){

	// 	if(index < 0 || index > this.arrayRepresentation.length - 1)
	// 		throw new Error('Index out of bounds.');

	// 	this.constructor.swap.call(this, index, this.arrayRepresentation.length - 1);
	// 	const numberRemoved = this.arrayRepresentation.pop();
	// 	this.constructor.heapifyDown.call(this, index);

	// 	return numberRemoved;

	// }

	push(elementValue){

		// if(typeof elementValue !== 'number')
		// 	throw new Error('Only objects of type `Number` are allowed.');

		this.arrayRepresentation.push(elementValue);
		this.constructor.heapifyUp.call(this, this.arrayRepresentation.length - 1);

	}

	peek(){
		return this.arrayRepresentation[0];
	}

	pop(){

		this.constructor.swap.call(this, 0, this.arrayRepresentation.length - 1);
		const numberRemoved = this.arrayRepresentation.pop();
		this.constructor.heapifyDown.call(this, 0);

		return numberRemoved;
	}

}