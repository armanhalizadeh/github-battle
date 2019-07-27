import React from 'react'
import PropTypes from 'prop-types'

//functional compononent that renders the navbar
function LanguagesNav ({ selected, onUpdateLanguage}) {
    const languages =['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
        
    return (
        <ul className='flex-center'>
            {languages.map((lang) =>{
                return(
                    <li key = {lang}>
                        <button 
                            className= 'btn-clear nav-link' 
                            style = {lang === selected //selected lang shows coral
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

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired,
};

export default class Popular extends React.Component {
    constructor(props){
        super(props);

        //store the current language
        this.state = {
            selectedLanguage: 'All'
        };

        this.navLanguageHandleClick = this.navLanguageHandleClick.bind(this);
    }

    //updates the current language state
    navLanguageHandleClick(newLanguage) {
        this.setState({
            selectedLanguage: newLanguage
        });
    }

    render() {
        const { selectedLanguage } = this.state;

        return (
            <React.Fragment>
                <LanguagesNav //passes selected language and onClick functions to fnc component
                    selected = {selectedLanguage}
                    onUpdateLanguage = {this.navLanguageHandleClick}
                />
            </React.Fragment>
        )
    }
}