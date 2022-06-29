import React from "react";
import "./WeatherItem.css"

class WeatherItem extends React.Component {
    constructor(props){
        super(props)
        this.onDetailButtonClick = this.onDetailButtonClick.bind(this)
    }

    onDetailButtonClick() {
        let index = this.props.index
        this.props.onListItemClick(index)
    }

    render() {
        let viewModel = this.props.viewModel
        let itemClassName = "WeatherItem "
        itemClassName += viewModel.weatherSummary.includes("晴") ? "backLight" : "backGray"
        itemClassName += " "
        itemClassName += (this.props.index + 1) % 3 === 0 ? "noMarginRight" : "hasMarginRight"

        return (
            <div className={itemClassName}>
                <div className="Name">{viewModel.locationName}</div>
                <div className="Detail">
                    <img src={ "https://a.hecdn.net/img/common/icon/202106d/" + viewModel.iconCode + ".png" } className="Icon"/>
                    <div className="Right">
                        <div className="Temp">{viewModel.nowTemperature}</div>
                        <div className="Summary">{viewModel.weatherSummary}</div>
                    </div>
                </div>
                <div className="Text">{viewModel.rangeTemperature + "   " + viewModel.weatherAbstract}</div>
                <button
                    className="iconfont icon-cangpeitubiao_xiangqingpicixiangqingpandianxiangqing"
                    onClick={ () => this.onDetailButtonClick() }
                >
                </button>
            </div>
        )
    }
}

export default WeatherItem