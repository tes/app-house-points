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

  addPoints() {
    this.setState({ points: this.state.points + 1 })
  }

  removePoints() {
    this.setState({ points: this.state.points - 1 })
  }

  render() { 
    return (
      <Card className="schools-points-card" title={<span>{this.state.name} - {this.state.onlineId}</span>}>
        <Card.Grid style={gridStyle}>
          <div className="schools-points">
            <div>
              <h3><Icon type="star" /> School Points: { this.state.points }</h3>
            </div>
            <div className="actions">
              <Icon type="plus-circle" onClick={() => this.addPoints()} theme="twoTone"/>
              <Icon type="minus-circle" onClick={() => this.removePoints()} theme="twoTone"/>
            </div>
          </div>
        </Card.Grid>
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