# 1.Node.js Architecture

A JavaScript runtime environment that allows JavaScript to run outside the browser

At a high level, Node.js consists of:

* JavaScript Engine (V8)
* Node.js Core APIs
* Native bindings (C/C++)
* Event Loop
* libuv

---

## JavaScript Engine (V8)

* V8 is the JavaScript engine developed by Google.
* It converts JavaScript code into machine code that the computer can execute directly.
* V8 provides fast execution by using Just-In-Time (JIT) compilation.
* Node.js relies on V8 to:

  * Parse JavaScript code
  * Execute JavaScript logic
  * Manage memory using garbage collection


---

## Node.js Core APIs

* Core APIs provide built-in functionality such as:

  * File system access (`fs`)
  * Networking (`http`, `net`)
  * Timers (`setTimeout`, `setInterval`)
  * Streams and buffers
* These APIs expose JavaScript-friendly interfaces while internally relying on lower-level system calls.


---

## Native Bindings

* Native bindings connect JavaScript code with C/C++ implementations.
* They act as a bridge between:

  * JavaScript layer (Node.js APIs)
  * Low-level system functionality
* Performance-critical operations such as file I/O and cryptography are implemented in C/C++ and exposed to JavaScript using native bindings.

---

## Event Loop

* The event loop is the core mechanism that enables Node.js to perform non-blocking I/O.
* It continuously checks for pending tasks and executes their callbacks when ready.


---

# 2.libuv

### What is libuv?

* libuv is a C library that provides asynchronous I/O capabilities.
* It is responsible for handling:

  * Event loop implementation
  * Thread pool management
  * Non-blocking I/O operations
  * Cross-platform abstraction

### Why Node.js needs libuv

* JavaScript alone cannot perform low-level system operations.
* libuv enables Node.js to interact with the operating system efficiently.


### Responsibilities of libuv

* Managing the event loop
* Handling timers and scheduled callbacks
* Performing asynchronous file and network operations
* Managing the internal thread pool
* Abstracting OS-specific system calls

---

# 3. Thread Pool

### What is a thread pool?

* A thread pool is a collection of worker threads used to execute blocking or CPU-intensive tasks.
* These threads run in the background without blocking the main event loop.

### Why Node.js uses a thread pool

* Some operations cannot be performed asynchronously at the OS level.
* Running such operations on the main thread would block the event loop.


### Operations handled by the thread pool

* File system operations (e.g., reading and writing files)
* Cryptographic functions
* DNS lookups
* Data compression and decompression

---

# 4. Worker Threads

### What are worker threads?

* Worker threads are separate JavaScript execution threads.
* Each worker has its own event loop and memory space.


### Why are worker threads needed?

* JavaScript is single-threaded by default.
* CPU-intensive tasks can block the main thread.


### Difference between thread pool and worker threads

* Thread pool:

  * Managed internally by libuv
  * Used for specific background operations
  * Not directly controlled by developers

* Worker threads:

  * Explicitly created by developers
  * Run JavaScript code in parallel
  * Suitable for CPU-heavy logic

---

# 4. Event Loop Queues

### Macro Task Queue

* Contains larger asynchronous tasks.
* Tasks are executed one at a time per event loop cycle.

**Examples:**

* `setTimeout`
* `setInterval`
* I/O callbacks
* `setImmediate`

### Micro Task Queue

* Contains high-priority tasks.
* Executed immediately after the current operation completes.

**Examples:**

* `Promise.then()`
* `Promise.catch()`
* `queueMicrotask()`

### Execution Priority

* Micro Task Queue has higher priority than Macro Task Queue.
* After executing a macro task, Node.js completes all micro tasks before moving to the next macro task.

---


