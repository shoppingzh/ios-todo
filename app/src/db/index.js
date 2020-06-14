import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

db.defaults({
  category: [{
    id: 1,
    name: '默认',
    icon: 'list',
    color: 'red'
  }],
  todo: [{
    id: 1,
    title: '洗衣服',
    category: 1,
    done: false
  }]
}).write()

export default db
