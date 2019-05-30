import React, { useContext, useEffect } from 'react';
import { Card, Icon, List, Avatar } from 'antd';
import { Store } from '../store';
import request from '../request';
import { mzClick, PAGE_TYPES, mzView } from '../lib/analytics';

export default function School(props) {
  const { state, actions } = useContext(Store);
  const schoolId = props.match.params.id;

  useEffect(() => fetchSchool(), []);

  const fetchSchool = () => {
    request(`/api/schools/${schoolId}`)
      .then(school => {
        actions.setSchool(school);
        return school;
      })
      .then((school) => mzView({ type: PAGE_TYPES.housePoints, school }))
      .catch(console.error);
  }

  const addPoints = (item) => {
    request(`/api/points/${schoolId}/${item.id}`, { method: 'POST' })
    .then(house => {
      actions.addPoints(house);
      return house;
    })
    .then((house) => mzClick({ title: `${house.id}-upvote`}))
    .catch(console.error);
  }

  const removePoints = (item) => {
    request(`/api/points/${schoolId}/${item.id}`, { method: 'DELETE' })
      .then(house => {
        actions.removePoints(house);
        return house;
      })
      .then((house) => mzClick({ title: `${house.id}-downvote`}))
      .catch(console.error);
  }

  if (!state.school) return null;

  return (
    <Card className="schools-points-card" title={<span>{state.school.name}</span>}>
      <Card.Grid style={{width: '100%'}}>
        {
          state.school.houses
          ? <List
              dataSource={[...state.school.houses].sort((a, b) => a.order - b.order)}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={item.name}
                    avatar={<Avatar src={`/images/${item.id}.png`} />}
                    description={
                      <div className="house-description">
                        <div className="schools-points">
                          <div>
                            <h3><Icon type="star" /> Points: { item.points }</h3>
                          </div>
                          <div className="actions">
                            <Icon type="plus-circle" onClick={() => addPoints(item)} theme="twoTone"/>
                            <Icon type="minus-circle" onClick={() => removePoints(item)} theme="twoTone"/>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}>
            </List>
          : null
        }
      </Card.Grid>
    </Card>
  );
}
