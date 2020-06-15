import db from '@/db'
import * as catApi from './category'

const TABLE_NAME = 'todo'

export function listInCategory(category, done) {
  const query = { category: category }
  if (typeof done !== 'undefined') {
    query.done = done
  }
  
  return db.get(TABLE_NAME).filter(query).value()
}

export function add(todo) {
  if (!todo) {
    return
  }
  todo.id = +new Date()
  db.get(TABLE_NAME).push(todo).write()
}

export function update(todo) {
  if (!todo) {
    return
  }
  db.get(TABLE_NAME).find({ id: todo.id }).assign(todo).write()
}

export function statInCategory() {
  return catApi.listAll().map((cat) => {
    return listInCategory(cat.id, false)
  })
}