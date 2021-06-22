# KCenter Mobile

## Requirements
* install ionic

```
  npm install -g @ionic/cli@latest
  npm install
  ```
  
## Involved files
* At @/plugin/ws-plugin.js is set a global variable $ws
* At @/main.js -> there's a console.log to check the global variable exist
* At @/components/Login.vue at created: -> getLanguages() -> works access to global variable
* At @/components/Login.vue at methods: -> executeLogin ->  getLanguages() -> NOT WORKS the access to global variable

## How to reproduce the issue
* Use http://localhost:8081 in browser
* Open browser console to watch the log
* Click on sign in button


