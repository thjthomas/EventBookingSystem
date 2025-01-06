const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory events data (from your listing)
const events = [
  {
    "id": 1,
    "name": "Tech Conference",
    "description": "Join us for the biggest tech conference of the year. Explore the latest trends and innovations in the tech industry.",
    "img": "https://picsum.photos/350/350",
    "capacity": 10,
    "remainingSlots": 1,
    "fee": 80,
    "date": "2024-12-02"
  },
  {
    "id": 2,
    "name": "Music Festival",
    "description": "Experience three days of non-stop music featuring top artists from around the world. Get ready to dance and have a great time!",
    "img": "https://picsum.photos/350/350",
    "capacity": 10,
    "remainingSlots": 8,
    "fee": 20,
    "date": "2024-12-05"
  },
  {
    "id": 3,
    "name": "Art Exhibition",
    "description": "Discover the world of contemporary art through a stunning collection of paintings, sculptures, and installations.",
    "img": "https://picsum.photos/350/350",
    "capacity": 10,
    "remainingSlots": 2,
    "fee": 25,
    "date": "2024-12-11"
  },
  {
    "id": 4,
    "name": "Food Expo",
    "description": "Indulge your taste buds with a wide variety of delicious cuisines from renowned chefs and food vendors.",
    "img": "https://picsum.photos/350/350",
    "capacity": 10,
    "remainingSlots": 0,
    "fee": 88,
    "date": "2024-12-17"
  },
  {
    "id": 5,
    "name": "Sports Tournament",
    "description": "Cheer for your favorite teams as they compete in a thrilling sports tournament. Witness the excitement firsthand!",
    "img": "https://picsum.photos/350/350",
    "capacity": 10,
    "remainingSlots": 1,
    "fee": 25,
    "date": "2024-12-23"
  },
  {
    "id": 6,
    "name": "Fashion Show",
    "description": "Be captivated by the latest fashion trends showcased by top designers on the runway. Get inspired and stay stylish!",
    "img": "https://picsum.photos/350/350",
    "capacity": 10,
    "remainingSlots": 1,
    "fee": 50,
    "date": "2025-01-02"
  },
  {
    "id": 7,
    "name": "Startup Pitch Competition",
    "description": "Watch aspiring entrepreneurs pitch their innovative ideas to a panel of expert judges. Who will win the grand prize?",
    "img": "https://picsum.photos/350/350",
    "capacity": 5,
    "remainingSlots": 3,
    "fee": 0,
    "date": "2025-01-09"
  },
  {
    "id": 8,
    "name": "Film Festival",
    "description": "Immerse yourself in the world of cinema with a diverse selection of movies from various genres. Lights, camera, action!",
    "img": "https://picsum.photos/350/350",
    "capacity": 8,
    "remainingSlots": 2,
    "fee": 30,
    "date": "2025-01-16"
  },
  {
    "id": 9,
    "name": "Charity Gala",
    "description": "Support a worthy cause and make a difference at our annual charity gala. Enjoy an evening of elegance, entertainment, and giving back.",
    "img": "https://picsum.photos/350/350",
    "capacity": 6,
    "remainingSlots": 1,
    "fee": 50,
    "date": "2025-01-23"
  },
  {
    "id": 10,
    "name": "Technology Workshop",
    "description": "Enhance your technical skills and knowledge through hands-on workshops conducted by industry experts. Learn, build, and grow!",
    "img": "https://picsum.photos/350/350",
    "capacity": 10,
    "remainingSlots": 0,
    "fee": 150,
    "date": "2025-01-31"
  }
];

// Define your route
app.get("/api/events/listing", (req, res) => {
  res.json(events);
});

app.post("/api/events/:eventId/register", (req, res) => {
  const { eventId } = req.params;
  const { userFullName, email, contactNumber, nric, age, country, gender } = req.body;

  if (!userFullName || !email || !contactNumber || !nric || !age || !country || !gender) {
    return res.status(400).json({ message: "All fields are required." });
  }

  res.status(200).json({ message: `User ${userFullName} registered for event ${eventId} successfully.` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});