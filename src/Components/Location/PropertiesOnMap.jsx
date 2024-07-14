import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

import { settingsData } from "@/store/reducer/settingsSlice";


import MapCard from "../Cards/MapCard";

const PropertiesOnMap = ({ latitude, longitude, data }) => {

    const systemsettings = useSelector(settingsData)
    const [location, setLocation] = useState({
        lat: latitude ? parseFloat(latitude) : parseFloat(systemsettings?.latitude),
        lng: longitude ? parseFloat(longitude) : parseFloat(systemsettings?.longitude),
    });

    const [mapError, setMapError] = useState(null);
    const [clickedMarker, setClickedMarker] = useState(null);

	useEffect(() => {
		setLocation({
			lat: latitude,
			lng: longitude,
		})

	}, [latitude, longitude])

    useEffect(() => {

    }, [clickedMarker]);

	console.log('location', location);

    return (
		<div id="map">
			{mapError ? (
				<div>{mapError}</div>
			) : (
				<GoogleMap zoom={11} center={location} id="properties_on_map_googlemap">
					{data.map((markerData, index) => (
						<Marker
							key={index}
							position={{ lat: parseFloat(markerData.latitude), lng: parseFloat(markerData.longitude) }}
							onClick={() => setClickedMarker(markerData)}
							icon={{
								url: "/map-icon.svg",

							}}

						/>
					))}
					{clickedMarker && (
						<InfoWindow

							position={{ lat: parseFloat(clickedMarker.latitude), lng: parseFloat(clickedMarker.longitude) }}
							onCloseClick={() => setClickedMarker(null)}
						>
							<MapCard ele={clickedMarker} horizontal={true} />
						</InfoWindow>
					)}
				</GoogleMap>
			)}
		</div>
    );

};

export default PropertiesOnMap;
