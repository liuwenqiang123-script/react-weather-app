import React from 'react';
import HeaderBar from './Header/HeaderBar';
import './App.css';
import WeatherModal from "./WeatherModal/WeatherModal"
import MaskView from './WeatherModal/MaskView';
import WeatherList from './WeatherList/WeatherList';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.onSearchItemClick = this.onSearchItemClick.bind(this)
    this.onModalCancelButtonClick = this.onModalCancelButtonClick.bind(this)
    this.onModalAddButtonClick = this.onModalAddButtonClick.bind(this)
    this.onGlobalClick = this.onGlobalClick.bind(this)
    this.onListItemClick = this.onListItemClick.bind(this)

    this.state = {
      isModalShowing: false,
      modalLocationID: "",
      locationIDList: [],
      globalClickedElementID: "",
    }
  }

  locationIDListKey = "locationIDListKey"

  componentDidMount() {
    let preIDList = localStorage.getItem(this.locationIDListKey)
    if(preIDList !== null) {
      this.setState({
        locationIDList: JSON.parse(preIDList),
      })
    }
  }

  componentDidUpdate(_, preState) {
    let newList = this.state.locationIDList
    if(newList !== preState.locationIDList) {
      localStorage.setItem(this.locationIDListKey, JSON.stringify(newList))
    }
  }

  onSearchItemClick(locationID) {
    this.setState({
      isModalShowing: true,
      modalLocationID: locationID,
    })
  }

  onModalCancelButtonClick() {
    this.setState({
      isModalShowing: false,
    })
  }

  onModalAddButtonClick() {
    var nowList = JSON.parse(JSON.stringify(this.state.locationIDList))
    var nowID = this.state.modalLocationID
    var index = nowList.indexOf(nowID)
    if(index === -1) {
      nowList.push(nowID)
    }
    else {
      nowList.splice(index, 1)
    }
    this.setState({
      locationIDList: nowList,
    })
  }

  onGlobalClick(e) {
    this.setState({
      globalClickedElementID: e.target.id,
    })
  }

  onListItemClick(itemIndex) {
    let locationID = this.state.locationIDList[itemIndex]
    this.setState({
      modalLocationID: locationID,
      isModalShowing: true,
    })
  }

  render() {
    return (
      <div className='MyRoot' onClick={ e => this.onGlobalClick(e) }>
      <div className='AppContainer'>
        <HeaderBar 
          onSearchItemClick={ this.onSearchItemClick }
          globalClickedElementID={ this.state.globalClickedElementID }
        />
        <WeatherList
          locationIDList={this.state.locationIDList}
          onListItemClick={this.onListItemClick}
        />
        <MaskView
          isModalShowing={ this.state.isModalShowing }
          onClick={ this.onModalCancelButtonClick }
        />
        <WeatherModal
          isModalShowing={ this.state.isModalShowing } 
          locationID={ this.state.modalLocationID }
          onModalAddButtonClick={ this.onModalAddButtonClick }
          onModalCancelButtonClick={ this.onModalCancelButtonClick }
          isAdded={ this.state.locationIDList.includes(this.state.modalLocationID) }
        />
      </div>
      </div>
    )
  }
}

export default App;
