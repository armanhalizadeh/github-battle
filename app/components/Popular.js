import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'

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

//takes repos data and creates a grid with card info for each
function ReposGrid({ repos }) {
    return (
        <ul className = 'grid space-around'>
            {repos.map((repo, index) => {
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
                const { login, avatar_url } = owner;

                return (
                    <li key={html_url}>
                        <Card
                            header = {`#${index + 1}`}
                            avatar = {avatar_url}
                            name = {name}
                            href = {html_url}
                        >
                            <ul className = 'card-list'>
                                <li>
                                    <FaUser color = 'rgb(255, 191, 116)' size={22}/>
                                    <a href={`https://github.com/${login}`}>
                                        {login}
                                    </a>
                                </li>
                                <li>
                                    <FaStar color = 'rgb(255, 215, 0)' size={22} />
                                    {stargazers_count.toLocaleString()} stars
                                </li>
                                <li>
                                    <FaCodeBranch color = 'rgb(129, 195, 245)' size={22} />
                                    {forks.toLocaleString()} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color = 'rgb(241, 138, 147)' size={22} />
                                    {open_issues.toLocaleString()} open
                                </li>
                            </ul>
                        </Card>    
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
    constructor(props){
        super(props);

        /* selected language: stores current language
            repos: object to hold git repos for each language. allows caching 
            error: stores error object */
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

        //checks if repo has been fetched for this language and fetches it if it has not
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

    //checked by if no data has been returned or no error thrown
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
                {error && <p className = 'center-text error'>{error}</p>}
                {repos[selectedLanguage] && <ReposGrid repos = {repos[selectedLanguage]} />}
            </React.Fragment>
        )
    }
}