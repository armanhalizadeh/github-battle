import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'

// Component
//  State
//  Lifectycle
//  UI

class App extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            battle: true,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(({battle}) => ({
            battle: !battle,
        }))
    }

    //returns description of what the UI will look like
    render() {
        const {battle} = this.state;

        return (
            <React.Fragment>
                <button className = "btn btn-clear" onClick = {this.handleClick}>Switch</button>
                <div className = 'container'> 
                    {battle === true ?<Battle /> :<Popular />}
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    // React Element
    // Where to render the Element to

    <App />,
    document.getElementById('app')
)