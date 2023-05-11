import { useRouter } from 'next/router';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import {
  Button,
  Flex,
  Grid,
  LoadingOverlay,
  MultiSelect,
  Paper,
  Select,
  Stack,
} from '@mantine/core';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { useWalletAuthContext } from '~/features/auth/hooks';
import { Text } from '~/shared/components';

import TechnologiesSidenav from '../../components/technologies-sidenav';
import {
  BLOCKED_TERM_DTYPE,
  BLOCKED_TERMS_DTYPE,
  BLOCKED_TERMS_INIT_DTYPE,
  BLOCKED_TERMS_INIT_TECHS_DTYPE,
  SET_BLOCKED_TERMS_OK_DTYPE,
  UNSET_BLOCKED_TERMS_OK_DTYPE,
} from '../../core/constants';
import { useBlockedTechnologiesQuery } from '../../hooks/use-blocked-technologies';
import { useSetBlockedTermsMutation } from '../../hooks/use-set-blocked-terms-mutation';
import { useTechnologiesQuery } from '../../hooks/use-technologies-query';
import { useUnsetBlockedTermsMutation } from '../../hooks/use-unset-blocked-terms-mutation';
import { AdminLayout } from '../../layouts/admin-layout';
import { blockedTermsReducer } from '../../reducers';

const breadCrumbs = [
  { title: 'Blocked Terms', href: '/godmode/technologies/blocked-terms' },
];

