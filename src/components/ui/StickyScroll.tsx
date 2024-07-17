"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { Box, Image, Heading, Text, Flex } from '@chakra-ui/react';

const StickyScroll = ({ content } : { content: any[] }) => {
    const [activeCard, setActiveCard] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });
    
    

    return (
        <Box ref={ref} position="relative" overflow="hidden" py={10} px={{base: 5, lg: 100}}>
            <Flex direction={{ base: 'column', lg: 'row' }} alignItems={'center'}  justifyContent={'space-evenly'}>
                <Box flex="1" py={20}>
                    {content.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: activeCard === index ? 1 : 0.3, y: activeCard === index ? 0 : 50 }}
                            transition={{ duration: 0.6 }}
                            mb={10}
                            pt={10}
                            pb={10}
                            style={{ marginTop: activeCard === index ? 35 : 20 }}
                            textAlign={{ base: 'center', lg: 'left' }}
                        >
                            <Heading as="h2" fontSize="xl" color="teal.700">
                                {item.title}
                            </Heading>
                            <Text fontSize="md" color="gray.600" mt={4}>
                                {item.description}
                            </Text>
                        </motion.div>
                    ))}
                </Box>
                <Box
                    position={{ lg: 'sticky' }}
                    top={{ lg: activeCard * 100 }}
                    transform="translateY(-50%)"
                    flex="1"
                    alignItems="center"
                    width={'100%'}
                    minWidth={'400px'}
                    justifyContent="center"
                    display={{ base: 'none', lg: 'flex' }}
                >
                    <motion.div
                        key={activeCard}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ position: 'relative', zIndex: 1, justifyContent: 'center', alignItems: 'center' }}
                        whileInView={{ y: [-20, 20] }}  // Apply slight parallax effect
                        viewport={{ once: false, amount: 0.8 }}
                    >
                        <Image src={content[activeCard].image} alt={content[activeCard].title} boxSize="300px" objectFit="contain" />
                    </motion.div>
                </Box>
            </Flex>
        </Box>
    );
};

export default StickyScroll;
