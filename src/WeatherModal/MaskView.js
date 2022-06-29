import React from "react";
import "./MaskView.css"

class MaskView extends React.Component {
    render() {
        return this.props.isModalShowing && <div className="MaskView" onClick={ this.props.onClick } ></div>
    }
}

export default MaskView