const TechBlockedTermsPage = () => {
  const { asPath, push } = useRouter();
  const { address: creatorWallet } = useWalletAuthContext();

  const [state, dispatch] = useReducer(blockedTermsReducer, {
    initBlockedTerms: [],
    techOptions: [],
    blockedTerms: [],
    unblockedTerms: [],
    allBlockedTerms: [],
  });

  const {
    data: initTechOptions,
    error: errorTechnologiesQuery,
    isLoading: isLoadingTechs,
  } = useTechnologiesQuery();

  const iniTechsRef = useRef(false);
  useEffect(() => {
    if (initTechOptions && initTechOptions.length > 0 && !iniTechsRef.current) {
      iniTechsRef.current = true;
      dispatch({
        type: BLOCKED_TERMS_INIT_TECHS_DTYPE,
        payload: initTechOptions,
      });
    }
  }, [initTechOptions]);

  const {
    data: initBlockedTerms,
    isLoading: isLoadingBlockedTechs,
    error: errorBlockedTechnologiesQuery,
  } = useBlockedTechnologiesQuery();

  useEffect(() => {
    if (initBlockedTerms && initBlockedTerms.length > 0) {
      dispatch({
        type: BLOCKED_TERMS_INIT_DTYPE,
        payload: initBlockedTerms,
      });
    }
  }, [initBlockedTerms]);

  const selectRef = useRef<HTMLInputElement | null>(null);
  const onChangeBlockTerm = (payload: string | null) => {
    if (selectRef.current) {
      (selectRef.current as HTMLInputElement).blur();
    }

    if (payload) {
      dispatch({ type: BLOCKED_TERM_DTYPE, payload });
    }
  };

  const onChangeBlockTermList = (payload: string[]) => {
    dispatch({ type: BLOCKED_TERMS_DTYPE, payload });
  };

  const setBlockedTermsSuccessCb = (payload: string[]) => {
    dispatch({ type: SET_BLOCKED_TERMS_OK_DTYPE, payload });
  };

  const unsetBlockedTermsSuccessCb = (payload: string[]) => {
    dispatch({ type: UNSET_BLOCKED_TERMS_OK_DTYPE, payload });
  };

  const {
    mutate: setBlockedTermsMutate,
    error: setBlockedTermsError,
    isLoading: isLoadingSetBlockedTerms,
  } = useSetBlockedTermsMutation(setBlockedTermsSuccessCb);

  const {
    mutate: unsetBlockedTermsMutate,
    error: unsetBlockedTermsError,
    isLoading: isLoadingUnetBlockedTerms,
  } = useUnsetBlockedTermsMutation(unsetBlockedTermsSuccessCb);

  const isLoading =
    isLoadingTechs ||
    isLoadingBlockedTechs ||
    isLoadingSetBlockedTerms ||
    isLoadingUnetBlockedTerms;

  const onSubmit = () => {
    if (creatorWallet) {
      if (state.blockedTerms.length > 0) {
        setBlockedTermsMutate({
          creatorWallet,
          technologyNameList: state.blockedTerms,
        });
      }

      if (state.unblockedTerms.length > 0) {
        unsetBlockedTermsMutate({
          creatorWallet,
          technologyNameList: state.unblockedTerms,
        });
      }
    }
  };

  return (
    <AdminLayout
      breadCrumbs={breadCrumbs}
      sideNav={<TechnologiesSidenav asPath={asPath} push={push} />}
    >
      <Stack w="70%" pt={60} spacing={60}>
        {Boolean(errorBlockedTechnologiesQuery) && (
          <p className="text-red-500">
            Error retrieving blocked technologies ={' '}
            {`"${(errorBlockedTechnologiesQuery as Error).message}"`}
          </p>
        )}

        {Boolean(errorTechnologiesQuery) && (
          <p className="text-red-500">
            Error retrieving technologies ={' '}
            {`"${(errorTechnologiesQuery as Error).message}"`}
          </p>
        )}

        {Boolean(setBlockedTermsError) && (
          <p className="text-red-500">
            Error set-blocked-terms ={' '}
            {`"${(setBlockedTermsError as Error).message}"`}
          </p>
        )}

        {Boolean(unsetBlockedTermsError) && (
          <p className="text-red-500">
            Error unset-blocked-terms ={' '}
            {`"${(unsetBlockedTermsError as Error).message}"`}
          </p>
        )}

        <Paper withBorder radius="lg" px={45} pt={45} pb={30} pos="relative">
          <LoadingOverlay visible={isLoading} />
          <Stack spacing={30}>
            <Grid align="center">
              <Grid.Col span={2}>
                <Text size="lg" fw="bold">
                  Block Term
                </Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <Select
                  ref={selectRef}
                  searchable
                  clearable
                  data={state.techOptions}
                  placeholder="Search or select term to block"
                  maxDropdownHeight={320}
                  nothingFound="Nothing found"
                  size="lg"
                  value={null}
                  onChange={onChangeBlockTerm}
                />
              </Grid.Col>
            </Grid>

            <Grid align="center">
              <Grid.Col span={2}>
                <Text size="lg" fw="bold">
                  List of Blocked Terms
                </Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <MultiSelect
                  searchable
                  placeholder="Start blocking terms above"
                  maxDropdownHeight={320}
                  size="lg"
                  data={state.allBlockedTerms}
                  value={state.allBlockedTerms}
                  disabled={state.allBlockedTerms.length === 0}
                  onChange={onChangeBlockTermList}
                />
              </Grid.Col>
            </Grid>

            {state.unblockedTerms.length > 0 && (
              <>
                <hr className="border-t border-white/10" />

                <div className="flex w-full max-w-xs flex-col flex-wrap gap-y-4">
                  <Text size="lg" fw="semibold">
                    New term(s) to UNSET:
                  </Text>
                  <pre>
                    {JSON.stringify(state.unblockedTerms, undefined, '\t')}
                  </pre>
                </div>
              </>
            )}

            {state.blockedTerms.length > 0 && (
              <>
                <hr className="border-t border-white/10" />

                <div className="flex w-full max-w-xs flex-col flex-wrap gap-y-4">
                  <Text size="lg" fw="semibold">
                    New term(s) to BLOCK:
                  </Text>
                  <pre>
                    {JSON.stringify(state.blockedTerms, undefined, '\t')}
                  </pre>
                </div>
              </>
            )}

            <Flex w="full" justify="flex-end" align="center">
              <Button
                radius="md"
                size="md"
                variant="default"
                disabled={
                  state.blockedTerms.length === 0 &&
                  state.unblockedTerms.length === 0
                }
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Flex>
          </Stack>
        </Paper>
      </Stack>
    </AdminLayout>
  );
};

TechBlockedTermsPage.requiredRole = CHECK_WALLET_ROLES.ADMIN;

export default TechBlockedTermsPage;
