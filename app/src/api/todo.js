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
  const arr = db.get(TABLE_NAME).push(todo).write()
  return arr[arr.length - 1]
}

export function update(todo) {
  if (!todo) {
    return
  }
  db.get(TABLE_NAME).find({ id: todo.id }).assign(todo).write()
}

export function remove(id) {
  return db.get(TABLE_NAME).remove({ id: id }).write()
}

export function statInCategory() {
  return catApi.listAll().map((cat) => {
    return listInCategory(cat.id, false)
  })
}

export function setFlag(id, flag = false) {
  return db.get(TABLE_NAME).find({ id: id }).assign({ flag: flag }).write()
}

/**
 * 批量查询待办
 * @param {Object} params 查询条件
 */
export function list(params = {}) {
  return db.get(TABLE_NAME).filter(params).value()
}