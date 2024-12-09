import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Create a detailed full day travel itinerary for {place} over {totalDays} days for {traveler} travelers with a {budget} budget, providing four hotel options (name, address, price in INR, image URL, geo-coordinates, and rating), daily plans with timings for visiting attractions including attractions name, attractions brief description, attractions address, attractions ticket price  in INR if any(best times based on weather and crowd levels) for {totalDays} days, suggested activities, meal recommendations with suggested restaurant(required),  and full day actionable plans to ensure a budget-compliant, comfortable, and enjoyable experience; Return the response in **valid JSON format only**, no additional text..\n\n### Output Format\nReturn the response in **valid JSON format** strictly adhering to the schema below:\n\n{\n  \"hotel\": [\n    {\n      \"name\": \"Hotel Name\",\n      \"address\": \"Hotel Address\",\n      \"priceInr\": \"Price in INR\",\n      \"imageurl\": \"Image URL\",\n      \"geocoordinates\": \"Latitude, Longitude\",\n      \"rating\": \"Rating\"\n    }\n  ],\n  \"dailyPlans\": [\n    {\n      \"day\": \"Day X\",\n      \"Budget\": \"Daily budget in INR\",\n      \"plan\": [\n        {\n          \"time\": \"Start Time - End Time\",\n          \"address\": \"Attraction Address\",\n          \"attraction\": \"Attraction Name\",\n          \"description\": \"Provide a detailed description elaborating on the history, architectural style, cultural significance, legends, and unique features of the attraction in around 15-20 words.\",\n          \"bestTime\": \"Best Time to Visit\",\n          \"ticketPrice\": \"Ticket Price in INR\"\n        },\n        {\n          \"time\": \"Start Time - End Time\",\n          \"cuisine\": \"Cuisine Type\",\n          \"meal\": \"Meal Description\",\n          \"restaurant\": \"Restaurant Details\"\n          \"address\": \"Restaurant Address\"\n        }\n      ]\n    }\n  ],\n}"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\"hotel\": [{\"name\": \"The Oberoi, New Delhi\", \"address\": \"Dr. Zakir Husain Marg, New Delhi, Delhi 110003, India\", \"priceInr\": \"25000\", \"imageurl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/The_Oberoi_New_Delhi.jpg/1280px-The_Oberoi_New_Delhi.jpg\", \"geocoordinates\": \"28.6126,77.2311\", \"rating\": \"4.8\"}, {\"name\": \"The Leela Palace New Delhi\", \"address\": \"SH 44, Diplomatic Enclave, Chanakyapuri, New Delhi, Delhi 110021, India\", \"priceInr\": \"22000\", \"imageurl\": \"https://dynamic-media.cdn.cnn.com/thumb/img/m_1200,c_fill,g_auto,h_1200,w_1200/path/2023/07/27/1690505429-the-leela-palace-new-delhi.jpg\", \"geocoordinates\": \"28.5817,77.1983\", \"rating\": \"4.6\"}, {\"name\": \"The Imperial, New Delhi\", \"address\": \"Janpath, Connaught Place, New Delhi, Delhi 110001, India\", \"priceInr\": \"18000\", \"imageurl\": \"https://www.theimperialindia.com/images/hotel/hotel-exterior-new.jpg\", \"geocoordinates\": \"28.6274,77.2167\", \"rating\": \"4.7\"}, {\"name\": \"Taj Palace, New Delhi\", \"address\": \"1, Sardar Patel Marg, Diplomatic Enclave, Chanakyapuri, New Delhi, Delhi 110021, India\", \"priceInr\": \"20000\", \"imageurl\": \"https://www.tajhotels.com/content/dam/hotels/images/taj-palace-new-delhi/exterior-view.jpg\", \"geocoordinates\": \"28.5840,77.1964\", \"rating\": \"4.5\"}], \"dailyPlans\": [{\"day\": \"Day 1\", \"Budget\": \"5000\", \"plan\": [{\"time\": \"9:00 AM - 12:00 PM\", \"address\": \"Rajpath, New Delhi\", \"attraction\": \"India Gate\", \"description\": \"A war memorial dedicated to Indian soldiers who died fighting for the British Indian Army.\", \"bestTime\": \"Morning\", \"ticketPrice\": \"Free\"}, {\"time\": \"12:30 PM - 2:00 PM\", \"cuisine\": \"Indian\", \"meal\": \"Lunch\", \"restaurant\": \"Bukhara\", \"address\": \"The Maurya, New Delhi\"}, {\"time\": \"2:30 PM - 5:30 PM\", \"address\": \"New Delhi\", \"attraction\": \"Humayun's Tomb\", \"description\": \"The tomb of the Mughal Emperor Humayun, a UNESCO World Heritage Site.\", \"bestTime\": \"Afternoon\", \"ticketPrice\": \"60\"}, {\"time\": \"6:00 PM - 7:30 PM\", \"cuisine\": \"Italian\", \"meal\": \"Dinner\", \"restaurant\": \"Indian Accent\", \"address\": \"The Lodhi, New Delhi\"}]}, {\"day\": \"Day 2\", \"Budget\": \"4000\", \"plan\": [{\"time\": \"9:00 AM - 11:00 AM\", \"address\": \"Old Delhi\", \"attraction\": \"Red Fort\", \"description\": \"A historic fort in Old Delhi, the main residence of the Mughal Emperors.\", \"bestTime\": \"Morning\", \"ticketPrice\": \"50\"}, {\"time\": \"11:30 AM - 1:00 PM\", \"address\": \"Chandni Chowk, Old Delhi\", \"attraction\": \"Jama Masjid\", \"description\": \"One of India's largest mosques.\", \"bestTime\": \"Late Morning\", \"ticketPrice\": \"Free\"}, {\"time\": \"1:30 PM - 2:30 PM\", \"cuisine\": \"Street Food\", \"meal\": \"Lunch\", \"restaurant\": \"Paranthe Wali Gali\", \"address\": \"Chandni Chowk, Old Delhi\"}, {\"time\": \"3:00 PM - 5:00 PM\", \"address\": \"New Delhi\", \"attraction\": \"National Museum\", \"description\": \"India's national museum, showcasing the country's rich cultural heritage.\", \"bestTime\": \"Afternoon\", \"ticketPrice\": \"20\"}, {\"time\": \"6:00 PM - 7:30 PM\", \"cuisine\": \"Mughlai\", \"meal\": \"Dinner\", \"restaurant\": \"Karim's\", \"address\": \"Jama Masjid, Old Delhi\"}]}]}\n```"},
        ],
      },
    ],
  });
