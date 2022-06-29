import React from "react";
import "./WeatherModal.css"
import ReactLoading from "react-loading"
import axios from "axios";
import WeatherCard from "./WeatherCard";
import WeatherHours from "./WeatherHours";
import WeatherDaily from "./WeatherDaily";
import QueryHelper from "../Query/QueryHelper";

class WeatherModal extends React.Component {
    constructor(props) {
        super(props)
        this.getLocationName = this.getLocationName.bind(this)
        this.getNowWeather = this.getNowWeather.bind(this)
        this.getSevenDaysWeather = this.getSevenDaysWeather.bind(this)
        this.getHoursWeather = this.getHoursWeather.bind(this)

        this.state = {
            isLoading: true,
            weatherCardViewModel: {},
            weatherHoursViewModel: [],
            weatherDaysViewModel: [],
        }
    }

    QueryInfo = QueryHelper.queryInfo

    componentDidUpdate(preProps) {
        if(this.props.locationID !== preProps.locationID) {
            this.setState({
                isLoading: true,
            })
            var requests = [
                // 获取地区名称
                axios.get(this.QueryInfo.urlLocationInfo + "key=" + this.QueryInfo.apiKey + "&location=" + this.props.locationID),
                // 获取实时天气，包括当前温度和描述文本
                axios.get(this.QueryInfo.urlNowWeather + "key=" + this.QueryInfo.apiKey + "&location=" + this.props.locationID),
                // 获取7日天气
                axios.get(this.QueryInfo.urlSevenDaysWeather + "key=" + this.QueryInfo.apiKey + "&location=" + this.props.locationID),
                // 获取24小时天气
                axios.get(this.QueryInfo.urlHoursWeather + "key=" + this.QueryInfo.apiKey + "&location=" + this.props.locationID),
            ]
            Promise.all(requests)
                .then((allResponse) => {
                    this.getLocationName(allResponse[0])
                    this.getNowWeather(allResponse[1])
                    this.getSevenDaysWeather(allResponse[2])
                    this.getHoursWeather(allResponse[3])
                    this.setState({
                        isLoading: false,
                    })
                })
        }
    }

    getLocationName(response) {
        let viewModel = this.state.weatherCardViewModel
        viewModel.locationName = response.data.location[0].name
        this.setState({
            weatherCardViewModel: viewModel,
        })
    }

    getNowWeather(response) {
        let viewModel = this.state.weatherCardViewModel
        viewModel.nowTemperature = response.data.now.temp + "°"
        viewModel.weatherSummary = response.data.now.text
        this.setState({
            weatherCardViewModel: viewModel,
        })
    }

    getSevenDaysWeather(response) {
        // 卡片的温度范围
        let viewModel = this.state.weatherCardViewModel
        viewModel.rangeTemperature = response.data.daily[0].tempMin + "°  ~  " + response.data.daily[0].tempMax + "°"
        this.setState({
            weatherCardViewModel: viewModel,
        })
        // 7日天气
        var weatherDaysViewModel = []
        var minTempIn7Days = 1000
        var maxTempIn7Days = -1000
        var days = response.data.daily

        for (let i = 0; i < days.length; i++) {
            let viewModel = {
                maxTemperature: days[i].tempMax,
                minTemperature: days[i].tempMin,
                date: i === 0 ? "今日" : this.getWeekFromDate(days[i].fxDate),
                lineOffset: 0,
                lineHeight: 100,
                iconCode: days[i].iconDay,
            }
            weatherDaysViewModel.push(viewModel)
            minTempIn7Days = Math.min(minTempIn7Days, days[i].tempMin)
            maxTempIn7Days = Math.max(maxTempIn7Days, days[i].tempMax)
        }

        var lineDelta = 55 / (maxTempIn7Days - minTempIn7Days)
        for (let i = 0; i < weatherDaysViewModel.length; i++) {
            let viewModel = weatherDaysViewModel[i]
            viewModel.lineOffset = (viewModel.minTemperature - minTempIn7Days) * lineDelta
            viewModel.lineOffset += "px"
            viewModel.lineHeight = (viewModel.maxTemperature - viewModel.minTemperature) * lineDelta
            viewModel.lineHeight += "px"
            viewModel.maxTemperature += "°"
            viewModel.minTemperature += "°"
        }
        this.setState({
            weatherDaysViewModel: weatherDaysViewModel,
        })
    }

    getHoursWeather(response) {
        var weatherHoursViewModel = []
        var hours = response.data.hourly
        var minTemperature = 1000

        for (let i = 0; i < hours.length; i++) {
            if (i % 2 === 1) continue
            let viewModel = {
                temperature: hours[i].temp,
                temperatureLineHeight: 10,
                iconCode: hours[i].icon,
                time: parseInt(hours[i].fxTime.substr(11, 2)) + "时"
            }
            weatherHoursViewModel.push(viewModel)
            minTemperature = Math.min(minTemperature, parseFloat(hours[i].temp))
        }

        for (let i = 0; i < weatherHoursViewModel.length; i++) {
            var heightDiff = (weatherHoursViewModel[i].temperature - minTemperature) * 5
            weatherHoursViewModel[i].temperatureLineHeight += heightDiff
            weatherHoursViewModel[i].temperatureLineHeight += "px"
            weatherHoursViewModel[i].temperature += "°"
        }
        this.setState({
            weatherHoursViewModel: weatherHoursViewModel
        })
    }

    // 根据日期获取星期
    // dateString 日期字符串，如：2021-07-28
    getWeekFromDate(dateString) {
        var dateArray = dateString.split("-");
        var date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        return "周" + "日一二三四五六".charAt(date.getDay());
    }

    render() {
        var loadingContainer = (
            <div className="LoadingContainer">
                <ReactLoading type="spinningBubbles" color="#3D71EA" className="ReactLoading" />
            </div>
        )

        var weatherDetails = (
            <div className="WeatherDetailContainer">
                <WeatherCard
                    viewModel={this.state.weatherCardViewModel}
                />

                <div className="HoursAndDaily">
                    <WeatherHours
                        viewModel={this.state.weatherHoursViewModel}
                    />
                    <WeatherDaily
                        viewModel={this.state.weatherDaysViewModel}
                    />
                </div>
            </div>
        )

        var addButtonStyle = {
            color: this.props.isAdded ? "rgb(61, 113, 234)" : "rgb(133, 144, 166)",
        }

        return this.props.isModalShowing && ( // 显示受开关控制
            <div className="WeatherModalContainer">
                {
                    this.state.isLoading ? loadingContainer : weatherDetails
                }
                <div className="ModalSeparateLine"></div>
                <div className="ModalButtonContainer">
                    <button className="ModalButton" onClick={this.props.onModalAddButtonClick} style={addButtonStyle}>
                        <i className="iconfont icon-shoucang"></i>
                        添加
                    </button>
                    <button className="ModalButton" onClick={this.props.onModalCancelButtonClick}>
                        <i className="iconfont icon-guanbi"></i>
                        关闭
                    </button>
                </div>
            </div>
        )
    }
}

export default WeatherModal