export class ListNode {
	public element = null;
	public next?: ListNode = null;
	public constructor(element, next?: ListNode) {
		this.element = element;
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
