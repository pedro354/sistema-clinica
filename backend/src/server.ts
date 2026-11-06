import './config/env.js';
import app from './app.js';

console.log("SERVER NOVO");
const PORT = Number(process.env.PORT) || 10000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});