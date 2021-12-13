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
};