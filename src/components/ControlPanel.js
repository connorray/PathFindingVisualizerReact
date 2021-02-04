import React, {useState} from 'react';

const ControlPanel = (props) => {
    const [selected, setSelected] = useState('Djikstra');
    return (
        <div className="ui segment">
            <div className="ui horizontal menu">
                <div className="menu">
                    <div onClick={()=>setSelected('Djikstra')} className="item">Djikstra's</div>
                    <div onClick={()=>setSelected('BFS')} className="item">BFS</div>
                    <div onClick={()=>setSelected('DFS')} className="item">DFS</div>
                    <div onClick={()=>setSelected('A*')} className="item">A*</div>
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