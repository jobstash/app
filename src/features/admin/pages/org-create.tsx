import { FormEventHandler } from 'react';

import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

import { AdminLayout } from '../layouts/admin-layout';

const breadCrumbs = [
  { title: 'Organizations', href: '/godmode/organizations' },
  {
    title: 'Create Organization',
    href: `/godmode/organizations/create`,
  },
];

interface OrgFormData {
  orgId: string;
  logoUrl: string;
  name: string;
  location: string;
  category: string;
  description: string;
  summary: string;
  url?: string;
}

const OrgCreatePage = () => {
  const form = useForm<OrgFormData>({
    initialValues: {
      orgId: '',
      logoUrl: '',
      name: '',
      location: '',
      category: '',
      description: '',
      summary: '',
      url: '',
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (orgFormData: OrgFormData) => {
      console.log('orgFormData =', orgFormData);
      const res = await fetch(`${NEXT_PUBLIC_MW_URL}/organizations/create`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...orgFormData }),
      });
      const resData = await res.json();
      console.log('resData =', resData);
    },
  });

  const onSubmit = form.onSubmit((values) => {
    //
    mutate({
      ...values,
      logoUrl: 'https://frontend.jobstash.xyz/orgs/Curve.png',
    });
  });

  return (
    <AdminLayout breadCrumbs={breadCrumbs} sideNav={null}>
      <Stack w="60%" spacing={30} pt={30}>
        <p>mut isLoading = {isLoading.toString()}</p>
        <Center>
          <Box w="100%">
            <form onSubmit={onSubmit}>
              <Stack spacing={30}>
                <Grid align="center">
                  <Grid.Col span={3}>
                    <Title order={4}>Organization ID</Title>
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <TextInput
                      size="lg"
                      radius="md"
                      placeholder="Your organization's org-id"
                      {...form.getInputProps('orgId')}
                    />
                  </Grid.Col>
                </Grid>

                <Grid align="center">
                  <Grid.Col span={3}>
                    <Title order={4}>Organization Name</Title>
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <TextInput
                      size="lg"
                      radius="md"
                      placeholder="Your organization's name"
                      {...form.getInputProps('name')}
                    />
                  </Grid.Col>
                </Grid>

                <Grid align="center">
                  <Grid.Col span={3}>
                    <Title order={4}>Organization Location</Title>
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <TextInput
                      size="lg"
                      radius="md"
                      placeholder="Your organization's location"
                      {...form.getInputProps('location')}
                    />
                  </Grid.Col>
                </Grid>

                <Grid align="center">
                  <Grid.Col span={3}>
                    <Title order={4}>Organization Category</Title>
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <TextInput
                      size="lg"
                      radius="md"
                      placeholder="Your organization's category"
                      {...form.getInputProps('category')}
                    />
                  </Grid.Col>
                </Grid>

                <Grid align="center">
                  <Grid.Col span={3}>
                    <Title order={4}>Organization Description</Title>
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <Textarea
                      description="Organization Description (max 500 characters)"
                      descriptionProps={{ pt: 10 }}
                      size="lg"
                      radius="md"
                      minRows={10}
                      inputWrapperOrder={[
                        'label',
                        'input',
                        'error',
                        'description',
                      ]}
                      placeholder="Your organization's description"
                      {...form.getInputProps('description')}
                    />
                  </Grid.Col>
                </Grid>

                <Grid align="center">
                  <Grid.Col span={3}>
                    <Title order={4}>Organization Summary</Title>
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <Textarea
                      description="Organization Summary"
                      descriptionProps={{ pt: 10 }}
                      size="lg"
                      radius="md"
                      minRows={10}
                      inputWrapperOrder={[
                        'label',
                        'input',
                        'error',
                        'description',
                      ]}
                      placeholder="Your organization's summary"
                      {...form.getInputProps('summary')}
                    />
                  </Grid.Col>
                </Grid>

                <Grid align="center">
                  <Grid.Col span={3}>
                    <Title order={4}>Website</Title>
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <TextInput
                      placeholder="Your organization's website"
                      size="lg"
                      radius="md"
                      {...form.getInputProps('url')}
                    />
                  </Grid.Col>
                </Grid>

                <Flex justify="end">
                  <Button variant="outline" type="submit">
                    Create
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Box>
        </Center>
      </Stack>
    </AdminLayout>
  );
};

OrgCreatePage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default OrgCreatePage;
