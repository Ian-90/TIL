const carMakers = ['ford', 'toyota', 'chevy']
// 초기화할 때 타입을 꼭 붙여야 한다
const carMakers2: string [] = []

const dates = [new Date(), new Date()]

const carsByMake = [
  ['f150'],
  ['corolla'],
  ['camaro']
]

// Help with inference when extracting values
const car = carMakers[0] // string
const myCar = carMakers.pop() // string

// Prevent incompatible values
carMakers.push(100)

// Help with 'map'
carMakers.map((car: string): string => {
  return car.toUpperCase()
})

// Flexible types
const importantDates: (Date | string)[] = [new Date(), '2030-10-10']
importantDates.push('2030-10-10')
importantDates.push(new Date())
