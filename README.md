

# 🍒 FarmOnline Grocery Shop

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Backend](https://img.shields.io/badge/backend-Spring%20Boot-blue)
![Frontend](https://img.shields.io/badge/frontend-React%20(Vite)-lightblue)
![Database](https://img.shields.io/badge/database-MySQL-orange)
![Security](https://img.shields.io/badge/security-JWT%20%7C%20Spring%20Security-green)

## 📟 Project Description

**Bast Online Grocery Shop** is a modern web application that allows users to browse and order fresh organic fruits, vegetables, eggs, and dairy products directly from local farms. It offers a user-friendly interface for customers and a powerful admin panel for managing products, users, and orders.

> Enjoy the freshest organic fruits, vegetables, eggs, and dairy products delivered straight to your doorstep! Our carefully selected produce, farm-fresh eggs, and high-quality dairy products are sourced without harmful chemicals, ensuring you and your family get the best in both taste and nutrition.

---

## 💻 Technologies Used

- **Backend**: Java, Spring Boot, Spring Security, JWT, Spring Data JPA, MySQL, MailSender, ModelMapper  
- **Frontend**: React (Vite), Axios, Bootstrap  
- **Authentication**: JWT tokens  
- **Database**: MySQL (local or hosted)  
- **Email**: Spring MailSender  
- **Deployment**: Docker (in progress)

---

## 🖼️ Screenshots


![1](https://github.com/user-attachments/assets/134f9180-de91-46ce-b33f-e1c69017d09e)
![2](https://github.com/user-attachments/assets/4d75e3cf-f2e9-4952-8391-428b6eb337cc)
![3](https://github.com/user-attachments/assets/fe999cfa-aa13-444c-977f-ddc35ba3f2c6)
![4](https://github.com/user-attachments/assets/e8303ab5-3868-4347-a3ae-618948cec44b)
![5](https://github.com/user-attachments/assets/391928e7-ad89-430e-8a17-78f2c9343705)
![6](https://github.com/user-attachments/assets/1fd2b00e-a515-4f00-a8b2-8a79d96bb852)
![7](https://github.com/user-attachments/assets/b0cd65d3-cc6c-4dd5-b36a-4fe6b30698d5)
![8](https://github.com/user-attachments/assets/0598240d-876d-44ac-985b-e62135f914e4)
![9](https://github.com/user-attachments/assets/a9618533-22e8-42b2-a6cf-d01d6af1bbff)
![10](https://github.com/user-attachments/assets/968a5221-4b00-4cc2-be7f-facfc54d0eb0)
![11](https://github.com/user-attachments/assets/64688465-6bb0-4450-90fc-a5189b414f29)
![12](https://github.com/user-attachments/assets/1a8549a8-39c8-4775-8b4c-3c38440bfaf4)
![13](https://github.com/user-attachments/assets/dc0cd046-f6ef-4d34-b9b9-93d6bf12242f)
![14](https://github.com/user-attachments/assets/d07b592c-cea3-47eb-9a9b-6b200701052b)


## 🚀 How to Run the App Locally

### ✅ Prerequisites

Make sure you have the following installed on your machine:

- Java 17 or higher  
- Node.js and npm  
- MySQL Server (local or remote)  
- Git  
- Maven or use `./mvnw` wrapper  
- Any IDE (e.g. IntelliJ, VS Code)

---

### 📦 Backend Setup (Spring Boot)

1. Clone the repository and navigate to the backend folder:

```bash
git clone https://github.com/your-username/bast-online-shop.git
cd bast-online-shop/backend
```

2. Create a MySQL database named `basta`:

```sql
CREATE DATABASE basta;
```

3. Open `src/main/resources/application.properties` and set up your configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/basta
spring.datasource.username=root
spring.datasource.password=yourpassword

jwt.secret=your_jwt_secret
jwt.expiration=3600000

spring.mail.username=youremail@example.com
spring.mail.password=yourpassword
```

4. Run the backend:

- Using terminal:

```bash
./mvnw spring-boot:run
```

- Or run `BastOnlineApplication` from your IDE.

5. The backend API will be available at:

```
http://localhost:8080
```

---

### 🌐 Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the frontend folder:

```
VITE_API_URL=http://localhost:8080
```

4. Start the development server:

```bash
npm run dev
```

5. The frontend (user panel and admin panel) will be available at:

```
http://localhost:3005
http://localhost:3001
```

---

## 🚣 Docker Setup (In Progress)

Docker support will be added soon using `docker-compose.yml` for easy local and production deployment.

---

## 📢 Contact

For any questions, feel free to contact us via GitHub or email.

---

