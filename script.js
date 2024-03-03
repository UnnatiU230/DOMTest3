document.addEventListener("DOMContentLoaded", function() {

    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const userIP = data.ip;
        // Get user's location info
        fetch(`https://ipinfo.io/${userIP}/geo`)
          .then(response => response.json())
          .then(locationData => {
            displayLocationInfo(locationData);
            displayMap(locationData.loc.split(','));
            fetchPostalOffices(locationData.postal);
          })
          .catch(error => console.error('Error fetching location data:', error));
      })
      .catch(error => console.error('Error fetching IP address:', error));
  
 
    function displayLocationInfo(data) {
      const locationInfo = document.getElementById('location-info');
      locationInfo.innerHTML = `
        <p>Latitude: ${data.lat}</p>
        <p>Longitude: ${data.lng}</p>
        <p>City: ${data.city}</p>
        <p>Region: ${data.region}</p>
        <p>Time Zone: ${data.timezone}</p>
      `;
    }
  

    
  });
  