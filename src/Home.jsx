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
    request(`/api/schools`).then(schools => {
      this.setState({ schools });
    }).catch(console.error);
  }

  render() {
    return (
      <Card className="welcome-card">
        <h1>Welcome to House Points!</h1>
        <p>This is a simple demo app to show a school's house points</p>
        <hr/>
        {
          this.state.schools ? <div>
            <h2>Available schools:</h2>
            <List
              className="school-list"
              itemLayout="horizontal"
              dataSource={[...this.state.schools].sort((a, b) => a.name.localeCompare(b.name))}
              renderItem={item => (
                <List.Item actions={[<Link to={`/${item.id}`}>show</Link>]}>
                  <List.Item.Meta
                    title={<Link to={`/${item.id}`}>{item.name}</Link>}
                  />
                </List.Item>
              )}
            />
          </div> : ''
        }
      </Card>
    )
  }
}
