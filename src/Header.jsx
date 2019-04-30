import React, { useContext, useEffect } from 'react';
import { Icon, PageHeader, Menu, Dropdown, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { Store } from './store';
import request from './request';

export default withRouter((props) => {
  const { state, actions } = useContext(Store);

  useEffect(() => !state.user && fetchUser(), []);

  const fetchUser = () => {
    request('/api/user')
      .then(data => actions.setUser(data))
      .catch(console.log);
  }

  const logout = () => {
    request('/auth/logout')
      .then(data => actions.logout(data))
      .then(() => props.history.push('/'))
      .catch(console.log);
  }

  return (
    <PageHeader
      backIcon={
        <Link to='/'><Icon type="smile" style={{ fontSize: '22px'}} theme="twoTone" /></Link>
      }
      onBack={() => null}
      className="page-header"
      title="House Points"
      subTitle=""
      extra={state.user 
        ? <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item>
                  <Button block onClick={() => logout()}>Logout <Icon type="logout" /></Button>
                </Menu.Item>
              </Menu>
            }>
            <Button className="btn-profile">{state.user.name} <Icon type="user" /></Button>
          </Dropdown>
        : null
      }
    />
  )
});