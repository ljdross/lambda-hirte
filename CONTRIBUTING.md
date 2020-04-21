## Development Process
We use GitLab to sync code to and from our internal repository. We'll use GitLab
to track issues and review Merge requests.

## Merge Requests
1. Fork the repo and create your branch from `master`.
    - git clone `repository`
    - git checkout master
    - git checkout -b `your_branch_name`
2. Write your code.
3. Ensure the test suite passes.
4. Make sure your code lints.
5. Publish your code.
    - git push
6. Create Merge Request with Issue Number.

## Bugs
3 Ws
1. What? Short description of what happened and what you expect to happen.
2. Where? OS + Browser + IDE
3. When? When this bug happened? If this bug doesn't occur always, explain how to reproduce it.

## Coding Style  
* 80 character line length
* Run `npm run lint` to conform to lint rules

