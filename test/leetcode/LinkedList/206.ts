export class ListNode {
	public val = null;
	public next?: ListNode = null;
	public constructor(val, next?: ListNode) {
		this.val = val;
		this.next = next;
	}
}

function reverseList(head: ListNode | null): ListNode | null {
	let current = head;
	let prev = null;
	let next = null;
	while (current) {
		next = current.next;
		current.next = prev;
		prev = current;
		current = next;
	}
	return prev;
}
