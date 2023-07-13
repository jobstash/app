import type { NextApiRequest, NextApiResponse } from 'next';

import nodemailer from 'nodemailer';

import { sentryMessage } from '@jobstash/shared/utils';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const jobInfo = req.body;

  const email = process.env.JOB_SUBMISSION_GMAIL_USER;
  const pass = process.env.JOB_SUBMISSION_GMAIL_PASS;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: email,
      pass,
    },
    secure: true,
  });

  const mailData = {
    from: 'noreply@jobstash.xyz',
    to: email,
    subject: 'Job Submission',
    html: `<pre>${JSON.stringify(jobInfo, undefined, '\t')}</pre>`,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      sentryMessage(`JOB SUBMISSION FAILED`, err.message, 'error');
      return res.status(500).send({ message: 'Something went wrong :(' });
    }

    if (info) {
      return res.status(200).send({ message: 'Job submitted successfully' });
    }
  });
};

export default handler;
