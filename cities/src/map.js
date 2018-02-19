import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';



class MyPlacemark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates:null
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cities > this.props.cities) {
       const city = nextProps.cities[nextProps.cities.length-1];
       this.ymaps.geocode(city)
       .then(result => this.setState({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() }));
    }

}

  render() {
    const mapState = { center: this.state.coordinates?this.state.coordinates:[53.9 , 27.56], zoom: 8 };
    return (
      <YMaps onApiAvaliable={(ymaps) => this.ymaps = ymaps}>
        <Map state={mapState} width={800} height={400}>

          { !this.state.coordinates ? null :
            <Placemark geometry={{ coordinates: this.state.coordinates}} />
          }

        </Map>
      </YMaps>
    );
  }
}
export default MyPlacemark;
