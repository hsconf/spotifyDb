import express from "express";
import User from "../models/User";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
    try {
        const user = new User({
            name: req.body.name,
            password: req.body.password,
        })
        user.generateToken();
        await user.save()
        res.status(201).send(user);

    } catch (e) {
        next(e);
        if (e instanceof Error) {
            res.status(400).send(e.message);
            return;
        }
    }
});

userRouter.post("/sessions", async (req, res, next) => {
    try {
        const user = await User.findOne({name: req.body.name})

        if (!user) {
            res.status(400).send({error: 'User does not exist'});
            return;
        }

        const isMath = await user.checkPassword(req.body.password);

        if (!isMath) {
            res.status(400).send({error: 'Password is incorrect'});
            return
        }
        user.generateToken();
        await user.save();
        res.status(200).send(user);

    } catch (e) {
        next(e);
        if (e instanceof Error) {
            res.status(400).send(e.message);
            return;
        }
    }
});

userRouter.post("/login", async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'Token is required'});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'Token is wrong'});
        return;
    }

    res.status(200).send({
        Login: "success authentication",
    });

});

export default userRouter;