import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import {ThemeProvider} from './contexts/theme'
import Nav from './components/Nav'

// Component
//  State
//  Lifectycle
//  UI

class App extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            battle: false,
            theme: 'light',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }

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
            <ThemeProvider value = {this.state}>
                <div className = {this.state.theme}>
                    <div className = 'container'> 
                        <Nav />
                        {battle === true ?<Battle /> :<Popular />}
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

ReactDOM.render(
    // React Element
    // Where to render the Element to

    <App />,
    document.getElementById('app')
)