import Head from 'next/head';

import { PageWrapper, Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

const PrivacyPage = () => (
  <>
    <Head>
      <title>JobStash | Privacy Policy</title>
    </Head>
    <PageWrapper>
      <SideBar />

      <div className="flex w-full items-center justify-center py-8">
        <div className="flex flex-col gap-8 max-w-3xl">
          <TermWrapper>
            <Text size="2xl" fw="bold">
              Privacy Policy
            </Text>

            <Text color="dimmed" size="lg">
              JobStash is committed to safeguarding the privacy of our website
              users. This policy sets out how we will treat your personal
              information.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              1. Information We Collect
            </Text>

            <ul className="list-disc pl-8">
              <li>
                <Text color="dimmed" size="lg">
                  <span className="font-bold">Personal Information: </span>
                  This may include your name, email address, and any other
                  details you provide when registering for an account,
                  connecting your wallet, or linking your GitHub account.
                </Text>
              </li>
              <li>
                <Text color="dimmed" size="lg">
                  <span className="font-bold">Usage Data: </span>
                  Information about how you use our website, such as your IP
                  address, geographical location, browser type, referral source,
                  length of visit, and page views.
                </Text>
              </li>
              <li>
                <Text color="dimmed" size="lg">
                  <span className="font-bold">Cookies: </span>
                  Our website uses cookies to enhance user experience. A cookie
                  is a small text file sent from a website and stored on the
                  user&#39;s computer by the user&#39;s web browser.
                </Text>
              </li>
            </ul>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              2. Use of Information
            </Text>
            <Text color="dimmed" size="lg">
              Your information is used to:
            </Text>
            <ul className="list-disc pl-8">
              <li>
                <Text color="dimmed" size="lg">
                  Enable your access to and use of the website services.
                </Text>
              </li>
              <li>
                <Text color="dimmed" size="lg">
                  Personalize the website for you.
                </Text>
              </li>
              <li>
                <Text color="dimmed" size="lg">
                  Send you service-related notifications.
                </Text>
              </li>
              <li>
                <Text color="dimmed" size="lg">
                  Publish information about you on the website with your
                  consent.
                </Text>
              </li>
              <li>
                <Text color="dimmed" size="lg">
                  Supply services that you purchase.
                </Text>
              </li>
              <li>
                <Text color="dimmed" size="lg">
                  Deal with inquiries and complaints.
                </Text>
              </li>
            </ul>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              3. Information Sharing
            </Text>
            <Text color="dimmed" size="lg">
              We may disclose your personal information to any of our employees,
              officers, agents, suppliers, or subcontractors as reasonably
              necessary for the purposes set out in this policy. We will not
              share your personal information with third parties unless:
            </Text>
            <ul className="list-disc pl-8">
              <li>
                <Text color="dimmed" size="lg">
                  We have your consent.
                </Text>
              </li>
              <li>
                <Text color="dimmed" size="lg">
                  Required by law.
                </Text>
              </li>
              <li>
                <Text color="dimmed" size="lg">
                  Necessary for the ongoing operation of our services.
                </Text>
              </li>
            </ul>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              4. Securing Your Data
            </Text>
            <Text color="dimmed" size="lg">
              JobStash will take reasonable technical and organizational
              precautions to prevent the loss, misuse, or alteration of your
              personal information. We store all the personal information you
              provide on secure servers.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              5. Amendments
            </Text>
            <Text color="dimmed" size="lg">
              JobStash may update this privacy policy by posting a new version
              on our website. You should check this page occasionally to ensure
              you are familiar with any changes.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              6. Your Rights
            </Text>
            <Text color="dimmed" size="lg">
              You may request access to your personal information to view,
              correct, or delete. You may also express any concerns regarding
              our use of your data.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              7. Third-Party Websites
            </Text>
            <Text color="dimmed" size="lg">
              Our website contains links to other websites. We are not
              responsible for the privacy policies or practices of third-party
              websites.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              8. Updating Information
            </Text>
            <Text color="dimmed" size="lg">
              Please let us know if the personal information that we hold about
              you needs to be corrected or updated.
            </Text>
          </TermWrapper>

          <TermWrapper>
            <Text size="xl" fw="bold">
              9. Contact Us
            </Text>
            <Text color="dimmed" size="lg">
              If you have any questions about this privacy policy or our
              treatment of your personal information, please write to us by
              email at david@jobstash.xyz.
            </Text>
          </TermWrapper>
        </div>
      </div>
    </PageWrapper>
  </>
);

export default PrivacyPage;

const TermWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">{children}</div>
);
