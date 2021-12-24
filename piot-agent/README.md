# piot-agent

## Usage

``` js
const PiotAgent = require('piot-agent')

const agent = new PiotAgent({
  interval: 2000
})

agent.connect()

agent.on('agent/message', payload => {
  console.log(payload)
})

setTimeout(() => agent.disconnect(), 20000)

```