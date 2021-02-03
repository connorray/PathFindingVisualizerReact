import React from 'react';
import './Legend.css';

const Legend = () => {
    return (
        <div className="legend">
            <a className="ui green label">Start</a>
            <a className="ui red label">Goal</a>
            <a className="ui black label">Wall</a>
            <a className="ui yellow label">Path</a>
        </div>
    );
};

export default Legend;