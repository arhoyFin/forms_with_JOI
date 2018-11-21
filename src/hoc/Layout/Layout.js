import React from 'react';
import Header from '../../components/Header/Header';
import './Layout.css';
const Layout = (props) => {
    return (
        <div className = "Layout">
         <Header/>
          {props.children}
        </div>
  
    );
};

export default Layout;