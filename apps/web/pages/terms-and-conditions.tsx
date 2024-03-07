import Head from 'next/head';

import { PageWrapper, Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

const TermsAndConditionsPage = () => (
  <>
    <Head>
      <title>JobStash | Terms and Conditions</title>
    </Head>
    <PageWrapper>
      <SideBar />

      <div className="flex w-full items-center justify-center py-8">
        <div className="flex flex-col gap-8 max-w-3xl">
          <TermWrapper>
            <Text size="2xl" fw="bold">
              Terms and Conditions
            </Text>

            <Text color="dimmed" size="lg">
              Welcome to JobStash! These Terms and Conditions outline the rules
              and regulations for the use of JobStash&#39;s Website, located at
              https://jobstash.xyz. By accessing this website, we assume you
              accept these terms and conditions in full. Do not continue to use
              JobStash if you do not agree to all of the terms and conditions
              stated on this page.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              1. Acceptance of Terms
            </Text>
            <Text color="dimmed" size="lg">
              By accessing and using the JobStash website, you acknowledge and
              agree to be bound by these Terms and Conditions (&#34;Terms&#34;).
              If you do not agree to these Terms, you are prohibited from using
              or accessing this site.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              2. Amendment of Terms
            </Text>
            <Text color="dimmed" size="lg">
              JobStash reserves the right, at its sole discretion, to modify or
              replace these Terms at any time. Such modifications shall become
              effective immediately upon the posting thereof. Your continued use
              of the Service following the posting of any changes to the Terms
              constitutes acceptance of those changes.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              3. Use License
            </Text>
            <Text color="dimmed" size="lg">
              Permission is granted to temporarily download one copy of the
              materials on JobStash&#39;s website for personal, non-commercial
              transitory viewing only.
            </Text>
            <div className="flex flex-col gap-2">
              <Text color="dimmed" size="lg">
                Under this license, you may not:
              </Text>
              <ul className="list-disc pl-8">
                <li>
                  <Text color="dimmed" size="lg">
                    Modify or copy the materials
                  </Text>
                </li>
                <li>
                  <Text color="dimmed" size="lg">
                    Use the materials for any commercial purposes
                  </Text>
                </li>
                <li>
                  <Text color="dimmed" size="lg">
                    Attempt to decompile or reverse engineer any software
                    contained on JobStash&#39;s website
                  </Text>
                </li>
                <li>
                  <Text color="dimmed" size="lg">
                    Transfer the materials to another person or &#34;mirror&#34;
                    the materials on any other server.
                  </Text>
                </li>
              </ul>
            </div>
            <Text color="dimmed" size="lg">
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by JobStash at any time.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              4. Disclaimer
            </Text>
            <Text color="dimmed" size="lg">
              The materials on JobStash&#39;s website are provided &#34;as
              is&#34;. JobStash makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties, including
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              5. Limitations
            </Text>
            <Text color="dimmed" size="lg">
              In no event shall JobStash or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on JobStash&#39;s website, even
              if JobStash or a JobStash authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              6. Accuracy of Material
            </Text>
            <Text color="dimmed" size="lg">
              The materials appearing on JobStash&#39;s website could include
              technical, typographical, or photographic errors. JobStash does
              not warrant that any of the materials on its website are accurate,
              complete, or current. JobStash may make changes to the materials
              contained on its website at any time without notice.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              7. Links
            </Text>
            <Text color="dimmed" size="lg">
              JobStash has not reviewed all of the sites linked to its website
              and is not responsible for the contents of any such linked site.
              The inclusion of any link does not imply endorsement by JobStash
              of the site. Use of any such linked website is at the user&#39;s
              own risk.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              8. Modifications to the Service
            </Text>
            <Text color="dimmed" size="lg">
              JobStash reserves the right at any time to modify or discontinue,
              temporarily or permanently, the Service (or any part thereof) with
              or without notice.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              9. Governing Law
            </Text>
            <Text color="dimmed" size="lg">
              These Terms are governed by and construed in accordance with the
              laws of Netherlands, and you irrevocably submit to the exclusive
              jurisdiction of the courts in that State or location.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              10. Contact Information
            </Text>
            <Text color="dimmed" size="lg">
              If you have any questions about these Terms, please contact us at
              david@jobstash.xyz.
            </Text>
          </TermWrapper>
        </div>
      </div>
    </PageWrapper>
  </>
);

export default TermsAndConditionsPage;

const TermWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">{children}</div>
);
