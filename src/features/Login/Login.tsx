import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {selectIsLoggedIn} from './authSelectors';
import {authActions} from './index';
import {Grid} from "@mui/material";
import {AnimatedMonster} from "./AnimatedMonster";

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

export const Login = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const {login} = authActions;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password required';
            } else if (values.password.length < 3) {
                errors.password = 'Password must be 3 characters or more';
            }
            return errors;
        },
        onSubmit: async (values, formikHelpers) => {
            const action = await dispatch(login(values));
            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0];
                    if (error) {
                        formikHelpers.setFieldError(error.field, error.error);
                    }
                } else {
                    // Handle other errors if needed
                }
            }
        }
    });

    if (isLoggedIn) {
        return <Navigate to={'/todolist-ts'}/>;
    }

    return (
        <Grid container display='flex' justifyContent="center" alignItems="center" position='relative'>
            <Grid item xs={4}>
                <AnimatedMonster formData={formik.values}/>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl style={{
                        position: 'absolute',
                        width: '400px',
                        border: '5px solid purple',
                        borderRadius: '10px',
                        backgroundColor: ' #fff',
                        padding: '30px 60px',
                        top: '230px',
                        left: '50%',
                        transform: 'translate(-50%)',
                        zIndex: ' 1',

                    }}>
                        <FormLabel style={{color: 'inherit'}}>
                            <p>
                                To log in get registered{" "}
                                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p> Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
                            {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                            <TextField type="password" label="Password"
                                       margin="normal" {...formik.getFieldProps("password")} />
                            {formik.touched.password && formik.errors.password && (
                                <div style={{color: 'red'}}>{formik.errors.password}</div>
                            )}
                            <FormControlLabel
                                label={"Remember me"}
                                control={<Checkbox {...formik.getFieldProps("rememberMe")}
                                                   checked={formik.values.rememberMe}/>}
                            />
                            <Button
                                type={"submit"}
                                variant={"contained"}
                                disabled={!(formik.isValid && formik.dirty)}
                                color={"primary"}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
