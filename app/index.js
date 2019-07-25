import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'

// Component
//  State
//  Lifectycle
//  UI

class App extends React.Component {
    
    //returns description of what the UI will look like
    render() {
        return (
            <div className = 'container'> 
                <Popular />
            </div>
        )
    }
}

ReactDOM.render(
    // React Element
    // Where to render the Element to

    <App />,
    document.getElementById('app')
)