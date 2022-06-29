import React from "react";
import "./WeatherList.css"
import QueryHelper from "../Query/QueryHelper";
import axios from "axios";
import WeatherItem from "./WeatherItem"
import ReactLoading from "react-loading"
import ReactLogo from "../asset/ReactLogo.svg"
import HefengLogo from "../asset/HefengLogo.jpg"

class WeatherList extends React.Component {
    constructor(props) {
        super(props)
        this.getListViewModel = this.getListViewModel.bind(this)
        this.state = {
            weatherListViewModel: [],
            isLoading: false,
        }
    }

    componentDidMount() {
        this.getListViewModel()
    }

    componentDidUpdate(preProps) {
        if (this.props.locationIDList !== preProps.locationIDList) {
            this.getListViewModel()
        }
    }

    getListViewModel() {
        if(this.props.locationIDList.length === 0) {
            this.setState({
                weatherListViewModel: [],
            })
            return
        }
        let requests = []
        // 每个地区，都有若干请求
        for (let id of this.props.locationIDList) {
            let queryConfig = {
                params: {
                    key: QueryHelper.queryInfo.apiKey,
                    location: id,
                }
            }
            // 地区名称
            requests.push(axios.get(QueryHelper.queryInfo.urlLocationInfo, queryConfig))
            // 当前温度和当前描述
            requests.push(axios.get(QueryHelper.queryInfo.urlNowWeather, queryConfig))
            // 温度区间
            requests.push(axios.get(QueryHelper.queryInfo.urlSevenDaysWeather, queryConfig))
            // 天气摘要
            requests.push(axios.get(QueryHelper.queryInfo.urlWeatherAbstract, queryConfig))
        }
        if(requests.length !== 0) {
            this.setState({
                isLoading: true,
            })
        }
        Promise.all(requests)
            .then((allResponse) => {
                let viewModels = []
                // 封装每个地区对应的view model
                for (let i = 0; i < this.props.locationIDList.length; i++) {
                    let ajaxCount = 4
                    let viewModel = {
                        locationName: allResponse[ajaxCount * i].data.location[0].name,
                        nowTemperature: allResponse[ajaxCount * i + 1].data.now.temp + "°",
                        weatherSummary: allResponse[ajaxCount * i + 1].data.now.text,
                        iconCode: allResponse[ajaxCount * i + 1].data.now.icon,
                        rangeTemperature: "最低 " + 
                            allResponse[ajaxCount * i + 2].data.daily[0].tempMin
                            + "°，最高 "
                            + allResponse[ajaxCount * i + 2].data.daily[0].tempMax
                            + "°",
                        weatherAbstract: allResponse[ajaxCount * i + 3].data,
                    }
                    viewModels.push(viewModel)
                }
                this.setState({
                    weatherListViewModel: viewModels,
                    isLoading: false,
                })
            })
    }

    render() {
        let loadingView = (
            <div className="WeatherListLoading">
                <ReactLoading type="spinningBubbles" color="#3D71EA" />
            </div>
        )

        let posterView = (
            <div className="Poster">
                <div className="Logos">
                    <img src={ReactLogo}  className="ReactLogo"/>
                    <img src={HefengLogo}  className="HefengLogo" />
                </div>
                <div className="Text">使用 React 开发的天气应用，数据源于和风天气 👻</div>
            </div>
        )

        let weatherList = (
            <div className="WeatherList">
                {
                    this.state.weatherListViewModel.map((viewModel, index) => {
                        return (
                            <WeatherItem
                                viewModel={viewModel}
                                key={index}
                                index={index}
                                onListItemClick={this.props.onListItemClick}
                            />
                        )
                    })
                }
            </div>
        )

        if(this.state.isLoading) return loadingView
        if(this.props.locationIDList.length === 0) return posterView
        return weatherList
    }
}

export default WeatherList