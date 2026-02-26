# Backend Project (MVC Architecture)

## 📌 Overview

This project follows the **MVC (Model–View–Controller)** architecture pattern.

The structure is designed to be:

- Scalable
- Clean
- Easy to maintain
- Easy for new developers to understand

---

# 📁 Project Structure
src/
├── controllers/
│ ├── admin/
│ │ └── auth.controller.js
│ └── user/
│  └── auth.controller.js
│
├── routes/
│ ├── admin/
│ │ └── auth.routes.js
│ └── user/
│   └── auth.routes.js
│
├── models/
│ ├── admin.model.js
│ └── user.model.js
│
├── middlewares/
│
├── app.js
└── server.js


---

# 🧾 Naming Conventions

## 🔹 General Rules

- All file names must be **lowercase**
- Use **dot notation** for file responsibility
- Do NOT use camelCase in file names
- Do NOT use snake_case in file names
- Use folders to separate roles (admin/user)

---

## 🔹 Controllers
Format:
feature.controller.js

Examples:
auth.controller.js
profile.controller.js
dashboard.controller.js

---

## 🔹 Routes
Format:
feature.routes.js

Examples:
auth.routes.js
profile.routes.js

---

## 🔹 Models
Format:
entity.model.js

Examples:
user.model.js
admin.model.js
subcategory.model.js

---

## 🔹 Multi-Word File Names

Use lowercase only.

✅ Correct:
subcategory.controller.js
orderhistory.model.js

❌ Avoid:
subCategory.controller.js
sub_category.controller.js

---

# 🎯 Role Separation Rule

❌ Do NOT use role in file name:
auth.admin.controller.js
auth.user.controller.js

✅ Use folder-based separation instead:

controllers/admin/auth.controller.js
controllers/user/auth.controller.js

Folder = role  
File name = responsibility  

---

# 🧠 Responsibilities

- **Controller** → Handles request and response
- **Route** → Defines endpoints and connects controller
- **Model** → Database schema
- **Middleware** → Auth, validation, error handling

---

# 📦 Example Endpoints


POST /admin/auth/login
POST /user/auth/login


---

# 🚀 Scalability Guidelines

When adding a new feature:

1. Create controller inside correct role folder
2. Create matching route file
3. Follow lowercase + dot naming pattern
4. Keep naming consistent across the project

---

# ✅ Summary

- Lowercase file names
- Dot notation for file responsibility
- Folder-based role separation
- Clean and scalable MVC structure


# ✅ Follow this pattern:

- Layer	        Naming
- Folder	    lowercase
- File      	lowercase dot notation
- Model name	PascalCase
- Collection	lowercase plural