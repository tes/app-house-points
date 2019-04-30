import React, { useContext } from 'react';
import { Card, List, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Store } from './store';
import request from './request';

export default function Home() {
  const { state } = useContext(Store);
 
  const login = (e) => {
    request('/auth/login').catch(console.log);
  }

  const renderSchools = () => {
    if (!state.loaded) {
      return null;
    }
    if (!state.user) {
      return <Button onClick={() => login()}><Icon type="login" /> Login to see your schools</Button>
    }
    if (state.schools.length === 0) {
      return <div>None of your schools are entitled to use this application</div>
    }
    return (
      <div>
        <h2>Available schools:</h2>
        <List
          className="school-list"
          itemLayout="horizontal"
          dataSource={[...state.schools].sort((a, b) => a.name.localeCompare(b.name))}
          renderItem={item => (
            <List.Item actions={[<Link to={`/schools/${item.id}`}>show</Link>]}>
              <List.Item.Meta
                title={<Link to={`/schools/${item.id}`}>{item.name}</Link>}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }

  return (
    <Card className="welcome-card">
      <h1>Welcome to House Points!</h1>
      <p>This is a simple demo app to show a school's house points</p>
      <hr/>
      {renderSchools()}
    </Card>
  )
}
