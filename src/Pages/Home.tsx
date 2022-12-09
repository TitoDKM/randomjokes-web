import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Heading, Text, useBreakpointValue, VStack } from '@chakra-ui/react';

import './home.css';

interface Joke {
    id: number,
    type: string,
    setup: string,
    punchline: string
}

const Home = () => {
    const [currentJoke, setCurrentJoke] = useState<Joke | undefined>(undefined);
    const [punchlineShowing, setPunchlineShowing] = useState<boolean>(false);

    const fetchRandomJoke = () => {
        axios.get('https://rjapi.daboy.me/api/joke').then(response => setCurrentJoke(response.data));
    }

    useEffect(() => {
        fetchRandomJoke();
    }, []);

    const buttonPress = () => {
        if(punchlineShowing) fetchRandomJoke();
        setPunchlineShowing(!punchlineShowing);
    }

    return <Container maxW='container.sm'>
        <VStack>
            <Heading fontWeight={600} fontSize={{base: '3xl', sm: '4xl', md: '6xl'}}>
                random<Text as='span' color='cyan.800'>Jokes</Text>
            </Heading>
        </VStack>
        <Heading fontWeight={600} fontSize={{base: '2xl', sm: '3xl', md: '3xl'}} marginTop='3rem'>
            {currentJoke?.setup}
        </Heading>
        {punchlineShowing && <Text fontSize='2xl' marginTop='1rem'>{currentJoke?.punchline}</Text>}
        <VStack marginTop='3rem'>
            <Button colorScheme={'cyan'} color='white' bg={'cyan.800'} rounded={'full'} px={12} _hover={{bg: 'cyan.900'}} onClick={buttonPress}>
                {!punchlineShowing ? 'Reveal punchline' : 'Next joke'}
            </Button>
        </VStack>
    </Container>
}

export default Home;