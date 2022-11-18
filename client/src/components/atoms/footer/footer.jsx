import React from 'react';

const Footer = () => (
  <div className="footer">
    <div className="box1">
      <p className="firstline">Project NaDo</p>
      <a href="https://github.com/alsrb0504/Capstone-NaDo">
        <img
          src="/images/GitHub-Mark-64px.png"
          alt="github"
          className="iconbox"
        />
      </a>
    </div>

    <p className="secondline">Developed by</p>

    <div className="box2">
      <p className="name">태민규 32174774</p>
      <p className="name">김민준 32170533</p>
      <p className="name">이성재 32173057</p>
      <p className="name">한윤호 32154952</p>
    </div>
  </div>
);

export default Footer;
