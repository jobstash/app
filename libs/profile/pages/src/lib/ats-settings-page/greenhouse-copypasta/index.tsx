/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';

import { Button } from '@nextui-org/react';

import { ATS_PROVIDERS, ATSClient } from '@jobstash/profile/core';
import { SCORER_URL } from '@jobstash/shared/core';
import { notifSuccess } from '@jobstash/shared/utils';

import { useRetryWebhooks } from '@jobstash/profile/state';

import { Heading, ProfileWarningIcon, Text } from '@jobstash/shared/ui';

const URL_PREFIX = `${SCORER_URL}/greenhouse/webhooks`;

interface CopyPastaTextProps {
  title: string;
  value: string;
}

const CopyPastaText = ({ title, value }: CopyPastaTextProps) => {
  const onClick = () => {
    if (navigator && value) {
      navigator.clipboard.writeText(value);
      notifSuccess({
        title: `Copied ${title}!`,
        message: `You can now paste it in greenhouse settings.`,
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Text fw="bold" className="text-white/90">
        {title}:
      </Text>
      <div className="flex items-center gap-4">
        <Text className="text-white/70">
          {`${value.slice(0, 16)}  . . . ${value.slice(-8)}`}
        </Text>
        <Button isIconOnly variant="ghost" size="sm" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-white/60"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

interface Tokens {
  applicationCreatedSignatureToken: string | null;
  candidateHiredSignatureToken: string | null;
}

interface Props {
  atsClient: ATSClient;
}

export const GreenhouseCopypasta = (props: Props) => {
  const { atsClient } = props;

  const [tokens, setTokens] = useState<Tokens>({
    applicationCreatedSignatureToken: null,
    candidateHiredSignatureToken: null,
  });

  const hasTokens =
    Boolean(tokens.applicationCreatedSignatureToken) &&
    Boolean(tokens.candidateHiredSignatureToken);

  const { mutate, isPending } = useRetryWebhooks(
    ATS_PROVIDERS.GREENHOUSE.platformName,
  );

  const onClick = () =>
    mutate(
      {
        clientId: atsClient.id!,
        apiToken: null,
      },
      {
        onSuccess(data) {
          if (data) {
            setTokens(data);
          }
        },
      },
    );

  return (
    <div className="flex flex-col gap-8">
      {!hasTokens && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <ProfileWarningIcon />
            <div className="flex flex-col gap-1">
              <Text fw="bold" size="lg">
                Need few more steps!
              </Text>
              <Text color="dimmed">
                You need to retrieve api tokens from greenhouse
              </Text>
            </div>
          </div>
          <Button isLoading={isPending} className="w-fit" onClick={onClick}>
            Retrieve Tokens
          </Button>
        </div>
      )}

      {hasTokens && (
        <div className="flex flex-col self-start gap-4">
          <div className="flex flex-col gap-2">
            <Heading size="md">Webhook Configuration</Heading>
            <Text color="dimmed">
              Please copy the following tokens and paste them in the respective
              fields in Greenhouse.
            </Text>
          </div>
          <div className="flex flex-col pl-2 gap-2">
            {tokens.applicationCreatedSignatureToken && (
              <>
                <CopyPastaText
                  title="Application Created Webhook URL"
                  value={`${URL_PREFIX}/created/${atsClient.id}`}
                />
                <CopyPastaText
                  title="Application Created Token"
                  value={tokens.applicationCreatedSignatureToken}
                />
              </>
            )}
            {tokens.candidateHiredSignatureToken && (
              <>
                <CopyPastaText
                  title="Candidate Hired Webhook URL"
                  value={`${URL_PREFIX}/hired/${atsClient.id}`}
                />

                <CopyPastaText
                  title="Candidate Hired Token"
                  value={tokens.candidateHiredSignatureToken}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
