import React, { Component } from 'react';
import socket from 'socket.io-client';

import twitterLogo from '../../images/twitter.svg';
import likeLogo from '../../images/like.svg';
import { listTwitters } from '../../services/twiter-service';

import './timeline.css';

class Timeline extends Component {

    constructor() {
        super();

        this.state = {
            userName: '',
            newTweet: '',
            erroTweet: '',
            tweet: []
        };
    };

    componentDidMount = () => {

        this.realTime();
        const user = window.localStorage.getItem('twitterUsername');
        
        this.setState({ userName: user });

        if(!user) {
            console.log('login');
            this.props.history.push('/');    
        };

        listTwitters()
            .then(data => this.setState({ tweet: data }))
            .catch(erro => console.log(erro))
    };

    realTime() {

        const io = socket('http://localhost:3001');

        io.on('tweet', data => {
            console.log(data)
        });

        io.on('like', data => {
            console.log(data)
        });
    }

    handleLogout = e => {

        e.preventDefault();
        
        window.localStorage.removeItem('twitterUsername');
        this.setState({ userName: '' })
        this.props.history.push('/');
    };
    
    handleSubmit = e => {
        
        e.preventDefault();

        if(!this.state.newTweet) {
            this.setState({ erroTweet: 'Tweet obrigatório' })
            return;
        };

        console.log(this.state.userName, this.state.newTweet);
        this.setState({ newTweet: '' });
        this.setState({ erroTweet: '' })
        return;
    };

    handleTweet = e => {
        this.setState({ newTweet: e.target.value })
    }

    render() {

        return (
            <section>
              <header>
                  <p>{ this.state.userName }</p>
                  <span onClick={ this.handleLogout }>Sair</span>
              </header>

              <div className="timeline-wrapper">
                <img src={ twitterLogo } alt="Logo twitter" />

                <form onSubmit={ this.handleSubmit }>
                    <textarea
                        value={ this.state.newTweet }
                        onChange={ this.handleTweet }
                        placeholder="O que está acontecendo?"
                    />
                    <p>{ this.state.erroTweet }</p>
                    <button type="submit">Twitar</button>
                </form>

                <ul className="tweet-list">
                    {
                        this.state.tweet.map(tweet => {
                            return(
                                <li key={ tweet._id } className="tweet-list">
                                    <strong>{ tweet.author }</strong>
                                    <p>{ tweet.content }</p>
                                    <a>
                                        <img src={ likeLogo } alt="Like image" />
                                        { tweet.likes }
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
              </div>
            </section>
        );
    }
}

export default Timeline;