Time and Space Complexity Analysis -

Time analysis analysis :
Parsing of code to AST is linear O(N)
AST Traversal depends on number of nodes, approxiamtely linear O(M ~= N)
Template literal processing depends on number and length O(k*l), k is number of templates, l is average length
Replacement of string - search and write new string, each search takes O(N) for k template literals so O(N*k)
overall time complexity = O(N + M + k + l + k* N)


Space Complexity analysis : 
AST storage requires O(M) space, M is number of nodes

Template Literals Array: The storage for the template literals and their modified versions needs space proportional to the total length of all template literals identified. This is O(k⋅l), where k is the number of template literals and l is the average length of these literals.

Modified Code String: Since each replacement operation generates a new string, the additional space required is proportional to the size of the modifications. The worst-case space complexity for holding the modified code string is O(N), assuming the entire file could be replaced.

Overall space complexity : O(M + k*l +N)


Question 1 'document undefined'
export async function arrayToBase64(array: Uint8Array) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const imageData = await decode(canvas, ctx!, array);

  return imageData;
}

It could be that the environment does not have Document Object Model such as in Node.js or web workers which dont have access to DOM
Make sure to run code in browser. Or use packages like 'canvas' package to run on node if necessary. Can also use conditional clauses like  if (typeof document !== 'undefined') { } to have run on different environments.


Question 2 

ShowUI command is designed to create UI for plugin. Even though it is enclosed in the try block, the application cannot run if nothing is done to handle the error. it will not prevent plugin environment from reacting to improper API usage

QUestion 3 :
It is a CORS issue. - Web browsers restrict web apps from making requests to different domain to the one it was loaded from.
Use server side proxy on backend that forwards request from frontend to github api

Question 4.
Documents may use the Same-Origin-Policy to prevent cross origin interaction between document. Or no H1 elements in the frame.

ensure the correct CORS headers are set

Question 5
It is likely due to caching. browser/codesandbox might cache resources for faster retrieval for performance. Database update might be delayed.

Can change the image URL to force caching systemt to fetch new image


Question 6.
FS is defined in Node.js env, Node.js scripts and server apps.
It is not defined bundlers like webpack where code is designed to be executed in browser.
Create server side api that can access fs and then call it from front end

Question 7 for loop not working
forEach function does not wait for each async function to resolve promises before moving on to the next one.
When console logging , most likely only some of getUser calls have been completed. Also, each invocation 
of async callback creates seperate execution context.

use Promise.all along with a map function.