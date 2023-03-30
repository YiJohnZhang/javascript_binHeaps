export interface Heap {

	willSwapUp(incumbentIndex:number, contendingIndex:number): boolean;
	willSwapDown(incumbentIndex:number, contendingIndex: number): boolean;
	swap(indexA:number, indexB: number): undefined;
	heapifyUp(childIndex: number): undefined;
		// returns index
	heapifyDown(parentIndex: number): undefined;
		// returns index
	peek(): number;

}