import { ListNode } from './206';

function removeElements(head: ListNode | null, val: number): ListNode | null {
	if (head === null) return head;
	let current = head;
	let next = null;
	while (current) {
		next = current.next;
		if (next && next.val === val) {
			current.next = next.next;
		} else {
			current = next;
		}
	}
	if (head.val === val) {
		head = head.next;
	}
	return head;
}
