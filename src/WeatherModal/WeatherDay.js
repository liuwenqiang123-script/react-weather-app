import React from "react";
import "./WeatherDay.css"

class WeatherDay extends React.Component {
    render() {
        var maxTemperature = this.props.maxTemperature
        var minTemperature = this.props.minTemperature
        var date = this.props.date
        var lineOffset = this.props.lineOffset
        var lineHeight = this.props.lineHeight
        var iconCode = this.props.iconCode

        return(
            <div className="WeatherDay">
                <div className="Text">{maxTemperature}</div>
                <div className="Line" style={{ height: lineHeight }}></div>
                <div className="Text" style={{ marginBottom: lineOffset }} >{minTemperature}</div>
                <img src={ "https://a.hecdn.net/img/common/icon/202106d/" + iconCode + ".png" } className="WeatherIcon"/>
                <div className="Text Date">{date}</div>
            </div>
        )
    }
}

export default WeatherDay