import React, { Component } from 'react';
import { Card, Icon, List, Avatar } from 'antd';
import request from './request';

const gridStyle = {
  width: '100%',
};

export default class School extends Component {
  constructor(props) {
    super(props);
    this.state = { id: props.match.params.id };
  }

  componentWillMount() {
    request(`/api/schools/${this.state.id}`).then(school => {
      this.setState({ ...school });
    }).catch(console.error);
  }

  addPoints(item) {
    request(`/api/points/${this.state.id}/${item.id}`, { method: 'POST' })
    .then(house => {
      this.setState({ houses: this.getHousesState(house) })
    }).catch(err => console.error);
  }

  removePoints(item) {
    request(`/api/points/${this.state.id}/${item.id}`, { method: 'DELETE' })
    .then(house => {
      this.setState({ houses: this.getHousesState(house) })
    }).catch(err => console.error);
  }

  getHousesState(house) {
    return this.state.houses.filter(h => h.id !== house.id).concat(house)
  }

  render() {
    return (
      <Card className="schools-points-card" title={<span>{this.state.name}</span>}>
        <Card.Grid style={gridStyle}>
          {
            this.state.houses ? <List
              dataSource={[...this.state.houses].sort((a, b) => a.order - b.order)}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
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
                      </div>
                    }
                  />
                </List.Item>
              )}>
            </List> : ''
          }
        </Card.Grid>
      </Card>
    );
  }
}
