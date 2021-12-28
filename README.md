# Rest Counter App

Count requests by requesting an arbitrary path. There's is no authentication, besides the obscurity of the path you choose.
A path is abstracted into a `folder` where the count gets saved.

## How to use

Make a GET request to example.test/your-arbitrary-path to initialize a new folder at the count of one.
Every subsequent request to that same path will increase the count by one.
