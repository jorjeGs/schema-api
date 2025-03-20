import { Application } from "express";

import appRoutes from "../routes/app.routes";
import authRoutes from "../routes/v1/auth.routes";
import userRoutes from "../routes/v1/user.routes";

export const createRoutes = (app: Application) => {
    app.use('/api/v1', appRoutes);
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/users', userRoutes);

    return app;
};