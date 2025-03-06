import app from './app';
import { PORT } from './config/env';
import csrf from "csurf";
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});