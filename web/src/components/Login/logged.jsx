import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LoggedAction from '../../ducks/action'


class Logged extends Component{
  constructor(props){
    super(props)
  }
  
  render(){
    console.log(this.props)
    return(
      <IconMenu
        {...this.props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" onClick = {this.props.loggoutHandle} />
      </IconMenu>
    )
  }

}

const mapStateToProps = (state) => {
	return{
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		loggoutHandle: bindActionCreators(LoggedAction.loggoutUser, dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Logged)