import './config/env';
import app from './app';

console.log("SERVER NOVO");
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
