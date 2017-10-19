import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import _ from "lodash"

const google = window.google

class MapComponent extends Component {
  render(){


    var image = {
        url: '../../assets/map-marker.png'
    };



    let mappedMarkers = []

    mappedMarkers = this.props.allCampaigns.map((venue, i) => (
      <Marker 
        position={{
          lat: parseFloat(venue.lat),
          lng: parseFloat(venue.lng)
        }}
      />)
    )

    return(
      <GoogleMap
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.center}
        onMarkerClick={_.noop}
        options={{streetViewControl: false, mapTypeControl: false, zoomControl: false, fullscreenControl: false}}>
        {this.props.allCampaigns && mappedMarkers}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(MapComponent)