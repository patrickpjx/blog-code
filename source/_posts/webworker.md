---
title: webworker
date: 2020-07-02 16:10:33
tags:
    - knowledge fragment
---

###### What

A web worker, as defined by the World Wide Web Consortium (W3C) and the Web Hypertext Application Technology Working Group (WHATWG), is a JavaScript script executed from an HTML page that runs in the background, independently of scripts that may also have been executed from the same HTML page.

Web workers are often able to utilize multi-core CPUs more effectively.


###### Overview

As envisioned by WHATWG, web workers are relatively heavy-weight and are not intended to be used in large numbers. 

They are expected to be long-lived, with a high start-up performance cost, and a high per-instance memory cost.[1]

Web workers run outside the context of an HTML document's scripts. 

Consequently, while they do not have access to the DOM, they can facilitate concurrent execution of JavaScript programs.

##### How

``````
var worker = new Worker("worker_script.js");

worker.postMessage("Hello World!");

worker.onmessage = function(event) {
	alert("Received message " + event.data);
	doSomething();
}
	
function doSomething() {
	//do work
	worker.postMessage("Work done!");
}

worker.terminate();
``````
