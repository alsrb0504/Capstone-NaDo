import React from "react";

const EmptyState = ({ text }) => (
    <section className="empty-section">
        <div className="empty-container">
        <img className="coffee-img" src="/images/coffee.svg" alt="" />
        </div>
        <p className="empty-text">{text}</p>
    </section>
);
export default EmptyState;