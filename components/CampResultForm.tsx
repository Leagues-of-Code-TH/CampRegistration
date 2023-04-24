import { Badge, Button, Grid, Input, Radio, Spacer, Text } from "@nextui-org/react"
import { createClient } from '@supabase/supabase-js'
import { ChangeEvent, FC, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Link from "next/link"

const supabaseUrl = 'https://mehqhfkttuuvwfmixqhn.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laHFoZmt0dHV1dndmbWl4cWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0Njk5MTUsImV4cCI6MTk5NzA0NTkxNX0.Jhcc2D7bhjczfXZUMk8KLm5sGqxwwdQyvKAzBFAU5NI" // process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const CampResultForm: FC = () => {
    const [isValid, setValid] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [format, setFormat] = useState<string>("")
    const [lang, setLang] = useState<string>("")
    const [participation, setParticipation] = useState<string>("")
    const [workshop, setWorkshop] = useState<string>("")
    const [final, setFinal] = useState<string>("")
    const [total, setTotal] = useState<string>("")
    const [certificateLink, setCertificateLink] = useState<string>("")
    const [excellenceLink, setExcellenceLink] = useState<string>("")

    const searchEmail = async () => {
        const { data, error } = await supabase
            .from('campScore')
            .select()
            .eq('Email', email);

        if (data !== null && data.length != 0) {
            const notify = () => toast.success("เข้าสู่ระบบสำเร็จ");
            let idx = 0;
            while (idx < data.length && data[idx].Name == null) {
                idx++;
            }
            setName(data[idx].Name);
            setLastname(data[idx].LastName);
            setFormat(data[idx].Format);
            setLang(data[idx].Language);
            setParticipation(data[idx].Sc_Participation);
            setWorkshop(data[idx].Sc_Workshop);
            setFinal(data[idx].Sc_FinalContest);
            setTotal(data[idx].Sc_Total);
            setCertificateLink(data[idx].Cert_Completion);
            setExcellenceLink(data[idx].Cert_Excellence);
            notify();
            setValid(true);
        } else {
            const notify = () => toast.error("ไม่พบข้อมูล");
            notify();
        }
    }
    return (isValid ? (
        <>
            <Grid.Container gap={2}>
                <Grid md={4} xs={12}>
                    <Text h4> ชื่อ: {name} {lastname} </Text>
                </Grid>
                <Grid md={4} xs={12}>
                    <Text h4> รูปแบบการเข้าร่วม: {format} </Text>
                </Grid>
                <Grid md={4} xs={12}>
                    <Text h4> ภาษาที่ใช้เขียนโปรแกรม: {lang} </Text>
                </Grid>
                <Grid.Container gap={2} direction="row">
                    <Grid sm={6}>
                        <Text h3> คะแนน Participation (10) </Text>
                    </Grid>
                    <Grid sm={6}>
                        <Text h3> {participation} </Text>
                    </Grid>
                </Grid.Container>
                <Grid.Container gap={2} direction="row">
                    <Grid sm={6}>
                        <Text h3> คะแนนงานในชั้นเรียน (40) </Text>
                    </Grid>
                    <Grid sm={6}>
                        <Text h3> {workshop} </Text>
                    </Grid>
                </Grid.Container>
                <Grid.Container gap={2} direction="row">
                    <Grid sm={6}>
                        <Text h3> คะแนนสอบ Final (50) </Text>
                    </Grid>
                    <Grid sm={6}>
                        <Text h3> {final} </Text>
                    </Grid>
                </Grid.Container>
                <Grid.Container gap={2} direction="row">
                    <Grid sm={6}>
                        <Text h2> คะแนนรวม: </Text>
                    </Grid>
                    <Grid sm={6}>
                        <Text h2> {total} </Text>
                    </Grid>
                </Grid.Container>
                <Grid.Container>
                    <Grid xs={12}>
                        {name == "ศุภชาต" || name == "ณฐกร" ? <Text h4 color="success"> ยินดีด้วยนะน้องเอิร์ธกับเจได !!!! </Text> : <></>}
                    </Grid>
                </Grid.Container>
                <Grid.Container gap={2} direction="row">

                    <Link href={`${certificateLink}`}>
                        <Button color="primary">
                            ดาวน์โหลดเกียรติบัตร
                        </Button>
                    </Link>
                    <Spacer x={1} y={1}/>


                    {excellenceLink && <Link href={`${excellenceLink}`}>
                        <Button color="gradient">
                            ดาวน์โหลดเกียรติบัตรระดับ Excellence
                        </Button>
                    </Link>}
                    <Spacer x={1} y={1}/>

                    <Link href="/">
                        <Button color='error' auto href="/"> กลับ </Button>
                    </Link>
                </Grid.Container>
            </Grid.Container>
        </>
    ) :
        (
            <>
                <Grid xs={12} direction="column">
                    <Input labelPlaceholder="Email" onChange={(e) => setEmail(e.target.value)} fullWidth/>
                    <Spacer y={1} />
                    <Button onClick={searchEmail} color='primary' css={{ w: 100}}> ค้นหา </Button>
                </Grid>
            </>
        )
    )
}

export default CampResultForm;