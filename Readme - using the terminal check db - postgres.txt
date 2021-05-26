checking database table from terminal:

in the terminal
1. [connect to the database of postgres]:
psql -U postgres
admin
2. [switching to the right db]:
\c smart_brain
3. [showing users table]
SELECT * FROM users;