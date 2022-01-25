import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "45%",
  height: "70%",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 41.66911405372323,
          lng: -72.70033759571575,
        }}>
        <Marker
          onClick={this.onMarkerClick}
          name={"Half Foods"}
          position={{ lat: 41.66911405372323, lng: -72.70033759571575 }}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={"Half Foods"}
          position={{ lat: 41.6677041960467, lng: -72.69856789349402 }}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={"Half Foods"}
          position={{ lat: 41.668604198061516, lng: -72.70380579955554 }}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDrV8N-sRQKTmas_bhhkryzGP0uVovCo4A",
})(MapContainer);
