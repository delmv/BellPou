# BellPou

.env:
- DB_USER=john
- DB_HOST=127.0.0.1
- DB_DATABASEE=exercices
- DB_PASSWORD=password
- DB_PORT=3001
- SECRET_TOKEN=57d3d58266b8ba21372a5f63e33542f9e79d8fcd8c5d9e7c681006611589cf6fe96e011e7bddbbc6c8b54d71d40b83c5360a75ea703abdab4cb112d32eb0f470


users:
- *manager:*
  manager@outlook.com -> password
- *user:*
  user@outlook.com -> motdepasse
