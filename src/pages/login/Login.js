import React, { Component } from 'react';

import logoTwitter from '../../images/twitter.svg';
import './login.css';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            username: ''
        };
    };

    componentDidMount() {

        const user = window.localStorage.getItem('twitterUsername');
        if(user) this.props.history.push('/timeline');
        
    };

    handleSubmit = e => {
        
        e.preventDefault();

        if(!this.state.username) return;
        
        window.localStorage.setItem('twitterUsername', this.state.username);
        
        this.props.history.push('/timeline');
    };

    handleInputChange = e => {

        this.setState({ username: e.target.value });
    }

    render() {
        return (
            <section className="login-wrapper">
                <figure>
                    <img src={ logoTwitter } alt="Logo Twitter"  />
                </figure>

                <form onSubmit={ this.handleSubmit }>
                    <input 
                        type="text" 
                        placeholder="Digite o seu login" 
                        value={ this.state.username }
                        onChange={ this.handleInputChange } />
                    <button type="submit">Entrar</button>
                </form>
            </section>
        );
    }
}

export default Login;