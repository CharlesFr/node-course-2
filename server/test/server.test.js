const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { ObjectId } = require('mongodb');

const todos = [{
  _id: new ObjectId(),
  text: 'First test todo'
}, {
  _id: new ObjectId(),
  text: 'Second test dodo',
  completed: true,
  completedAt: 444
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({
        text
      }).expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({
          text
        }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  })

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({
        text: ''
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  });
});



describe('GET /todos', () => {
  it('should get all todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        //console.log(res);
        expect(res.body.todos.length).toBe(2)

      }).end(done);

  })
});

describe('GET /todos/:id', () => {
  it('it should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('it should return a 404 is todo not found', (done => {
    request(app)
      .get(`/todos/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done)
  }))
})


describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {

    var hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      })
  });

  it('should return a 404 if todo not found', (done) => {
    var hexId = new ObjectId().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  });
})

describe('PACTH /todo/:id', () => {


  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = "This is our new test";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        //console.log("HEY:", res.body);
        console.log("HOY:", typeof res.body.todo.completedAt);

        expect(res.body.todo.text).toNotBe(todos[0].text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');

      })
      .end(done)
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: 'Some random text',
        completed: false,
      })
      .expect(200)
      .expect((res) => {
        //console.log("HEY:", res.body);
        //console.log("HOY:", typeof res.body.todo.completedAt);

        expect(res.body.todo.text).toNotBe(todos[1].text);
        expect(res.body.todo.completedAt).toNotExist(null);
        expect(res.body.todo.completed).toBe(false);

      })
      .end(done)
  })
})