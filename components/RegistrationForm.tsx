import { Badge, Button, Grid, Input, Radio, Spacer, Text } from "@nextui-org/react"
import { createClient } from '@supabase/supabase-js'
import { ChangeEvent, FC, useEffect, useState } from "react"
import { toast } from "react-toastify"

const supabaseUrl = 'https://mehqhfkttuuvwfmixqhn.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laHFoZmt0dHV1dndmbWl4cWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0Njk5MTUsImV4cCI6MTk5NzA0NTkxNX0.Jhcc2D7bhjczfXZUMk8KLm5sGqxwwdQyvKAzBFAU5NI" // process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const RegistrationForm: FC = () => {
    const [isValid, setValid] = useState<boolean>(false)
    const [emailData, setEmail] = useState<string>("")

    const [studentName, setName] = useState<string>("");
    const [studentLastname, setLastname] = useState<string>("");
    const [studentNickname, setNickname] = useState<string>("");
    const [studentLanguage, setLanguage] = useState<string>(""); // mutable
    const [studentSize, setSize] = useState<string>(""); // mutable
    const [studentPTel, setPTel] = useState<string>("");
    const [studentSTel, setSTel] = useState<string>("");
    const [studentEI, setEI] = useState<string>(""); // educational institution
    const [studentSEmail, setSEmail] = useState<string>(""); 

    const [studentKey, setKey] = useState<string>("");

    async function searchEmail() {
        const { data, error } = await supabase
            .from('students')
            .select()
            .eq('studentEmail', emailData);

        if(data.length != 0) {
            const notify = () => toast.success("เข้าสู่ระบบสำเร็จ");
            let idx = 0;
            console.log(data[idx].name==null);
            while(idx<data.length && data[idx].name==null) {
                idx++;
            }
            setName(data[idx].name);
            setLastname(data[idx].lastname);
            setNickname(data[idx].nickname);
            setLanguage(data[idx]['Lang.']);
            setSize(data[idx].shirtSize);
            setPTel(data[idx].parentTel);
            setSTel(data[idx].studentTel);
            setEI(data[idx].school);
            setSEmail(data[idx].studentEmail);
            setKey(data[idx].Key);
            notify();
            setValid(true);
        }else {
            const notify = () => toast.error("กรุณากรอก email อีกครั้ง");
            notify();
        }
    }

    async function queryData() { // for debug
        const { data, error } = await supabase
            .from('students')
            .select()
            .eq('studentEmail', emailData);

        console.log(data[0]);
    }

    async function updateData() {
        const { data, error } = await supabase
            .from('students')
            .update({
                name: studentName,
                lastname: studentLastname,
                nickname: studentNickname,
                parentTel: studentPTel,
                studentTel: studentSTel,
                school: studentEI,
                isRegistered: false
            })
            .eq('Key', studentKey);

        const notify = () => toast.success("บันทึกข้อมูลสำเร็จ");
        notify();
        setValid(false);
    }

    return (
        <>
            {
                isValid ? (
                    <>
                        <Grid xs={4}>
                            <Input placeholder="name" width="100%" value={studentName} onChange={(e) => setName(e.target.value)}/>
                        </Grid>
                        <Grid xs={4}>
                            <Input placeholder="lastname" width="100%" value={studentLastname} onChange={(e) => setLastname(e.target.value)}/>
                        </Grid>
                        <Grid xs={4}>
                            <Input placeholder="nickname" width="100%" value={studentNickname} onChange={(e) => setNickname(e.target.value)}/>
                        </Grid>
                        <Grid xs={6}>
                            <Text>
                                คอร์สที่เลือก <u>{studentLanguage}</u>
                            </Text>
                        </Grid>
                        <Grid xs={6}>
                            <Text u>
                                คอร์สที่เลือก <u>{studentSize}</u>
                            </Text>
                        </Grid>
                        <Grid xs={6}>
                            <Input placeholder="parent tel" width="100%" value={studentPTel} onChange={(e) => setPTel(e.target.value)}/>
                        </Grid>
                        <Grid xs={6}>
                            <Input placeholder="student tel" width="100%" value={studentSTel} onChange={(e) => setSTel(e.target.value)}/>
                        </Grid>
                        <Grid xs={6}>
                            <Input placeholder="educational institution" width="100%" value={studentEI} onChange={(e) => setEI(e.target.value)}/>
                        </Grid>
                        <Grid xs={6}>
                            <Input placeholder="email" width="100%" value={studentSEmail} onChange={(e) => setSEmail(e.target.value)} readOnly/>
                        </Grid>
                        <Grid xs={12} direction="column">
                            <Button onClick={updateData} color='primary'>Submit</Button>    
                        </Grid>
                    </>
                ) : (
                    <Grid xs={12} direction="column">
                        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                        <Spacer y={1}/>
                        <Button onClick={searchEmail} color='primary'>Search</Button>
                        {/* <Button onClick={queryData}>Debug</Button> */}
                    </Grid>
                )
            }
        </>
    )
}

export default RegistrationForm