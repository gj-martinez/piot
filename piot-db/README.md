# piot-db

## Usage

```js
const setupDatebase = require('piot-db')

setupDatebase(config).then(db => {
    const {Agent , metric} = db
}).catch(err => console.error(err))

```