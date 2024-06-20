import React, { useRef, useState, useEffect } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { loadGoogleMaps, translate } from "@/utils";
import MapCard from "../Cards/MapCard";

const LocationSearchBox = ({ onLocationSelected, initialLatitude, initialLongitude, clearfilterLocation, className }) => {
    const inputRef = useRef();
    const { isLoaded } = loadGoogleMaps();
    const [inputValue, setInputValue] = useState("");

    const [latitude, setLatitude] = useState(initialLatitude || null);
    const [longitude, setLongitude] = useState(initialLongitude || null);
    const [locationData, setLocationData] = useState({
        name: "",
        formatted_address: "",
        lat: null,
        lng: null,
        city: "",
        district: "",
        state: "",
        country: "",
    });
    // When the component is mounted, set the initial input value
    useEffect(() => {
        if (initialLatitude && initialLongitude) {
            fetchLocationFromCoordinates(initialLatitude, initialLongitude);
        }
    }, [initialLatitude, initialLongitude]);
    useEffect(() => {
        if (clearfilterLocation && clearfilterLocation === true) {
            setInputValue("")
        }
    }, [clearfilterLocation]);

    useEffect(() => {
        if (latitude && longitude) {
            fetchLocationFromCoordinates(latitude, longitude);
        }
    }, [latitude, longitude]);

    useEffect(() => {
        if (window.google && isLoaded) {
            // Initialize any Google Maps API-dependent logic here
        }
    }, [isLoaded]);
    
    const fetchLocationFromCoordinates = async (lat, lng) => {
        if (!lat || !lng) {
            return;
        }
    
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API; // Make sure the API key is correctly retrieved
    
        const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    
        try {
            const response = await fetch(requestUrl);
            if (!response.ok) {
                throw new Error(`Geocoding API request failed with status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.status === "OK" && data.results.length > 0) {
                const place = data.results[0];
                const locationData = {
                    name: place.name,
                    formatted_address: place.formatted_address,
                    lat,
                    lng,
                    city: "",
                    district: "",
                    state: "",
                    country: "",
                };
    
                // Extracting additional details from address_components
                place.address_components.forEach((component) => {
                    if (component.types.includes("locality")) {
                        locationData.city = component.long_name;
                    } else if (component.types.includes("sublocality")) {
                        locationData.district = component.long_name;
                    } else if (component.types.includes("administrative_area_level_1")) {
                        locationData.state = component.long_name;
                    } else if (component.types.includes("country")) {
                        locationData.country = component.long_name;
                    }
                });
    
                setLocationData(locationData);
                onLocationSelected(locationData);
                setInputValue(locationData.formatted_address);
            } else {
                console.error("No results found for the provided coordinates.");
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };
    


    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
        if (place) {
            const locationData = {
                name: place.name,
                formatted_address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                city: "",
                district: "",
                state: "",
                country: "",
            };

            const addressComponents = place.address_components;

            addressComponents.forEach((component) => {
                if (component.types.includes("locality")) {
                    locationData.city = component.long_name;
                } else if (component.types.includes("sublocality")) {
                    locationData.district = component.long_name;
                } else if (component.types.includes("administrative_area_level_1")) {
                    locationData.state = component.long_name;
                } else if (component.types.includes("country")) {
                    locationData.country = component.long_name;
                }
            });

            setLocationData(locationData);
            onLocationSelected(locationData);
            setInputValue(locationData.formatted_address)
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        isLoaded && (
            <div>
                <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChanged}>
                    <input
                        type="text"
                        // className="searchLocationInput"
                        placeholder={translate('enterAddress')}
                        className={className}
                        onKeyPress={handleKeyPress}
                        onChange={handleInputChange}  // Use onChange event to update inputValue
                        value={inputValue} // Set the input value
                    />
                </StandaloneSearchBox>
                <div className="rounded-xl relative overflow-hidden mt-6 w-full xl:w-2/3 pb-[500px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.097002511012!2d50.12430497559179!3d26.452601979711872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fba26b61850f%3A0xee4957527c233d67!2zUnlhZGFoIFJlYWwgRXN0YXRlIC0g2LTYsdmD2Kkg2LHZitin2K_YqSDYp9mE2KjZhtmK2KfZhiDZhNmE2KrYt9mI2YrYsSDZiNin2YTYp9iz2KrYq9mF2KfYsSDYp9mE2LnZgtin2LHZig!5e0!3m2!1sen!2sjo!4v1718796190733!5m2!1sen!2sjo"
                        loading="lazy"
                        className=" absolute w-full h-full"
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    ></iframe>
                </div>

            </div>
        )
    );
};

export default LocationSearchBox;
