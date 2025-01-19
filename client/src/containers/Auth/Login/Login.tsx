import {Box, Button, Grid2, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {FormEvent, useEffect, useState} from "react";
import {UserMutation} from "../../../types.ts";
import {login} from "../userThunk.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const {loginError, user} = useAppSelector(state => state.user);
    const [userForm, setUserForm] = useState<UserMutation>({
        name: "",
        password: "",
    });

    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(userForm))
    }

    useEffect(() => {
        if (user) navigate('/')
    }, [user])

    return (
        <Box
            className="h-[80vh] w-auto flex items-center justify-center bg-gradient-to-br from-blue-500 via-pink-500 to-orange-500"
            sx={{padding: 2}}
        >
            <Grid2 className="border-2 border-white p-5 rounded-lg shadow-lg bg-white">
                <form onSubmit={onSubmit}>
                    <Typography variant="h5" component="h1" textAlign="center" color="#000" fontWeight="bold"
                                sx={{marginBottom: 2}}>Log in</Typography>
                    <Grid2 container direction="column" gap={2}>
                        <TextField label="Name" variant="outlined" name="name" value={userForm.name} onChange={onChange} helperText={loginError?.message.error.startsWith('User') ? loginError.message.error : null} error={loginError?.message.error.startsWith('User')} />
                        <TextField label="Password" variant="outlined" name="password" value={userForm.password} onChange={onChange} helperText={loginError?.message.error.startsWith('Password') ? loginError.message.error : null} error={loginError?.message.error.startsWith('Password')} />
                        <Button variant="contained" type="submit">Login</Button>
                    </Grid2>
                </form>
                <div className="text-center mt-5">
                    <Link
                        to="/signup"
                        className="text-blue-600 text-sm hover:underline"
                        title="Go to the signup page"
                    >
                        Don't you have an account?
                        <br/>
                        Signup now!
                    </Link>
                </div>
            </Grid2>
        </Box>
    );
};

export default Login;