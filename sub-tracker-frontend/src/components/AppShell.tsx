import { useEffect, useRef, useState } from 'react';
import Record from './Record';
import { IconSun, IconMoonStars } from '@tabler/icons';
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
    Switch,
    useMantineColorScheme,
    Space,
    ActionIcon,
    Image
} from '@mantine/core';

export default function Shell() {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const subsRef = useRef(null);
    const filterRef = useRef(null);

    const dark = colorScheme === 'dark';

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
                    subs: subsRef.current.value.split(','),
                    filter: ""
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
        if (tracking == true) {
            setTimeout(CheckSubs, 60000);
        }
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

                    <Space h="md" />
                    <div>
                        <input
                            ref={subsRef}
                            type="text"
                            id="message"
                            name="message"
                            placeholder='subs (seperate by comma)'
                        />
                        <Space w="md" />
                        <input
                            ref={filterRef}
                            type="text"
                            id="message"
                            name="message"
                            placeholder='filter'
                        />

                    </div>
                    <Space h="md" /><div>
                        <Switch checked={tracking} onChange={(event) => setTracking(event.currentTarget.checked)} /> <p></p>
                    </div>
                    <Space h="md" />
                    <Button color="yellow" compact onClick={CheckSubs} size='md'>Get em</Button>
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

                        <ActionIcon
                            variant="outline"
                            color={dark ? 'yellow' : 'blue'}
                            onClick={() => toggleColorScheme()}
                            title="Toggle color scheme"
                        >
                            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                        </ActionIcon>
                    </div>
                </Header>
            }
        >
            <div className='container-header'>
                <Image src="/rst-logo.png" width={700}></Image>


                <Space h="md" />
                <div className='all-records'>
                    {data[0] && data.map((item) => {
                        return (<div className='record-container'>
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
                        </div>
                        )
                    })}
                </div>
            </div>
        </AppShell>
    );
}