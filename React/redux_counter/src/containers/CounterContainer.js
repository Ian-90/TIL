// import Counter from 'components/Counter'
// import * as actions from 'actions'
// import { connect } from 'react-redux'

// export function getRandomColor() {
//   const colors = [
//     '#495057',
//     '#f03e3e',
//     '#d6336c',
//     '#ae3ec9',
//     '#7048e8',
//     '#4263eb',
//     '#1c7cd6',
//     '#1098ad',
//     '#0ca678',
//     '#37b24d',
//     '#74b816',
//     '#f59f00',
//     '#f76707'
//   ]

//   const random = Math.floor(Math.random() * 13)

//   return colors[random]
// }

// function mapStateToProp(state) {
//   return {
//     color: state.colorData.color,
//     number: state.numberData.number
//   }
// }

// function mapDispatchProps(dispatch) {
//   return {
//     onIncrement: () => dispatch(actions.increment()),
//     onDecrement: () => dispatch(actions.decrement()),
//     onSetColor: () => {
//       const color = getRandomColor()
//       dispatch(actions.setColor(color))
//     }
//   }
// }

// export default connect(mapStateToProp, mapDispatchProps)(Counter)
