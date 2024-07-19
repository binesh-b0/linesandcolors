import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { Icon, useBreakpointValue } from "@chakra-ui/react";
import { useToast, Box, Input, Button, VStack, Text, Center } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const joinText = "Welcome to Lines and Colors. Stay updated with our latest news and exclusive offers. By subscribing to our mailing list, you'll be the first to know about our latest art collections, upcoming events, and special promotions. Join our community of art enthusiasts and never miss out on important updates. Get inspired by exclusive content, behind-the-scenes insights, and tips from top artists. Subscribe now and become a part of our vibrant and creative world."

const JoinMailingList = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const toast = useToast();
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value));
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidEmail) {
      toast({
        title: "Subscription successful.",
        description: "You've successfully subscribed to our mailing list.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEmail("");
      setIsValidEmail(false);
      // Implement API call here
    } else {
      toast({
        title: "Subscription failed.",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        transition: { duration: 1 },
      });
    } else {
      controls.start({ y: 50, opacity: 0, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" });
    }
  }, [isInView, controls]);

  return (
    <Center minH="100vh" bg="dark-teal" color="grey">
      <motion.div
        ref={ref}
        animate={controls}
        initial={{ y: 50, opacity: 0 }}
        style={{
          width: '100%',
          maxWidth: '1200px',
          minHeight: '600px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '1rem',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          alignContent: 'center',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
      <Box>
          <BackgroundBeams className="absolute inset-0 z-1" />
          <VStack spacing={4} position="relative" zIndex={1} style={{ width: '100%' }}>
            <Text fontSize="2xl" fontWeight="bold" >Join Our Mailing List</Text>
            <Text maxW={'850px'} mx={'auto'}>{joinText}</Text>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={4}
                width={'100%'}
                flexDirection={isSmallScreen ? "column" : "row"}
                gap={isSmallScreen ? 4 : 0}
              >
                <motion.div
                  style={{ display: 'flex', width: '100%', maxWidth: '600px' }}
                  animate={{ width: isValidEmail && !isSmallScreen ? 'calc(100% - 140px)' : '100%' }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={handleChange}
                    bg="whiteAlpha.900"
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    borderColor="gray.300"
                    flex="1"
                    pr="1rem"
                    _focus={{ borderColor: 'teal.500', boxShadow: 'none',
                    borderTopRightRadius: isValidEmail? 0 : '0.5rem',
                     borderBottomRightRadius: isValidEmail? 0 : '0.5rem' 
                   }}
                    _active={{ borderColor: 'transparent', boxShadow: 'none' }}
                  />
                  <AnimatePresence>
                    {isValidEmail && (
                      <motion.div
                        initial={{ opacity: 0, width: isSmallScreen ? '100%' : '0%' }}
                        animate={{ opacity: 1, width: isSmallScreen ? '100%' : '140px' }}
                        exit={{ opacity: 0, width: isSmallScreen ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button
                          type="submit"
                          colorScheme="teal"
                          ml={isSmallScreen ? 0 : -4}
                          borderTopLeftRadius={0}
                          borderBottomLeftRadius={0}
                          w="100%"
                        >
                          <Icon as={ArrowForwardIcon} w={6} h={6} />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Box>
            </form>
          </VStack>
        </Box>
      </motion.div>
    </Center>
  );
};

export default JoinMailingList;
