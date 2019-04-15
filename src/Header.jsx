import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, PageHeader } from 'antd';

export default () => {
  return (
    <PageHeader
      backIcon={
        <Link to='/'><Icon type="smile" style={{ fontSize: '22px'}} theme="twoTone" /></Link>
      }
      onBack={() => null}
      className="page-header"
      title="School Points"
      subTitle="This is a subtitle"
    />
  )
}