//	John Zhang
//	2023-03-29

class BinaryHeap{

	constructor(initArray = [], heapType = 'maxHeap'){

		if(!Array.isArray(initArray))
			throw new Error('The `BinaryHeap` may only be initialized with an object of type `Array`.');

		if(!(heapType === 'maxHeap' || heapType === 'minHeap'))
			throw new Error('The heap type must be either `maxHeap` or `minHeap`; the variable `heapType` must be of type `String`.');

		this.heapType = heapType;
		this.arrayRepresentation = [];

		if(initArray.length){

			initArray.forEach((element) => {

				if(typeof element === 'number'){
					this.push(element);
				}else{
					throw new Error('Each element of the array must be of type `Number`.');
				}

			});

		}

	}

	static getParentIndex(childIndex){
		return Math.ceil(childIndex/2) - 1;
	}

	static getLeftIndex(parentIndex){
		return parentIndex * 2 + 1;
	}

	static getRightIndex(parentIndex){
		return parentIndex * 2 + 2;
	}

	static willSwapDown(incumbentIndex, contendingIndex){

		if(this.heapType === 'minHeap')
			return this.arrayRepresentation[incumbentIndex] > this.arrayRepresentation[contendingIndex];
	
		if(this.heapType === 'maxHeap')
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
		const leftChildIndex = this.constructor.getLeftIndex(startIndex);
		const rightChildIndex = this.constructor.getRightIndex(startIndex);

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
		const parentIndex = this.constructor.getParentIndex(startIndex);

		if(parentIndex >= 0)
			if(this.constructor.willSwapUp.call(this, startIndex, parentIndex))
				extremaIndex = parentIndex;
		
		if(startIndex !== extremaIndex){

			this.constructor.swap.call(this, startIndex, extremaIndex);
			this.constructor.heapifyUp.call(this, extremaIndex);

		}

	}

	__str__(){
		return this.arrayRepresentation;
	}

	__repr__(){
		console.log(this.__str__());
		return;
	}

	getAtIndex(index){
		return this.arrayRepresentation[index];
	}

	removeAtIndex(index){

		if(index < 0 || index > this.arrayRepresentation.length - 1)
			throw new Error('Index out of bounds.');

		this.constructor.swap.call(this, index, this.arrayRepresentation.length - 1);
		const numberRemoved = this.arrayRepresentation.pop();
		this.constructor.heapifyDown.call(this, index);

		return numberRemoved;

	}

	push(elementValue){

		if(typeof elementValue !== 'number')
			throw new Error('Only objects of type `Number` are allowed.');

		this.arrayRepresentation.push(elementValue);
		this.constructor.heapifyUp.call(this, this.arrayRepresentation.length - 1);

	}

	peek(){
		return this.getAtIndex(0);
	}

	pop(){
		return this.removeAtIndex(0);
	}

}