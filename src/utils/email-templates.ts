export const emailTemplates = {
  emailVerification: ({ to, code }: { to: string; code: string }) => ({
    to,
    subject: "Verify your email",
    html: `<!DOCTYPE html>
<html>
  <body>
    <h1>Welcome, to Baity</h1>
    <p>Verify your email by entering the code below:</p>
    <h2>${code}</h2>
  </body>
</html>`,
  }),
  signIn: ({ to, code }: { to: string; code: string }) => ({
    to,
    subject: "Sign in to your account",
    html: `<!DOCTYPE html>
<html>
  <body>
    <h1>Welcome back, to Baity</h1>
    <p>Verify your email by entering the code below:</p>
    <h2>${code}</h2>
  </body>
</html>`,
  }),
  emailVerified: ({ to }: { to: string }) => ({
    to,
    subject: "Email verified successfully",
    html: `<!DOCTYPE html>
<html>
  <body>
    <h1>Email verified successfully</h1>
  </body>
</html>`,
  }),
  passwordForgot: ({ to, code }: { to: string; code: string }) => ({
    to,
    subject: "Password reset",
    html: `<!DOCTYPE html>
<html>
  <body>
    <p>Thank you for resetting your password.</p>
    <p>Please use the code below to verify your email:</p>
    <h2>${code}</h2>
  </body>
</html>`,
  }),
  passwordReset: ({
    to,
    url,
    token,
  }: {
    to: string;
    url: string;
    token: string;
  }) => ({
    to,
    subject: "Password reset successfully",
    html: `<!DOCTYPE html>
<html>
  <body>
    <p>Thank you for resetting your password.</p>
    <p>Please click the link below to verify your email:</p>
    <a href="${url}?token=${token}">${url}?token=${token}</a>
  </body>
</html>`,
  }),
} as const;
