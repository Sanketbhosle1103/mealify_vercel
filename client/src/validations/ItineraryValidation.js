import * as yup from "yup";

const validatePlace = (value) => {
    const validPlaces = [
        // Indian cities
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Surat",
        // Foreign cities
        "London", "New York", "Paris", "Tokyo", "Sydney", "Dubai", "Singapore", "Toronto", "Berlin", "Rome"
    ];
    return validPlaces.includes(value);
};

export const ItineraryValidation = yup.object().shape({
  destination: yup.string().test("source-validity", "Invalid source place", validatePlace).required("Destination is required"),
  source: yup.string().test("source-validity", "Invalid Destination place", validatePlace).required("Source is required"),
  departure_date: yup
    .date()
    .min(new Date(), "Departure date must be ahead of current date")
    .required("Departure date is required")
    .nullable(),
  return_date: yup
    .date()
    .min(yup.ref("departure_date"), "Return date must be after departure date")
    .required("Return date is required")
    .nullable(),
  num_travelers: yup
    .number()
    .required("Number of travelers is required")
    .positive("Number of travelers must be a positive number"),
  accommodation: yup.string().required("Accommodation is required"),
  preferences: yup.string(),
});
