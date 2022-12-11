import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Heading, HStack, Text, Toast, useBreakpointValue, VStack } from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

import './home.css';

interface Joke {
    id: number,
    type: string,
    setup: string,
    punchline: string,
    likes: number,
    dislikes: number
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

    const sendVote = (joke_id: number, type: string) => axios.post('https://rjapi.daboy.me/api/joke/vote', {joke_id, type}).then(response => setCurrentJoke(response.data));

    const sendLike = () => {
        toast('You liked this joke!', {position: 'bottom-center'});
        sendVote(currentJoke?.id as number, 'like');
    }

    const sendDislike = () => {
        toast('You giva a dislike to this joke :(', {position: 'bottom-center'});
        sendVote(currentJoke?.id as number, 'dislike');
    }

    return <Container maxW='container.sm'>
        <Toaster />
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
            <Container display='flex' justifyContent='center'>
                {punchlineShowing && <Button colorScheme='cyan' color='white' bg='cyan.800' rounded='full' px='6' _hover={{bg: 'cyan.900'}} marginRight='15px' onClick={sendLike}>
                    {currentJoke?.likes}&nbsp;&nbsp;<FaThumbsUp />
                </Button>}
                <Button colorScheme={'cyan'} color='white' bg={'cyan.800'} rounded={'full'} px={12} _hover={{bg: 'cyan.900'}} onClick={buttonPress}>
                    {!punchlineShowing ? 'Reveal punchline' : 'Next joke'}
                </Button>
                {punchlineShowing && <Button colorScheme='cyan' color='white' bg='cyan.800' rounded='full' px='6' _hover={{bg: 'cyan.900'}} marginLeft='15px' onClick={sendDislike}>
                    {currentJoke?.dislikes}&nbsp;&nbsp;<FaThumbsDown />
                </Button>}
            </Container>
        </VStack>
    </Container>
}

export default Home;