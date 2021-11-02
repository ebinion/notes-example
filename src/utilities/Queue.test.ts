import Queue from './Queue'

const example = {
  id: 'example-id',
  title: 'Example Title',
}

it('is not empty after adding a note', () => {
  const queue = new Queue<any>()
  queue.enqueue(example)

  expect(queue.isEmpty).toBe(false)
})

it('is empty before adding a note', () => {
  const queue = new Queue<any>()

  expect(queue.isEmpty).toBe(true)
})

it('dequeues notes', () => {
  const queue = new Queue<any>()
  queue.enqueue(example)
  queue.dequeue()

  expect(queue.isEmpty).toBe(true)
})

it('dequeues using a first in, first out strategy', () => {
  const queue = new Queue<any>()
  const firstNote = { ...example, title: 'First note' }
  const secondNote = { ...example, title: 'Second note' }
  queue.enqueue(firstNote)
  queue.enqueue(secondNote)

  expect(queue.dequeue()!.title).toBe(firstNote.title)
})

it('does not enqueue the same note multiple times', () => {
  const queue = new Queue<any>()
  queue.enqueue(example)
  queue.enqueue({ ...example })

  expect(queue.length).toBe(1)
})

it('adds duplicate items to the rear of the queue', () => {
  const queue = new Queue<any>()
  const expectedTitle = 'Expected return title'
  queue.enqueue(example)
  queue.enqueue({ ...example, title: expectedTitle })
  queue.enqueue(example)

  expect(queue.dequeue()!.title).toBe(expectedTitle)
})

it('knows how many items it stores after enqueueing and dequeueing', () => {
  const firstNote = { ...example, title: 'First note' }
  const secondNote = { ...example, title: 'Second note' }
  const thirdNote = { ...example, title: 'Third note' }

  const queue = new Queue<any>()
  queue.enqueue(firstNote)
  queue.enqueue(secondNote)
  queue.enqueue(thirdNote)
  queue.dequeue()

  expect(queue.length).toBe(2)
})

it.todo('calls the provided subscribers when a note is enqueued')

// Read up on mocking first
it.todo('prints notes to the console')
