import type { NextApiRequest, NextApiResponse } from 'next';

import nodemailer from 'nodemailer';

import { sentryMessage } from '@jobstash/shared/utils';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb', // 5mb limit total
    },
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { subject, description, ctx, attachments } = req.body;

  const email = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

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
    html: `<pre>${JSON.stringify(
      { ctx, subject, description },
      undefined,
      '\t',
    )}</pre>`,
    attachments,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      sentryMessage(`REPORT ISSUE FAILED`, err.message, 'error');
      return res.status(500).send({ message: 'Something went wrong :(' });
    }

    if (info) {
      return res.status(200).send({ message: 'Reported issue successfully' });
    }
  });
};

export default handler;
