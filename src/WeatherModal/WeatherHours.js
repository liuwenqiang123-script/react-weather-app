import React from "react";
import "./WeatherHours.css"
import WeatherHour from "./WeatherHour";

class WeatherHours extends React.Component {
    render() {
        var viewModel = this.props.viewModel
        return (
            <div className="WeatherHours">
                {
                    viewModel.map((model, index) => {
                        return (
                            <WeatherHour 
                                temperature={model.temperature}
                                temperatureLineHeight={model.temperatureLineHeight}
                                iconCode={model.iconCode}
                                time={model.time}
                                key={index}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default WeatherHours