import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

db.defaults({
  category: [{
    name: '默认',
    icon: 'list',
    color: 'red'
  }]
}).write()

export default db
