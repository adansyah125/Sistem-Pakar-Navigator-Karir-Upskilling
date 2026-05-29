# Sistem Pakar Karir - Implementation Plan

## Tech Stack
- **Frontend**: React + Vite (existing)
- **Backend**: Express.js (serverless via `api/`)
- **Database**: MySQL (localhost via phpMyAdmin for development, Aiven for production)
- **Hosting**: Vercel (frontend + backend)

## Database: 10 Tables

```
users              — id, nama_lengkap, jenjang, jurusan, session_id, created_at
career_roles       — id, category, title, description, icon
skills             — id, name, category, description
role_skills        — id, role_id, skill_id, weight (importance 0-100)
questions          — id, question_text, order_num
question_options   — id, question_id, option_text, skill_weights (JSON)
daily_questions    — id, question_id, date (for daily randomization)
user_answers       — id, user_id, question_id, selected_option_id, created_at
user_skills        — id, user_id, skill_id, is_selected
assessment_results — id, user_id, role_match (JSON), created_at
roadmaps           — id, role_id, phase, week_range, title, description
roadmap_resources  — id, roadmap_id, type, title, description, url
```

## Forward Chaining Engine

```
Layer 1: FACTS → user answers + selected skills
Layer 2: RULES → IF answer(q_n, option_x) THEN skill_weights[skill_id] += points
                  IF user_skill(s) = true THEN skill_weights[skill_id] += base_value
Layer 3: MATCH → compare skill_weights vs role_skills (weighted scoring)
Layer 4: OUTPUT → ranked roles, match %, skill gaps, roadmap
```

## API Endpoints

| Method | Endpoint | Function |
|---|---|---|
| `POST` | `/api/users` | Save user, return user_id |
| `GET` | `/api/roles` | List roles for profile selection |
| `GET` | `/api/questions?date=YYYY-MM-DD` | 10-15 random daily questions |
| `GET` | `/api/skills` | List all skills |
| `POST` | `/api/assessment/submit` | Submit answers + skills → run engine → return diagnosis |
| `GET` | `/api/diagnosis/:userId` | Get latest diagnosis result |
| `GET` | `/api/roadmap/:roleId` | Get roadmap for a role |

## Folder Structure

```
sistem-pakar-karir/
├── api/
│   └── index.js              # Express entry point (Vercel serverless)
├── server/
│   ├── config/
│   │   └── database.js       # MySQL connection pool
│   ├── expert-system/
│   │   ├── engine.js         # Forward chaining engine
│   │   └── rules.js          # Rule definitions
│   ├── routes/
│   │   ├── users.js
│   │   ├── roles.js
│   │   ├── questions.js
│   │   ├── assessment.js
│   │   └── roadmap.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── roleController.js
│   │   ├── questionController.js
│   │   ├── assessmentController.js
│   │   └── roadmapController.js
│   └── seed.sql              # Initial data
├── vercel.json
└── .env
```

## User Flow (Frontend → Backend)

```
Home (form) ──POST /api/users──→ ProfileSelection ──GET /api/roles──→
Assessment ──GET /api/questions + GET /api/skills──→
Submit ──POST /api/assessment/submit──→
Diagnosis ──GET /api/diagnosis/:userId──→ Roadmap ──GET /api/roadmap/:roleId──→
```

## Data Seed
- **12 questions** general IT & skill assessment
- **5 roles**: Software Engineer, Product Manager, Data Scientist, UI/UX Designer, Business Analyst
- **15 skills**: React, TypeScript, Node.js, Python, SQL, AWS, Excel, Public Speaking, Agile, Communication, Problem Solving, Analytical, Leadership, Design, Statistical
- **Roadmaps**: 3 phases per role with resources
