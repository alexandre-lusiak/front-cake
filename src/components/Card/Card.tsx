import React from "react";

import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';



const  CardCollection= (title:string, description:string ) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={'data'}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
      {description}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        voir category
      </Button>
    </Card>
  );
}

export default CardCollection; 