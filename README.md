<div align="center">
  <h3>🏋️‍♂️ Comprehensive Fitness Exercise Database API</h3>

  <p>
    <strong>1,500+ structured exercises</strong> • <strong>Fast & Modern</strong> • <strong>Developer-Friendly</strong>
  </p>

</div>

## 🏋🏼‍♀️ Fitness Exercise API

A **comprehensive and developer-friendly database** featuring over **1,500 structured, high-quality fitness exercises**. It delivers fast, modern, and scalable access to detailed exercise data—including targeted muscle groups, required equipment, visual aids (GIFs), and step-by-step instructions. Ideal for developers, fitness startups, and health platforms to create smart workout apps, personalized training plans, and interactive fitness tools.

**Perfect for:**

- 💪 Fitness app developers
- 🏃‍♀️ Health & wellness platforms
- 🎯 Personal training applications
- 📱 Workout planning tools
- 🔬 Fitness research projects

<br>

## 🏋️‍♂️ Exercise Sample

```json
{
  "exerciseId": "K6NnTv0",
  "name": "Bench Press",
  "gifUrl": "https://ik.imagekit.io/trackn/Gifs/K6NnTv0.gif",
  "equipments": ["Barbell"],
  "bodyParts": ["Chest"],
  "targetMuscles": ["Pectoralis Major Clavicular Head"],
  "secondaryMuscles": ["Deltoid Anterior", "Pectoralis Major Clavicular Head", "Triceps Brachii"],
  "instructions": [
    "Step:1 Grip the barbell with your hands slightly wider than shoulder-width apart, palms facing your feet, and lift it off the rack, holding it straight over your chest with your arms fully extended.",
    "Step:2 Slowly lower the barbell down to your chest while keeping your elbows at a 90-degree angle.",
    "Step:3 Once the barbell touches your chest, push it back up to the starting position while keeping your back flat on the bench.",
    "Step:4 Repeat this process for the desired number of repetitions, always maintaining control of the barbell and ensuring your form is correct."
  ]
}
```

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) runtime installed

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd fitness-api

# Install dependencies
bun install

# Start the development server
bun run dev
```

The API will be available at `http://localhost:80`

### API Documentation

Once the server is running, visit `http://localhost:80/docs` to explore the interactive API documentation.

---

## 📚 API Endpoints

### Get All Exercises
```
GET /api/v1/exercises
```

### Get Exercise by ID
```
GET /api/v1/exercises/{exerciseId}
```

### Get Exercises by Body Part
```
GET /api/v1/bodyparts/{bodyPartName}/exercises
```

### Get Exercises by Equipment
```
GET /api/v1/equipments/{equipmentName}/exercises
```

### Get Exercises by Muscle
```
GET /api/v1/muscles/{muscleName}/exercises
```

### Search Exercises
```
GET /api/v1/exercises/search?q={query}
```

### Filter Exercises
```
GET /api/v1/exercises/filter
```

---

## 🛠️ Tech Stack

- **Runtime:** Bun
- **Framework:** Hono
- **Validation:** Zod with OpenAPI
- **API Documentation:** Scalar

---

## 📄 License

This project is licensed under the AGPL-3.0 License - see the LICENSE file for details.
