import React from "react";
import "./WeatherHour.css"

class WeatherHour extends React.Component {

    render() {
        var temperature = this.props.temperature
        var temperatureLineHeight = this.props.temperatureLineHeight
        var iconCode = this.props.iconCode
        var time = this.props.time

        return (
            <div className="WeatherHour">
                <div className="Number">{ temperature }</div>
                <div className="TemperatureLine" style={{ height: temperatureLineHeight }}></div>
                <img src={ "https://a.hecdn.net/img/common/icon/202106d/" + iconCode + ".png" } className="WeatherIcon"/>
                <div className="Number">{ time }</div>
            </div>
        )
    }
}

export default WeatherHour