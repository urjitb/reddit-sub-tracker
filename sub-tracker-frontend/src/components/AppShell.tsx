import { useEffect, useState } from 'react';


import {
    AppShell,
    Navbar,
    Header,
    Loader,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Button,
    Container,
    Divider,
    Space
} from '@mantine/core';
import Record from './Record';

export default function Shell() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tracking, setTracking] = useState(false);
    const [data, setData] = useState([]);
    const [subs, setSubs] = useState([
        { value: 'forrhire', label: 'React' },
        { value: 'ng', label: 'Angular' },
    ]);

    const CheckSubs = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/check-subs", {
                method: "POST",
                body: JSON.stringify({
                    subs: ['test', 'forhire'],
                    filter: "hiring"
                }),

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },



            })


            if (!response.ok) {
                console.log(`Error! status: ${response.status}`)
            }

            const result = await response.json();
            setData(result)



        }
        catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInterval(() => {
            CheckSubs()
        }, 60000);

    }, [tracking])

    

    const handleClick = async () => {
        setLoading(true);



    }
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <Text>Application navbar</Text>

                </Navbar>
            }

            header={
                <Header height={70} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"

                                mr="xl"
                            />
                        </MediaQuery>

                        <Text>Application header</Text>
                    </div>
                </Header>
            }
        >
            <Button color="yellow" compact onClick={() => setTracking(true)} size='md'>Get em</Button>
            <Space h="md" />
            {data[0] && data.map((item) => {
                return (<Container>
                    {loading && <Loader size="xs" />}
                    <Record
                        title={item['title']}
                        selftext={item['selftext']}
                        url={item['url']}
                        ups={item['ups']}
                        createdAt={item['createdAt']}
                        upvote_ratio={item['upvote_ratio']}
                        subreddit={item['subreddit']}></Record>
                    <Space h="md" />
                </Container>
                )
            })}
        </AppShell>
    );
}