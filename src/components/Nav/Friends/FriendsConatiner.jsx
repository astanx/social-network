import { connect } from "react-redux"
import Friends from "./Friends"

let mapStateToProps = (state) => {
    return {
        friendsActive: state.friends.active
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}

const FriendsConatiner = connect(mapStateToProps, mapDispatchToProps)(Friends)

export default FriendsConatiner
