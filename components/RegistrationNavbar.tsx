import { Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";


const RegistrationNavbar: FC = () => {
    return (
        <Grid xs={12} direction="column">
          <Image src="/logo.png" alt="Leagues of Code Logo" width={320} height={50} draggable={false}/>
          <Text h1> ระบบลงทะเบียนค่าย Leagues of Code Summer Camp</Text>
        </Grid>
    )
}

export default RegistrationNavbar