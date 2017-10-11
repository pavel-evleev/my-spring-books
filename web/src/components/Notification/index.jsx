import React from 'react'

import Snackbar from 'material-ui/Snackbar'

export default class Notification extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            open: this.props.open,
            message: this.props.message,


        }
    }

    handleRequestClose = () => {
            this.setState({
            open: false,
            });
        }




    render(){
        return(<Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose}
        />)
    }
}




