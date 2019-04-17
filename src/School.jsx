import React, { Component } from 'react';
import { Card, Icon, List, Avatar } from 'antd';
import { schools } from './constants';

const gridStyle = {
  width: '100%',
};

export default class School extends Component {
  constructor(props) {
    super(props);

    const school = schools.find((s) => s.id.toString() === props.match.params.id);
    this.state = { ...school };
  }

  addPoints(item) {
    const houses = this.state.houses.map((house) => house.id === item.id ? { ...house, points: house.points += 1 } : house);
    this.setState({ houses });
  }

  removePoints(item) { 
    const houses = this.state.houses.map((house) => house.id === item.id ? { ...house, points: house.points -= 1 } : house);
    this.setState({ houses });
  }

  render() { 
    return (
      <Card className="schools-points-card" title={<span>{this.state.name} - {this.state.onlineId}</span>}>
        <Card.Grid style={gridStyle}>
          <h3><Icon type="home" /> Houses:</h3>
          <List
            dataSource={this.state.houses}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a className="house-title">{item.name}</a>}
                  description={
                    <div className="house-description">
                      <div className="schools-points">
                        <div>
                          <h3><Icon type="star" /> Points: { item.points }</h3>
                        </div>
                        <div className="actions">
                          <Icon type="plus-circle" onClick={() => this.addPoints(item)} theme="twoTone"/>
                          <Icon type="minus-circle" onClick={() => this.removePoints(item)} theme="twoTone"/>
                        </div>
                      </div>
                      <h3><Icon type="team" /> Students:</h3>
                      <List
                        dataSource={item.students}
                        renderItem={item => (
                          <List.Item key={item.id}>
                            <List.Item.Meta
                              avatar={<Avatar src={item.avatar} />}
                              title={<a>{item.name}</a>}
                            />
                          </List.Item>
                        )}>
                      </List>
                    </div>
                  }
                />
              </List.Item>
            )}>
          </List>
        </Card.Grid>
      </Card>
    );
  } 
}