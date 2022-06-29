import React from "react"
import "./SearchBar.css"
import LocationInfo from "../asset/LocationInfo.json"
import "../common.css"

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.clearResult = this.clearResult.bind(this)
        this.state = {
            searchedLocations: [],
            isSearchBarFocus: false,
            hasSearchResult: false,
            nowInput: "",
        }
    }

    componentDidUpdate(preProps) {
        // 点击到其它位置时，隐藏列表
        if(this.props.globalClickedElementID !== preProps.globalClickedElementID) {
            if(this.props.globalClickedElementID !== "LocationInput") {
                this.clearResult()
            }
        }
    }

    onInput(e) {
        var nowInput = e.target.value
        var searchedLocations = LocationInfo.filter( (location) => this.isMatch(nowInput, location) )
        searchedLocations = searchedLocations.slice(0, 9)
        this.setState({
            searchedLocations: searchedLocations,
            hasSearchResult: searchedLocations.length !== 0,
            nowInput: nowInput
        })
    }

    onSearBarFocus() {
        this.setState({
            isSearchBarFocus: true
        })
        this.onInput({
            target: {
                value: this.state.nowInput
            }
        })
    }

    onSearchBarBlur() {
        this.setState({
            isSearchBarFocus: false
        })
    }

    isMatch(nowInput, location) {
        // 空白输入不处理
        if(!nowInput) return false
        // 输入包含了地区名
        if(nowInput.includes(location.Location_Name_ZH)) return true
        // 地区名包含了输入
        if(location.Location_Name_ZH.includes(nowInput)) return true
        // 默认false
        return false
    }

    onClickListItem(location) {
        this.props.onSearchItemClick(location.Location_ID)
        this.clearResult()
    }

    clearResult() {
        this.setState({
            searchedLocations: [],
            hasSearchResult: false,
        })
    }

    render() {
        var searchBarClassName = this.state.isSearchBarFocus && !this.state.hasSearchResult ? "SearchBar HasBorder" : "SearchBar NoBorder"
        
        var divContainerClassName = this.state.isSearchBarFocus && this.state.hasSearchResult ? "HasBorder" : "NoBorder"
        divContainerClassName += this.state.hasSearchResult ? " GrayBackground" : " NoBackground"
        divContainerClassName += " zIndex1"
        
        var separateLineClassName = "SeparateLine"
        separateLineClassName += this.state.hasSearchResult ? " Visible" : " NotVisible"

        return (
            <div className={ divContainerClassName }>
                <input  className={ searchBarClassName } 
                        placeholder="输入地区名称，如海淀" 
                        onInput={ (e) => this.onInput(e) } 
                        onFocus={ () => this.onSearBarFocus() }
                        onBlur={ () => this.onSearchBarBlur() }
                        id="LocationInput"
                />
                <div className={ separateLineClassName }></div>
                <ul className="LocationsList">
                    {
                        this.state.searchedLocations.map( (location) => 
                            <li className="LocationItem" key={ location.Location_ID } onClick={ () => this.onClickListItem(location) } >
                                {location.Location_Name_ZH}
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default SearchBar