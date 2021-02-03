import React, {useState} from 'react';

const ControlPanel = (props) => {
    const [selected, setSelected] = useState('Djikstra');
    return (
        <div className="ui segment">
            <div className="ui horizontal menu">
                <div className="menu">
                    <a onClick={()=>setSelected('Djikstra')} className="item">Djikstra's</a>
                    <a onClick={()=>setSelected('BFS')} className="item">BFS</a>
                    <a onClick={()=>setSelected('DFS')} className="item">DFS</a>
                    <a onClick={()=>setSelected('A*')} className="item">A*</a>
                </div>
            </div>
            <button className="ui right labeled icon button" onClick={props.runButton()}>
                <i className="right arrow icon"></i>
                {`Run ${selected}`}
            </button>
            <button className="ui button" onClick={props.clearButton()}>
                Clear
            </button>
        </div>
    );
}

export default ControlPanel;