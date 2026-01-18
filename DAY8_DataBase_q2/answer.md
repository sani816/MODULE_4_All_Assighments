# 📘 Database Fundamentals – Assignment Answers

---

## 1. Why is `db.json` not suitable as a database for real projects?

Using `db.json` or any file-based storage system is not suitable for real-world applications due to limitations related to performance, scalability, and reliability.

### Limitations of File-Based Storage

#### a) Performance Issues
- Every read or write operation requires reading the entire file into memory
- As data grows, operations become slow and inefficient
- No indexing or query optimization

#### b) Scalability Problems
- File systems cannot handle large amounts of data efficiently
- Not suitable for applications with many concurrent users
- Difficult to scale across multiple servers

#### c) Concurrency Issues
- Multiple users accessing the file at the same time can cause:
  - Race conditions
  - Data corruption
- No transaction or locking mechanism

#### d) Reliability Concerns
- If the server crashes during a write operation, data may be lost
- No backup, rollback, or recovery support

#### e) Security Limitations
- No authentication or authorization
- Data can be easily modified or deleted accidentally

**Conclusion:**  
`db.json` is suitable only for learning, small demos, or prototypes, not for production-level applications.

---

## 2. Ideal Characteristics of a Database System (Apart from Storage)

A database system provides much more than just data storage.

### a) Performance
- Fast read and write operations
- Query optimization and indexing
- Efficient handling of large datasets

### b) Concurrency
- Supports multiple users simultaneously
- Prevents data conflicts using transactions
- Maintains consistency during parallel operations

### c) Reliability
- Protects data against crashes or failures
- Provides backup and recovery mechanisms
- Ensures data durability

### d) Data Integrity
- Enforces rules such as:
  - Primary keys
  - Foreign keys
  - Unique constraints
- Prevents invalid or duplicate data

### e) Scalability
- Handles increasing data and user load
- Supports vertical and horizontal scaling
- Suitable for growing applications

### f) Fault Tolerance
- Continues to work even if some components fail
- Automatic recovery from failures
- Data replication support

**Conclusion:**  
An ideal database ensures speed, safety, consistency, and scalability.

---

## 3. Types of Databases and Their Use Cases

Databases are broadly divided into two main types:

---

## 1. Relational Databases (SQL)

### Description
- Data is stored in tables (rows and columns)
- Uses Structured Query Language (SQL)
- Fixed schema with relationships

### Examples
- MySQL
- PostgreSQL
- Oracle
- SQLite

### Use Cases
- Banking systems
- E-commerce platforms
- Inventory management systems
- Student management systems

### Why Use Relational Databases?
- Strong data consistency
- Supports complex queries and joins
- Well-structured data model

---

## 2. Non-Relational Databases (NoSQL)

### Description
- Flexible or schema-less data structure
- Stores data as documents, key-value pairs, columns, or graphs

### Types and Examples
- Document Database: MongoDB
- Key-Value Database: Redis
- Column Database: Cassandra
- Graph Database: Neo4j

### Use Cases
- Social media platforms
- Real-time chat applications
- Big data analytics
- IoT and logging systems

### Why Use NoSQL Databases?
- High scalability
- Flexible data models
- Handles unstructured or semi-structured data

---

## Final Summary

| Feature | Relational Database | NoSQL Database |
|------|-------------------|---------------|
| Schema | Fixed | Flexible |
| Scalability | Moderate | High |
| Consistency | Strong | Eventual |
| Use Case | Structured data | Large and dynamic data |
