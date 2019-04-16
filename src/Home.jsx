import React from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Avatar } from 'antd';
import { schools } from './constants';

export default () => {
  return (
    <Card className="welcome-card">
      <h1>Welcome to House Points!</h1>
      <p>This is a simple demo app to show a school's house points</p>
      <hr/>
      <h2>Available schools:</h2>
      <List
        className="school-list"
        itemLayout="horizontal"
        dataSource={schools}
        renderItem={item => (
          <List.Item actions={[<Link to={`/${item.id}`}>show</Link>]}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<Link to={`/${item.id}`}>{item.name}</Link>}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis est urna. Donec eget sodales dolor."
            />
          </List.Item>
        )}
      />
    </Card>
  )
}