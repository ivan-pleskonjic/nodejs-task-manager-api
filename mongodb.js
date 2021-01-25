const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
// console.log(id.id)
// console.log(id.getTimestamp())
// console.log(id.toHexString())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  const db = client.db(databaseName) // creates the DB and returns the reference
  
  // db.collection('users').insertOne({
  //   _id: id,
  //   name: 'Dzudo',
  //   age: 27
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user!')
  //   }

  //   console.log(result.ops) // ops is an array of inserted documents
  // })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Jen',
  //     age: 28
  //   },
  //   {
  //     name: 'Gunther',
  //     age: 26
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert documents!')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Task 1',
  //     completed: true
  //   },
  //   {
  //     description: 'Task 2',
  //     completed: true
  //   },
  //   {
  //     description: 'Task 3',
  //     completed: false
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert tasks!')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('users').findOne({ _id: new ObjectID('60032e6702c62339f9c6dfe8') }, (error, user) => {
  //   if (error) return console.log('unable to fetch!')
    // user is null if no results are found
    // findOne returns the first result matching the filter criteria

  //   console.log(user)
  // })

  // find returns a pointer to the data called a Cursor, the toArray method
  // db.collection('users').find({ age: 27 }).toArray((error, users) => {
  //   console.log(users)
  // })

  // db.collection('users').find({ age: 27 }).count((error, count) => {
  //   console.log(count)
  // })

  // db.collection('tasks').findOne({ _id: new ObjectID('600331b0dc96ad3bf2451255')}, (error, task) => {
  //   if (error) return console.log('unable to fetch task!')

  //   console.log(task)
  // })

  // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
  //   if (error) return console.log('unable to fetch task!')

  //   console.log(tasks)
  // })

  // db.collection('users').updateOne({
  //   _id: new ObjectID('60032faf45e7d03aeb729ee8')
  // }, {
  //   // $set: {
  //   //   name: 'Goran'
  //   // }
  //   $inc: {
  //     age: 1 // incerement the age by 1
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // db.collection('tasks').updateMany({}, {
  //   $set: {
  //     completed: true
  //   }
  // }).then((result) => {
  //   console.log(result.modifiedCount)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // db.collection('users').deleteMany({ age: 27 }).then((result) => console.log(result)).catch((error) => console.log(error))

  db.collection('tasks').deleteOne({ description: 'Task 1'}).then((result) => console.log(result)).catch((error) => console.log(error))
})
