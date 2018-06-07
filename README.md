# API Management Gateway Test Harness

MongoDB

Install monogodb using Homebrew
- brew install mongodb

Create a directory for your data (e.g. /backend/data/db)
- mkdir -p /data/db

Start MongoDB, pointing it to your data folder
- mongod --dbpath /Users/user/Documents/api_management/backend/data/db

In a separate terminal, change to your , start the mongo terminal
- mongo

Create a new database:
- use phonebook