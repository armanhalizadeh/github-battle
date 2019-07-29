import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

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
            selectedLanguage: 'All',
            repos: {},
            error: null,
        };

        this.navLanguageHandleClick = this.navLanguageHandleClick.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        this.navLanguageHandleClick(this.state.selectedLanguage)
    }

    //updates the current language state
    navLanguageHandleClick(newLanguage) {
        this.setState({
            selectedLanguage: newLanguage,
            error: null,
        });

        if (!this.state.repos[newLanguage])
        {
            fetchPopularRepos(newLanguage)
            .then((data) => this.setState(({repos}) => ({
                repos: {
                    ...repos,
                    [newLanguage]: data,
                }
            })))
            .catch(() => {
                console.warn("Error fetching repos: ", error);

                this.setState({
                    error: 'There was an error fetching the repositories.'
                })
            })
        } 
    }

    isLoading() {
        const { selectedLanguage, repos, error } = this.state;

        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state;

        return (
            <React.Fragment>
                <LanguagesNav //passes selected language and onClick functions to fnc component
                    selected = {selectedLanguage}
                    onUpdateLanguage = {this.navLanguageHandleClick}
                />

                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
            </React.Fragment>
        )
    }
}