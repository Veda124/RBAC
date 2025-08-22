# RBAC

Postman collection link : https://shinde-ved124-6798386.postman.co/workspace/Vedanti-Shinde's-Workspace~24410a2d-f425-49df-893c-47e54358e738/collection/47817414-11fd1ebb-e792-4d42-994f-f4f813d3f490?action=share&creator=47817414

1. POST /register (give name,email,password, role )

2. POST /login (give : email,password,role,returns JWT)
   in headers : Content-Type : application/json
   Authorization : Bearer [your login token]
3. GET /users (requires admin token)

4. GET /profile (requires logged-in user token)

FOR GIT :

1. Clone repository
2. npm install
3. npm run build
4. npm start
