export function normalizeLocation(data) {
  // two paths
  // one is gmaps data
  let parts = data;
  if (data.gmaps) {
    parts = getLocationParts(data);
  }
  return parts;
}

export function stringifyLocation(location) {
  if (!location) {
    return "";
  }
  if (location.gmaps) {
    location = normalizeLocation(location);
  }
  let city = "";
  let country = "";
  let province = "";
  if (location.push) {
    city = location[3];
    country = location[5];
    province = location[4];
  } else {
    city = location.city;
    country = location.country;
    province = location.province;
  }
  return (
    (city ? city + ", " : "") + (province ? province + ", " : "") + country
  );
}

function getLocationParts(data) {
  let country = "";
  let province = "";
  let city = "";
  let postal_code = "";
  let address_1 = "";
  let address_2 = "";
  let latitude = null;
  let longitude = null;
  let name = "";
  if (data.gmaps) {
    let components = data.gmaps.address_components;
    latitude = data.location.lat;
    longitude = data.location.lng;
    name = data.label;

    components.forEach(function(c) {
      c.types.forEach(function(t) {
        if (t === "country") {
          country = c.long_name;
        } else if (t === "locality") {
          city = c.long_name;
        } else if (t === "administrative_area_1") {
          province = c.long_name;
        }
      });
    });
    return {
      name,
      country,
      city,
      province,
      latitude,
      postal_code,
      longitude,
      address_1,
      address_2
    };
  }
}

// "name", "address 1", "address 2", "city", "province", "country", "postal code", "lat", "long";

export function makePPLocation(gmap_location) {
  let parts = getLocationParts(gmap_location);
  return parts;
}

export function encodeLocation(data) {
  // two paths
  // one is gmaps data
  if (!data) return null;
  data = normalizeLocation(data);

  let country = "";
  let province = "";
  let city = "";
  let latitude = null;
  let longitude = null;
  if (data.gmaps) {
    let components = data.gmaps.address_components;
    latitude = data.location.lat;
    longitude = data.location.lng;

    components.forEach(function(c) {
      c.types.forEach(function(t) {
        if (t === "country") {
          country = c.long_name;
        } else if (t === "locality") {
          city = c.long_name;
        } else if (t === "administrative_area_1") {
          province = c.long_name;
        }
      });
    });
    return { country, city, province, latitude, longitude };
  } else {
    return data;
  }
}
