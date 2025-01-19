import {Box, Button, Grid2, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {UserMutation} from "../../../types.ts";
import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {signup} from "../userThunk.ts";

const Signup = () => {
    const dispatch = useAppDispatch();
    const {signInError, user} = useAppSelector(state => state.user);
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
        dispatch(signup(userForm))
    }

    useEffect(() => {
        if(user) navigate('/')
    }, [user])

    return (
        <Box
            className="h-[80vh] w-auto flex items-center justify-center bg-gradient-to-br from-blue-500 via-pink-500 to-orange-500"
            sx={{padding: 2}}
        >
            <Grid2 className="border-2 border-white p-5 rounded-lg shadow-lg bg-white">
                <form onSubmit={onSubmit}>
                    <Typography variant="h5" component="h1" textAlign="center" color="#000" fontWeight="bold"
                                sx={{marginBottom: 2}}>Sign Up</Typography>
                    <Grid2 container direction="column" gap={2}>
                        <TextField label="Name" variant="outlined" error={Boolean(signInError)} helperText={signInError?.message.error} name="name" onChange={onChange} />
                        <TextField label="Password" variant="outlined" name="password" onChange={onChange} />
                        <Button variant="contained" type="submit">Sign Up</Button>
                    </Grid2>
                </form>
                <div className="text-center mt-5">
                    <Link
                        to="/login"
                        className="text-blue-600 text-sm hover:underline"
                        title="Go to the login page"
                    >
                        Do you already have an account?
                        <br/>
                        Log in
                    </Link>
                </div>
            </Grid2>
        </Box>

    );
};

export default Signup;