import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
