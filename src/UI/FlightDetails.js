// FlightDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const FlightDetails = () => {
  // Access the flight ID from the URL parameter react-router-dom
  const flightId = useParams().flightId;

  // Fetch the flight details based on flightId from your API or state
  // Example: You can use flightId to fetch the specific flight details
  // const [flightDetails, setFlightDetails] = useState(null);
  // useEffect(() => {
  //   axios.get(`/flights/${flightId}`).then((res) => {
  //     setFlightDetails(res.data);
  //   });
  // }, [flightId]);

  return (
    <div>
      <h1>Flight Details</h1>
      <p>Flight ID: {flightId}</p>
    </div>
  );
};

export default FlightDetails;
