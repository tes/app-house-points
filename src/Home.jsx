import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, List } from 'antd';
import request from './request';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    request('/api/user').then(response => {
      this.setState({
        ...response,
        loaded: true,
      });
    }).catch(console.error);
  }

  login(e) {
    e.preventDefault();
    request('/auth/login')
  }

  render() {
    return (
      <Card className="welcome-card">
        <h1>Welcome to House Points!</h1>
        <p>This is a simple demo app to show a school's house points</p>
        <hr/>
        {
          (() => {
             if (!this.state.loaded) return null
             if (!this.state.user) return <div><a href="/login" onClick={(e) => this.login(e)} >Login to see your schools</a></div>
             if (this.state.schools.length === 0)return <div>None of your schools are entitled to use this application</div>
             else return <div>
               <h2>Available schools:</h2>
               <List
                 className="school-list"
                 itemLayout="horizontal"
                 dataSource={[...this.state.schools].sort((a, b) => a.name.localeCompare(b.name))}
                 renderItem={item => (
                   <List.Item actions={[<Link to={`/schools/${item.id}`}>show</Link>]}>
                     <List.Item.Meta
                       title={<Link to={`/schools/${item.id}`}>{item.name}</Link>}
                     />
                   </List.Item>
                 )}
               />
             </div>
          })()
        }
      </Card>
    )
  }
}
