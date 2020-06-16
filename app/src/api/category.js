import db from '@/db'
import * as todoApi from './todo'

const TABLE_NAME = 'category'

export function listAll(countTodo) {
  const list = db.get(TABLE_NAME).value()
  if (countTodo) {
    list.forEach((cat) => {
      cat.todoCount = todoApi.listInCategory(cat.id, false).length
    })
  }
  return list
}

export function getById(id) {
  return db.get(TABLE_NAME).find({ id: parseInt(id) }).value()
}

export function add(category) {
  if (!category) {
    return
  }
  const exist = db.get(TABLE_NAME).find({
    name: category.name
  }).value()
  if (exist) {
    //
  } else {
    category.id = +new Date()
    return db.get(TABLE_NAME).push(category).write()
  }
}

export function update(id, category) {
  return db.get(TABLE_NAME).find({ id: id }).assign(category).write()
}

export function remove(id) {
  return db.get(TABLE_NAME).remove({ id: id }).write()
}
