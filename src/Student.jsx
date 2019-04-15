import React, { Component } from 'react';
import './App.css';

class Student extends Component {
    render() {
        console.log(this.props.studentName)
        return (
            <div className="App">
                <header className="students">
                    <p>
                        {this.props.studentName}
                    </p>
                </header>
            </div>
        );
    }
}

export default Student;