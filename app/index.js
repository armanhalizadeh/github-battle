import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import {ThemeProvider} from './contexts/theme'
import Nav from './components/Nav'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Results from './components/Results'

// Component
//  State
//  Lifectycle
//  UI

class App extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }

        }
    }

    //returns description of what the UI will look like
    render() {
        return (
            <Router>
                <ThemeProvider value = {this.state}>
                    <div className = {this.state.theme}>
                        <div className = 'container'> 
                            <Nav />
                            <Switch>
                                <Route exact path='/' component={Popular} />
                                <Route exact path='/battle' component={Battle} />
                                <Route path='/battle/results' component={Results} />
                                <Route render={()=> <h1>404 😢</h1>} />
                            </Switch>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    // React Element
    // Where to render the Element to

    <App />,
    document.getElementById('app')
)