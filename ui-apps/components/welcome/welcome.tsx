import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="div" gradient={{ from: 'pink', to: 'yellow' }}>
          Kartvya
        </Text>
      </Title>
      <Text color="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This Next.js project includes mini applications that help with Kartvya Pipeline.
      </Text>
    </>
  );
}
