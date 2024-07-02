"use client"
import PageContainer from '@/components/container/PageContainer';
import AuthLogin from '../../components/authForms/AuthLogin';
import Typography from '@mui/material/Typography';
import Logo from '@/layout/shared/logo/Logo';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { LoginResponseType, LoginType } from '@/utils/types/request';
import { loginRequest } from '@/utils/request/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.replace("/")
    }
  }, [])

  const router = useRouter()
  const handleSubmit = async (evt: any) => {
    evt.preventDefault()
    const cred: LoginType = {
      email: evt.target.elements[0].value,
      password: evt.target.elements[2].value
    }

    try {
      const response: LoginResponseType = await loginRequest(cred)
      if (response.token && response.userId) {
        localStorage.setItem("token", response.token)
        localStorage.setItem("userId", response.userId)
        await fetch("/api/token/", {
          method: "POST",
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ token: response.token, })
        })
        router.push('/');
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <PageContainer title="Login Page" description="this is Sample page">
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={'calc(100vh - 75px)'}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <Image
                src={"/images/backgrounds/login-bg.svg"}
                alt="bg" width={500} height={500}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  maxHeight: '500px',
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <AuthLogin
              title="Welcome to Vetner360"
              subtext={
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  Your Admin Dashboard
                </Typography>
              }
              handleSubmit={handleSubmit}
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  )
};

Login.layout = "Blank";

