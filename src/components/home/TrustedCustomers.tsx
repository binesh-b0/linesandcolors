"use client";
import { Box, Flex, Heading, Image } from '@chakra-ui/react';

const TrustedClients = () => {
  const clients = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
    { name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg" },
  ];

  return (
    <Box py={2} px={20}>
      <Flex justifyContent="space-around" flexWrap="wrap" alignItems="center">
        {clients.map((client, index) => (
          <Box key={index} mx={4} my={2}>
            <Image
              src={client.logo}
              alt={client.name}
              height="20px"
              css={{
                filter: 'invert(48%) sepia(80%) saturate(350%) hue-rotate(120deg) brightness(90%) contrast(85%)'
              }}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default TrustedClients;
