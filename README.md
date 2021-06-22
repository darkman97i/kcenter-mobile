# KCenter Mobile

## Requirements
* install ionic ( maybe ionic should be installed with sudo )
  npm install -g @ionic/cli@latest
  npm install
  
## Involved files
* At @/plugin/ws-plugin.js is set a global variable $ws
* At @/main.js -> there's a log to check the global variable exist
* At @/components/Login.vue at created: -> getLanguages() -> works
* At @/components/Login.vue at methods: -> executeLogin ->  getLanguages() -> NOT WORKS

## How to reproduce the issue
* Use http://localhost:8081 in browser
* Open browser console to watch the log
* Click on sign in button


