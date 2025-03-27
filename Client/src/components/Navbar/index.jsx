import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import brandLogo from '../../img/brand-logo.png';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const Navbar = () => {  
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffffff'
        }}
      >
        <img src={brandLogo} alt="brand-logo"  height="35em"/>
        <Menu mode="horizontal" style={{ 
            flex: 1, 
            minWidth: 0,
            backgroundColor: '#ffffff',
          }}>
          <Menu.Item key="1" className='Nav-content'>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" className='Nav-content'>
            <Link to="/">My Bookings</Link>
          </Menu.Item>
          <Menu.Item key="3" className='Nav-content'>
            <Link to="/">Milind</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};
export default Navbar;