/* eslint-disable react/sort-comp */
import React from "react";
import Script from "react-load-script";

interface IOptions {
  types?: Array<string>;
  bounds?: any;
  strictBounds?: boolean;
  origin?: any;
  componentRestrictions?: any;
  placeIdOnly?: any;
}

interface IProps {
  placeholder?: string;
  label?: string;
  name: string;
  options?: IOptions;
  required?: boolean;
  className?: string;
  onPlaceSelect: (name: string, value: any) => void;
  onBlur: (name: string) => void;
  showErrorMessage?: boolean;
  value?: string;

  [key: string]: any;
}

interface IState {
  city?: string;
  query?: string;
  location?: string;
}

const key = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
const fieldID = "searchGooglePlacesAPI-12345";

class GooglePlacesAutoComplete extends React.Component<IProps, IState> {
  // Declare Options For Autocomplete
  options = {
    types: [],
  };
  autocomplete: any;
  state: IState = {};
  node: HTMLInputElement | null = null;
  updatingPlaces: boolean = false;

  handleScriptLoad = () => {
    // Initialize Google Autocomplete
    /*global google*/
    if (!google.maps.places) {
      throw Error("Maps Did not load correctly");
    }
    this.node = document.getElementById(fieldID) as HTMLInputElement;
    this.node.value = this.props.value || "";

    this.autocomplete = new google.maps.places.Autocomplete(
      this.node,
      this.props.options || this.options
    );
    // Avoid paying for data that you don't need by restricting the
    // set of place fields that are returned to just the address
    // components and formatted address
    this.autocomplete.setFields([
      "address_components",
      "formatted_address",
      "name",
    ]);
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    // Check if address is valid
    if (addressObject && addressObject.formatted_address) {
      // Set State
      this.updatingPlaces = true;
      this.props.onPlaceSelect(
        this.props.name,
        addressObject.formatted_address
      );
      this.props.onPlaceSelect("locality", addressObject.name);
      this.updatingPlaces = false;
    }
  };

  onChange = (e: any) => {
    if (!this.updatingPlaces) {
      this.props.onPlaceSelect(this.props.name, e.target.value);
      this.props.onPlaceSelect("locality", e.target.value);
    }
  };

  render() {
    return (
      <>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <label>
          {this.props.label}
          <span className="text-red">{this.props.required ? "*" : null}</span>
        </label>
        <input
          className={`${this.props.className || ""} form-control`}
          placeholder={this.props.placeholder || "Enter Location Address"}
          value={this.props.value}
          onChange={this.onChange}
          onBlur={() => this.props.onBlur("address")}
          id={fieldID}
          type="text"
        />
      </>
    );
  }
}

export default GooglePlacesAutoComplete;
