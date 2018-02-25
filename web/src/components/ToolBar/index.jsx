import React from 'react'
import IconButton from 'material-ui/IconButton'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import List from 'material-ui/svg-icons/action/view-list'
import Grid from 'material-ui/svg-icons/navigation/apps'

export default class ToolbarExamplesSimple extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			view: "grid"
		};
	}

	handleChange = (event, index, value) => this.setState({ value });

	render() {
		let button = null
		if (this.state.view === "grid") {
			button = <List />
		} else {
			button = <Grid />
		}
		return (
			<Toolbar style={{borderRadius:"15px"}} className={this.className}>
				<ToolbarGroup firstChild={true}>
					<IconButton touch={true}
						onClick={() => {
							(this.state.view === "grid") ? (this.setState({ view: "list" })) : (this.setState({ view: "grid" }))
							this.props.changeViewOnClick()
						}}>
						{button}
					</IconButton>
				</ToolbarGroup>
				<ToolbarGroup>
					{this.props.searchComponent}
				</ToolbarGroup>
			</Toolbar>
		);
	}
}