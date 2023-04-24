//	John Zhang
//	derivative of my `BinaryHeap` but a lightweight max Binary Heap for leetcode js heap problems
//	https://github.com/YiJohnZhang/javascript_nodal_DS_w_OOP/blob/main/_js_src/binaryHeap.js
//	idea: negate all eleements to mimic a max bin heap.

class MaxBinaryHeap{

	constructor(initArray = []){
		
		this.arrayRepresentation = [];

		if(initArray.length)
			initArray.forEach((element) => this.push(element));

	}

	static willSwapDown(incumbentIndex, contendingIndex){

		return this.arrayRepresentation[incumbentIndex] < this.arrayRepresentation[contendingIndex];

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

	push(elementValue){

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
