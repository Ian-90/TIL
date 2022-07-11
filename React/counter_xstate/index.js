const { createMachine, assign, interpret } = require("xstate")


const increment = (context) => context.count + 1
const decrement = (context) => context.count - 1

const isNotMax = (context) => context.count < 10
const isNotMin = (context) => context.count >= 0

const counterMachine = createMachine({
  initial: 'active',
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        INC: {
          actions: assign({ count: increment }),
          cond: isNotMax,
        },
        DEC: {
          actions: assign({ count: decrement }),
          cond: isNotMin,
        },
      },
    },
  },
})

const counterService = interpret(counterMachine)
  .onTransition((state) => console.log(state.context.count))
  .start()

counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')
counterService.send('INC')