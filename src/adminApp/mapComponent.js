import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import _ from "lodash"

class MapComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      center: null
    }
  }

  setMapCenter(){

    let centerPoint = this.props.allCampaigns.filter((campaign, i)=>{
      return i == 0
    })

    let centerPointFiltered = {}
    centerPointFiltered.lat = parseFloat(centerPoint[0].lat)
    centerPointFiltered.lng = parseFloat(centerPoint[0].lng)

    this.setState({center: centerPointFiltered}, ()=>{
      console.log(this.state.center)
    })
  }

  render(){

    if(!this.state.center){
      this.setMapCenter()
    }

    let mappedMarkers = []
    if(!this.props.routes){
      mappedMarkers = this.props.allCampaigns.map((venue, i) => {
        let marker = {
          position: {
            lat: parseFloat(venue.lat),
            lng: parseFloat(venue.lng)
          }
        }
        return (
          <Marker 
            {...marker} 
          />
        )
      })
    }
    return(
      <div>
        {this.state.center &&
        <GoogleMap
          defaultZoom={this.props.zoom}
          defaultCenter={this.state.center}
          onMarkerClick={_.noop}
          options={{streetViewControl: false, mapTypeControl: false, zoomControl: false, fullscreenControl: false}}>       
          {this.props.allCampaigns && mappedMarkers}
        </GoogleMap>
      }
      </div>
    )
  }
}

export default withGoogleMap(MapComponent)