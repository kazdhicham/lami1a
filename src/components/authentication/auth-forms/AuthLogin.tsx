import React from 'react';
import Image from 'next/image';
import Link from 'Link';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router'
// project imports
import useConfig from '@/store/hooks/useConfig';
import useProfile from '@/store/hooks/useProfile';
import useScriptRef from '@/store/hooks/useScriptRef';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client'
import { ADD_PROFILE } from '@/graphql/profile/mutations'
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useCart from '@/store/hooks/useCart'
import { signInWithGoogleHandler, signInWithEmailAndPasswordHandler } from '@/utils/db/firebase-auth';
import { AddProfileOutput } from '@/api/profile/profile.types';


const Google = '/assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
  const theme = useTheme();
/*   const scriptedRef = useScriptRef(); */
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const { borderRadius } = useConfig();
  const [checked, setChecked] = React.useState(true);
  const router = useRouter()
  const { setProfile } = useProfile()
  const [AddProfile] = useMutation<AddProfileOutput>(ADD_PROFILE);
  const { state: { cartProducts } } = useCart()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required')
    }),

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const { email, password } = values
        const userCred = await signInWithEmailAndPasswordHandler(email, password)
        const { user } = userCred;
        toast.success(`Profile ${user?.email} is logged in `);
        const idtoken = await user?.getIdTokenResult()
        await setProfile({
          _id: user?.uid,
          email: user?.email,
          token: idtoken?.token,
        })
        AddProfile({
          variables: {
            input: { email: user?.email, id: user?.uid }
          }
        }).then(({ data }) => {

          toast.success(`${data?.addProfile?.email} has a profile  `);
          if (cartProducts.length >= 1 && cartProducts[0]?.quantity !== 0) {
            router.replace('/checkout')
          } else {
            router.replace('/dashboard/default')
          }
        }
        ).catch((error: undefined) => {
          toast.error(`Profile can not be registred in database ${error} `);
          router.replace('/')
          throw new Error(error)
        })
      } catch (error: unknown) {
        toast.error(`Error SignIn With email ${error}`);
      }
    }
  })
  const googleHandler = async () => {
    try {
      const { credential, result } = await signInWithGoogleHandler()
      const token = credential?.accessToken;
      const user = result.user;
      if (user && token) {
        toast.success(`Profile ${user?.email} is logged In`);
        window.localStorage.setItem('authtoken', token);
        await setProfile({
          _id: user?.uid,
          email: user?.email,
          token

        })
        AddProfile({
          variables: {
            input: { email: user?.email, id: user?.uid }
          }
        }).then(({ data }) => {
          console.log({ data })
          toast.success(`${data?.addProfile?.email} has a profile  `);
          if (cartProducts.length >= 1 && cartProducts[0]?.quantity !== 0) {
            router.replace('/checkout')
          } else {
            router.replace('/dashboard/default')
          }
        }
        ).catch((error: undefined) => {
          toast.error(error || 'Error at Google Authentication');
          router.replace('/')
          throw new Error(error)
        })
      } else {
        toast.info('Error at Google Authentication')
      }
    } catch (error: any) {
      toast.error(error)
      throw new Error(error)
    }

  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2 }, width: 20, height: 20, marginRight: matchDownSM ? 8 : 16 }}>
                <Image src={Google} alt="Lami1a Dashboard" layout="intrinsic" width={'16px'} height={'16px'} />
              </Box>
              Sign in with Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor:
                  theme.palette.mode === 'dark' ? `${theme.palette.dark.light + 20} !important` : `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>
      <form noValidate onSubmit={formik.handleSubmit} {...others}>
        <FormControl fullWidth error={Boolean(formik.touched.email && formik.errors.email)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email-login"
            type="email"
            value={formik.values.email}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="Email Address / Username"
            inputProps={{}}
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(formik.touched.password && formik.errors.password)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            inputProps={{}}
          />
          {formik.touched.password && formik.errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {formik.errors.password}
            </FormHelperText>
          )}
        </FormControl>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
            }
            label="Remember me"
          />
          <Typography
            variant="subtitle1"
            component={Link}
            href={loginProp ? `/pages/authentication/auth${loginProp}/forgot-password` : '/pages/authentication/auth3/forgot-password'}
            color="secondary"
            sx={{ textDecoration: 'none' }}
          >
            Forgot Password?
          </Typography>
        </Stack>
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button disableElevation disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
              Sign in
            </Button>
          </AnimateButton>
        </Box>
      </form>

    </>
  );
};

export default FirebaseLogin;
