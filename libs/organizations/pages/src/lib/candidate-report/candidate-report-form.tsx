import { Button } from '@heroui/button';
import { Input } from '@heroui/input';

import { Heading, Text } from '@jobstash/shared/ui';

import { useCandidateReport } from './use-candidate-report';
import { useDownloadCandidateReport } from './use-download-candidate-report';

export const CandidateReportForm = () => {
  const { mutate: fetchCandidateReport, isPending: isFetchingReport } =
    useCandidateReport();
  const { mutate: downloadCandidateReport, isPending: isDownloadingReport } =
    useDownloadCandidateReport();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Access form data
    const formData = new FormData(event.currentTarget);
    const github = formData.get('github') as string;
    const wallet = formData.get('wallet') as string;

    fetchCandidateReport(
      { github, wallet },
      {
        onSuccess({ data }) {
          downloadCandidateReport(data);
        },
      },
    );
  };

  const isLoading = isFetchingReport || isDownloadingReport;

  return (
    <div className="w-full p-20 max-w-3xl mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <Heading>Generate Candidate Report</Heading>
        <div>
          <Text className="text-white/80">{TEXT}</Text>
        </div>
        <Input
          size="sm"
          isDisabled={isLoading}
          label="Github Username"
          name="github"
          placeholder="Enter github username"
        />
        <Input
          size="sm"
          isDisabled={isLoading}
          label="Wallet Address"
          name="wallet"
          placeholder="Enter wallet address"
        />
        <Button isLoading={isLoading} type="submit">
          Generate Report
        </Button>
      </form>
    </div>
  );
};

const TEXT =
  'Generate a clear and concise visual snapshot of a candidates professional career. Download a personalized report that highlights key achievements, work history, and top skills—all in one comprehensive image. Perfect for recruiters and organizations to quickly assess talent.';
