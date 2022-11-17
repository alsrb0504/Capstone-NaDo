import React from 'react';

const Footer = () => (
  <div className="footer">
    <div className='box1'>
      <text className='firstline'>Project NaDo</text>
      <a href='https://github.com/alsrb0504/Capstone-NaDo'>
        <img 
          src='/images/GitHub-Mark-64px.png' 
          alt='github' 
          className='iconbox' 
        />
      </a>
    </div>

    <text className='secondline'>Developed by</text>

    <div className='box2'>
      <text className='name'>태민규 32174774</text>
      <text className='name'>김민준 32170533</text>
      <text className='name'>이성재 32173057</text>
      <text className='name'>한윤호 32154952</text>
    </div>
  </div>
);

export default Footer;
