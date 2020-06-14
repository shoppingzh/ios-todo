import db from '@/db'

const TABLE_NAME = 'category'

export function listAll() {
  return db.get(TABLE_NAME).value()
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
    db.get(TABLE_NAME).push(category).write()
  }
}