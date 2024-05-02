## Overview

Create a REST API that serves image data requested by a frontend application via short-lived encrypted URIs. This exercise is meant to be incremental, working through each problem should resemble the same flow as creating a proof of concept with features added over time.


#### Timeline

This should be treated as a MVP or PoC (Proof of Concept), so it will be intentionally sparse. This helps us understand your ability to prioritize what is important.

Please provide your solution **within 72 hours** of reading this.


#### Submission

Create a Pull Request for this repository when ready with your result, which we'll use to ask questions and review with you.


## Challenge

Below are the expectations to meet minimum requirements for the challenge presented. Use the tools that you feel will achieve these requirements within the given time frame. Bonus points can be found at the end.


### Step: 1

Create a simple frontend application that retrieves a list of image URLs on load from a REST API, displaying them as a grid on the webpage.

#### Flow

- Application calls REST API endpoint on load
- Endpoint sends a list of image URLs as part of the response body
- Application then calls REST API to retrieve each image from local backend location


### Step: 2

Encrypt the image URIs using the algorithm and encoding scheme of your choice. The API should serve newly generated URIs every time the page reloads, and should decrypt the URI when retrieving the image. The goal is to not expose the source location of the image URL in this process.


### Step: 3

Encode an expiration time (UNIX timestamp), that is configurable, into the encrypted image URI. If the image URI requested is past the expiration time then a 404 should be returned by the API.



## Expectations

Treat this as you would a real-world project that would be used and modified by others in the future, i.e., documentation, tests, etc.

Ask as many questions as you want to ensure you understand what is required.

#### Focus On

-   Code legibility
-   Clear documentation
-   Test coverage - unit / E2E
-   A fully functional demo

#### Don't Stress

-  CI isn't required
-  UI / UX can be minimal

If you have any questions please let us know! Good luck!

## Bonus Points

The options below are assigned varying difficulties that can net you a better score.

- Health Check (*easy*)
  > Create a health check endpoint that returns the current REST API version and git commit hash.

- Frontend Application Updates (*easy*)
  > Application will automatically reload based on image expiration time.

- Compliance (*medium*)
  > Provide a secure and safe way to handle encrypting data as if it were a prod environment. How do you make sure credentials are protected, e.g. via a KMS?

- Optimize Caching (*medium*)
  > Present a way to optimize the caching of data.

- Annotation Result Overlay (*medium*)
  > In the results view, render a shape on top the displayed image based on API-supplied coordinates. Allow the user to toggle different annotation(s) on / off.

- Secure Communication (*hard*)
  > Tamper-proof these requests between client and server. The goal is to preventi an attacker from arbitrarily injecting code / data into either service. How can the server verify the client is legitimate? How can the client prove it's running the expected code?

