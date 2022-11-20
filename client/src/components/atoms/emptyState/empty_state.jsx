import React from "react";

const sampletext = 'store'

const EmptyState = ({ text, type }) => {
    if(type===sampletext) {
        return (
            <section className="empty-section-store">
                <div>
                    <img className="coffee-img" src="/images/coffee.svg" alt="" />  
                </div>
                <p>{text}</p>
            </section>
        );
    } 
    return (
        <section className="empty-section">
            <div className="empty-container">
                <img className="coffee-img" src="/images/coffee.svg" alt="" />
            </div>
            <p className="empty-text">{text}</p>
        </section>
    );
};
export default EmptyState;