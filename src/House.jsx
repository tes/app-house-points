import React, { Component } from 'react';
import './App.css';
import Student from './Student'

class House extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0
        }
    }

    onclick(type){
        this.setState(prevState => {
           return {points: type === 'add' ? prevState.points + 1: prevState.points - 1}
        });
    }

    render() {
        console.log(this.props.pic)
        return (
            <div className="App">
                <header className="App-header">
                <img src={this.props.image} className="small-logo" alt=""></img>
                    <h3>
                        {this.props.name}' house points: {this.state.points}
                    </h3>
                    <input type='button' onClick={this.onclick.bind(this, 'add')} value={`Increase ${this.props.name}'s house points`}/>
                    <input type='button' onClick={this.onclick.bind(this, 'sub')} value={`Decrease ${this.props.name}'s house points`}/>
                    <div>
                        <p>Students:</p>
                        {this.props.studentNames.map(name => {
                            return (<div>
                                <Student studentName={name} />
                            </div>)
                        })}
                    </div>
                </header>
            </div>
        );
    }
}

export default House;
