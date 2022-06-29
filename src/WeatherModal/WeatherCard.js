import React from "react";
import "./WeatherCard.css"
import RainVideo from "../asset/rain.mp4"
import SnowVideo from "../asset/snow.mp4"
import SunVideo from "../asset/sun.mp4"
import ThunderRain from "../asset/thunder_rain.mp4"
import WindVideo from "../asset/wind.mp4"
import CloudVideo from "../asset/cloud.mp4"
import YinWuChenMaiVideo from "../asset/yin_wu_chen_mai.mp4"

class WeatherCard extends React.Component {
    constructor(props) {
        super(props)
        this.getVideoType = this.getVideoType.bind(this)
    }
    
    getVideoType() {
        var summary = this.props.viewModel.weatherSummary
        var mapper = {
            "风": WindVideo,
            "雨": RainVideo,
            "雪": SnowVideo,
            "雷": ThunderRain,
            "多云": CloudVideo,
            "晴": SunVideo,
            "阴": YinWuChenMaiVideo,
            "雾": YinWuChenMaiVideo,
            "尘": YinWuChenMaiVideo,
            "霾": YinWuChenMaiVideo,
            "沙": YinWuChenMaiVideo,
        }
        for(let key in mapper) {
            if(summary.includes(key)) {
                return mapper[key]
            }
        }
        return CloudVideo
    }

    render() {
        var viewModel = this.props.viewModel

        return (
            <div className="WeatherCard">
                <video src={this.getVideoType()} autoPlay loop></video>
                <div className="Text">
                    <div className="Left">{viewModel.nowTemperature}</div>
                    <div className="Right">
                        <div>{viewModel.locationName + " " + viewModel.weatherSummary}</div>
                        <div>{viewModel.rangeTemperature}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherCard