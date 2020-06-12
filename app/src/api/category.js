import db from '@/db'

const TABLE_NAME = 'category'

export function listAll() {
  return db.get(TABLE_NAME).value()
}

export function add(category = {}) {
  const exist = db.get(TABLE_NAME).find({
    name: category.name
  }).value()
  if (exist) {
    //
  } else {
    db.get(TABLE_NAME).push(category).write()
  }
}