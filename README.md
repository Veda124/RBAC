# RBAC

Postman collection:

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
