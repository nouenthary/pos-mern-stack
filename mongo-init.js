db = db.getSiblingDB("mydb"); // switch to your DB

db.createUser({
    user: "admin",
    pwd: "secret",
    roles: [{ role: "readWrite", db: "mydb" }]
});

db.createCollection("users");
db.users.insertOne({ name: "Init User", email: "init@example.com" });

print("✅ Database initialized.");