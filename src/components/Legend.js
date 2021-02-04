import React from 'react';
import './Legend.css';

const Legend = () => {
    return (
        <div className="legend">
            <div className="ui green label">Start</div>
            <div className="ui red label">Goal</div>
            <div className="ui black label">Wall</div>
            <div className="ui yellow label">Path</div>
        </div>
    );
};

export default Legend;