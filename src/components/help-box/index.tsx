import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Organization Owner'];
  const roles = ['Developer', 'Cluster Administrator', 'Organization Owner', 'Dev Ops Engineer'];
  const applicationName = 'PaaS Hosting Kubernetes';
  const tenantName = 'Organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As an Organization Owner, I want to create an Organization so that I can manage my kubernetes clusters on Hetzner cloud.

2. As an Organization Owner, I want to invite Developers, Cluster Administrators, and Dev Ops Engineers to my Organization so that they can manage and work on the kubernetes clusters.

3. As an Organization Owner, I want to remove users from my Organization so that I can maintain control over who has access to my kubernetes clusters.

4. As a Developer, I want to view the list of kubernetes clusters in my Organization so that I can work on the appropriate cluster.

5. As a Cluster Administrator, I want to create a new kubernetes cluster in my Organization so that I can manage the resources and applications running on it.

6. As a Cluster Administrator, I want to delete a kubernetes cluster from my Organization so that I can remove unused or unnecessary clusters.

7. As a Cluster Administrator, I want to update the configuration of a kubernetes cluster in my Organization so that I can ensure it is running optimally.

8. As a Dev Ops Engineer, I want to view the list of kubernetes clusters in my Organization so that I can monitor and manage the infrastructure.

9. As a Dev Ops Engineer, I want to bootstrap a kubernetes cluster in my Organization so that I can quickly set up the cluster on Hetzner cloud.

10. As a Dev Ops Engineer, I want to update the bootstrap configuration of a kubernetes cluster in my Organization so that I can make changes to the infrastructure as needed.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
