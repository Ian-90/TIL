import CounterList from 'components/CounterList'
import * as actions from 'actions'
import { connect } from 'react-redux'
import getRandomColor from 'lib/getRandomColor'

function mapStateToProps(state) {
  return {
    counters: state.counters
  }
}

function mapDispatchProps(dispatch) {
  return {
    onIncrement: (index) => dispatch(actions.increment(index)),
    onDecrement: (index) => dispatch(actions.decrement(index)),
    onSetColor: (index) => {
      const color = getRandomColor()
      dispatch(actions.setColor(index, color))
    }
  }
}

export default connect(mapStateToProps, mapDispatchProps)(CounterList)
