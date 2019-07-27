import React from 'react'

function LanguagesNav ({ selected, onUpdateLanguage}) {
    const languages =['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
        
    return (
        <ul className='flex-center'>
            {languages.map((lang) =>{
                return(
                    <li key = {lang}>
                        <button 
                            className= 'btn-clear nav-link'
                            style = {lang === selected 
                                ? {color: 'coral'}
                                : {color: 'black'}}
                            onClick = {() => onUpdateLanguage(lang)}
                        >
                            {lang}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

export default class Popular extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedLanguage: 'All'
        };

        this.navLanguageHandleClick = this.navLanguageHandleClick.bind(this);
    }

    navLanguageHandleClick(newLanguage) {
        this.setState({
            selectedLanguage: newLanguage
        });
    }

    render() {
        const { selectedLanguage } = this.state;

        return (
            <React.Fragment>
                <LanguagesNav
                    selected = {selectedLanguage}
                    onUpdateLanguage = {this.navLanguageHandleClick}
                />
            </React.Fragment>
        )
    }
}