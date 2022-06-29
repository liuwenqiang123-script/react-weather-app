import React from "react"
import Logo from "../asset/logo.svg"
import SearchBar from "./SearchBar"
import "./HeaderBar.css"

class HeaderBar extends React.Component {
    render() {
        return (
            <div className="HeaderBarContainer">
                
                <div className="HeaderBarLeft">
                    <img className="HeaderBarLogo" src={Logo} />
                    <span className="HeaderBarTitle">Weather</span>
                </div>

                <div className="HeaderBarRight">
                    <SearchBar 
                        onSearchItemClick={ this.props.onSearchItemClick }
                        globalClickedElementID={this.props.globalClickedElementID}
                    />
                </div>
                
            </div>
        )
    }
}

export default HeaderBar