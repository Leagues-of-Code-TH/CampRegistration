import { Inter } from 'next/font/google'
import { Container, Grid, Text } from '@nextui-org/react'
import RegistrationNavbar from '@/components/RegistrationNavbar'
import RegistrationForm from '@/components/RegistrationForm'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet' />
      </Head>
      <Container style={{ fontFamily: 'Kanit' }}>
        <Grid.Container style={{ padding: "10rem", paddingTop: "15rem", background: "white" }} gap={2}>
          <RegistrationNavbar />
          <RegistrationForm />
          <ToastContainer />
        </Grid.Container>
      </Container>
    </>
  )
}
