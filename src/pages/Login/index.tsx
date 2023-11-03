import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import './index.less'

const Login = () => {
    return (
        <div>Login</div>
    )
}

const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

// way 1
const mapDispatchToProps1 = (dispatch) => {
    return {
        // dispatching plain actions
        increment: () => dispatch(increment),
        decrement: () => dispatch(decrement),
        reset: () => dispatch(reset),
    }
}

// way 2
const mapDispatchToProps2 = (dispatch) => {
    return bindActionCreators({increment, decrement, reset}, dispatch)
}

export default connect(null, mapDispatchToProps1)(Login)