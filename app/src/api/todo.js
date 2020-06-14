import db from '@/db'

const TABLE_NAME = 'todo'

export function listInCategory(category) {
  return db.get(TABLE_NAME).filter({ category: category }).value()
}

export function add(todo) {
  if (todo) {
    todo.id = +new Date()
    db.get(TABLE_NAME).push(todo).write()
  }
}
