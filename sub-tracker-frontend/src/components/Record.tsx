import { Text, Paper, Collapse, Button, Space } from '@mantine/core';
import { useState } from 'react';
import { IconArrowBarUp, IconArrowUp, IconExternalLink } from '@tabler/icons';

interface subTracker {
    title: string;
    createdAt: string;
    subreddit: string;
    url: string;
    selftext: string;
    ups: number;
    upvote_ratio: number;

}

export default function Record(props: subTracker) {
    const [opened, setOpened] = useState(false);

    return (
        <Paper shadow="xs" p="md" >
            <Text >{props.title}
            </Text>
            <Space h="md" />
            <Button onClick={()=> window.open(props.url, "_blank")} size="xs" component="a" href="#" variant="outline" leftIcon={<IconExternalLink size={14} />}>
                Open in new tab
            </Button>
            <Space h="md" />

            <Button size="xs" variant="outline" onClick={() => setOpened((o) => !o)}>
                More Details
            </Button>

            <Collapse in={opened}>
                <Text size="xs" >
                    {props.selftext}
                </Text>
            </Collapse>
            
            <Text>
            <Space h="md" /><IconArrowUp strokeLinejoin="miter"/>
             {props.ups}
            </Text>
        </Paper>
    );
}