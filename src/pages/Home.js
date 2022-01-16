import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const Home = () => {

    const initialValues = {
        username: "",
        password: "",
    }


    const onSubmit = (values) => {

        const requestBody = {
            query: `
            mutation{
                login(input:{email:"${values.username}",password:"${values.username}"}){
                    userId
                    token
                }
            }
            `
        }

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res) {
                    return res.json();
                }
            })
            .then(resData => {
                console.log(resData)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    // .email("Please Enter a valid Email").
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Please Enter an Email"),
        password: Yup.string().min(2, 'Password Must Have More Than 2 Characters').required('Please Enter Your Password')
    })


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
            </Box>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(props) => (
                    <Form>
                        <Field as={TextField}
                            margin="normal"
                            // required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="username"
                            autoComplete="email"
                            autoFocus
                            helperText={<ErrorMessage name='username' />}
                        />
                        <Field as={TextField}
                            margin="normal"
                            // required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={<ErrorMessage name='password' />}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>


                        <Grid container>
                            <Grid item>
                                <Button color="primary" component={Link} to={"/userSignup"}>Don't have an account? Sign up</Button>
                            </Grid>
                            <Grid>
                                <Button color="primary" component={Link} to={"/"}>Home Page</Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>

        </Container>

    );
}
export default Home;