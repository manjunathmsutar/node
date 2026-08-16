import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Node app running successfully");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});