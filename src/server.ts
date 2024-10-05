import 'dotenv/config';
import app from './app';
import logger from './utils/logger';
import * as constants from './utils/constants';

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    logger.info(`Server started. port(${PORT}) env(${process.env.NODE_ENV || constants.NODE_ENV_PROD})`);
});
