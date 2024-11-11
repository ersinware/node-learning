After socket connection is established, the client sends its public key to the server.
The server generates session key, relates it by the client, encrypts it using client's public key and send it to the client.
The client decrypts the session key using its private key and stores it.
From this point on, the communication is encrypted with AES algorithm.
