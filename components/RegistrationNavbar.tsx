import { Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";


const RegistrationNavbar: FC = () => {
    return (
        <Grid xs={12} direction="column">
          <Image src="/logo.png" alt="Leagues of Code Logo" width={256} height={40} draggable={false}/>
          <Text h3> ค่าย Leagues of Code Summer Camp 2</Text>
        </Grid>
    )
}

export default RegistrationNavbar