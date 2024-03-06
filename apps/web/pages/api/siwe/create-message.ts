import { type NextApiRequest, type NextApiResponse } from 'next';

import { SiweMessage } from 'siwe';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  const { nonce, address, domain, uri, host } = query as unknown as {
    nonce: string;
    address: string;
    domain: string;
    uri: string;
    host: string;
  };

  const siweMessage = new SiweMessage({
    version: '1',
    domain,
    uri,
    address,
    chainId: 1, // Default to ethereum chain
    nonce,
    statement: `I am ${
      address.slice(0, 4) + '...' + address.slice(-4)
    } and I want to sign in to JobStash at ${host}.
    I hereby accept the terms of service and the privacy terms laid out below:\n\n
    \n
    Privacy and GDPR Compliance Statement
    \n
    1. Data Collection and Use
    \n
    We collect GitHub information, CV links, skills, and email addresses solely for the purpose of enhancing our services and connecting talent with opportunities. Data is processed on the basis of consent and to fulfill our contractual obligations.
    \n
    2. Data Sharing and Transfer
    \n
    We do not share personal data with third parties except as required by law or to provide the requested services. Data may be stored on servers located within the EU or in countries ensuring adequate data protection standards.
    \n
    3. Data Retention
    \n
    Personal data is retained only as long as necessary for the purposes it was collected for or as required by law.
    \n
    4. Your Rights
    \n
    You have the right to access, correct, delete, or restrict processing of your data. You can withdraw consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal.
    \n
    5. Data Security
    \n
    We implement appropriate technical and organizational measures to protect personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
    \n
    6. Contact Information
    \n
    For any inquiries regarding your data or to exercise your rights, please contact our Data Protection Officer at privacy@jobstash.xyz.
    \n
    7. Changes to This Statement
    \n
    We reserve the right to update our Privacy and GDPR Compliance Statement as necessary to reflect any changes in our practices or legal requirements. Changes will be posted on our website.
    `,
  }).prepareMessage();

  return res.status(200).json({ siweMessage });
}
