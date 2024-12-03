export const SelectTravelList = [
    {
      id: 1,
      title: 'Solo Explorer',
      desc: 'Adventure on your own terms.',
      icon: '🧍',
      people: '1',
    },
    {
      id: 2,
      title: 'Couple Retreat',
      desc: 'Romantic getaways for two.',
      icon: '💑',
      people: '2',
    },
    {
      id: 3,
      title: 'Family Vacation',
      desc: 'Fun trips for the whole family.',
      icon: '👨‍👩‍👧‍👦',
      people: '3-5',
    },
    {
      id: 4,
      title: 'Friends Getaway',
      desc: 'Trips to share with friends.',
      icon: '🧑‍🤝‍🧑',
      people: '5-10',
    },
    {
      id: 5,
      title: 'Corporate Retreat',
      desc: 'Boost team spirit and bonding.',
      icon: '🏢',
      people: '10+',
    },
  ];
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Smart savings, great adventures.',
      icon: '🪙', // Represents a coin, ideal for budget-conscious travel.
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Comfort meets affordability.',
      icon: '💳', // Represents a credit card, indicating balanced spending.
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Travel in style, no limits.',
      icon: '💰', // Represents a money bag, symbolizing luxury spending.
    },
  ];

// export const AI_PROMPT= "Create a detailed full day travel itinerary for {place} over {totalDays} days for {traveler} travelers with a {budget} budget, providing four hotel options (name, address, price in INR, image URL, geo-coordinates, and rating), daily plans with timings for visiting attractions including attractions name, attractions detailed description, attractions address, attractions ticket price  in INR if any(best times based on weather and crowd levels) for {totalDays} days, suggested activities, meal recommendations with suggested restaurant(required),  and full day actionable plans to ensure a budget-compliant, comfortable, and enjoyable experience;Return the response in **valid JSON format only**, no additional text."
export const AI_PROMPT= `
Create a detailed full day travel itinerary for {place} over {totalDays} days for {traveler} travelers with a {budget} budget, providing four hotel options (name, address, price in INR, image URL, geo-coordinates, and rating), daily plans with timings for visiting attractions including attractions name, attractions brief description, attractions address, attractions ticket price  in INR if any(best times based on weather and crowd levels) for {totalDays} days, suggested activities, meal recommendations with suggested restaurant(required),  and full day actionable plans to ensure a budget-compliant, comfortable, and enjoyable experience; Return the response in **valid JSON format only**, no additional text..

### Output Format
Return the response in **valid JSON format** strictly adhering to the schema below:

{
  "hotel": [
    {
      "name": "Hotel Name",
      "address": "Hotel Address",
      "priceInr": "Price in INR",
      "imageurl": "Image URL",
      "geocoordinates": "Latitude, Longitude",
      "rating": "Rating"
    }
  ],
  "dailyPlans": [
    {
      "day": "Day X",
      "Budget": "Daily budget in INR",
      "plan": [
        {
          "time": "Start Time - End Time",
          "address": "Attraction Address",
          "attraction": "Attraction Name",
          "description": "Provide a detailed description elaborating on the history, architectural style, cultural significance, legends, and unique features of the attraction in around 15-20 words.",
          "bestTime": "Best Time to Visit",
          "ticketPrice": "Ticket Price in INR"
        },
        {
          "time": "Start Time - End Time",
          "cuisine": "Cuisine Type",
          "meal": "Meal Description",
          "restaurant": "Restaurant Details"
          "address": "Restaurant Address"
        }
      ]
    }
  ],
}

`;



export const AI_IMAGE_ANALYSIS_PROMPT = `
Analyze the attached image and identify the location depicted. Provide the response in valid JSON format with the following fields:
{
  "placeName": "Name of the place",
  "location": {
    "city": "City where the place is located",
    "state": "State where the place is located",
    "capital": "State capital"
  },
  "coordinates": "Latitude, Longitude of the place",
  "significance": "A brief summary explaining the historical, cultural, or geographical importance of the place in 2-3 sentences.",
  "nearbyAttractions": [
    "Attraction 1",
    "Attraction 2",
    "Attraction 3"
  ]
}
`;
