import React from 'react'

export default class Popular extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedLanguage: 'All'
        };
    }

    navLanguageHandleClick(newLanguage) {
        this.setState({
            selectedLanguage: newLanguage
        });
    }

    render() {
        const languages =['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
        
        return (
            <ul className='flex-center'>
                {languages.map((lang) =>{
                    return(
                        <li key = {lang}>
                            <button 
                                className= 'btn-clear nav-link'
                                style = {lang === this.state.selectedLanguage 
                                    ? {color: 'coral'}
                                    : {color: 'black'}}
                                onClick = {() => this.navLanguageHandleClick(lang)}
                            >
                                {lang}
                            </button>
                        </li>
                    )
                })}
            </ul>
        )
    }
}