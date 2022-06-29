import React from "react";
import "./WeatherDaily.css"
import WeatherDay from "./WeatherDay";

class WeatherDaily extends React.Component {
    render() {
        var viewModel = this.props.viewModel

        return (
            <div className="WeatherDaily">
                {
                    viewModel.map((model, index) => {
                        return (
                            <WeatherDay 
                                maxTemperature={model.maxTemperature}
                                minTemperature={model.minTemperature}
                                date={model.date}
                                lineOffset={model.lineOffset}
                                lineHeight={model.lineHeight}
                                iconCode={model.iconCode}
                                key={index}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default WeatherDaily