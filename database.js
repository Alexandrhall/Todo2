const { MongoClient } = require("mongodb");

async function getDb() {
    const client = new MongoClient(
        "mongodb+srv://dbUser:123@cluster0.2lfc1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    await client.connect();

    const db = client.db("todo-list");

    return db;
}

async function getTodo() {
    const db = await getDb();

    const dbTasks = db.collection("tasks").find();

    const tasks = [];

    await dbTasks.forEach((b) => {
        tasks.push(b);
    });
    return tasks;
}

module.exports = {
    getDb,
    getTodo,
};
