import { prisma } from '@lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import SlackProvider from 'next-auth/providers/slack'

export default NextAuth({
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    signIn(params: any) {
      const teamId: any = params?.profile?.['https://slack.com/team_id']
      return teamId === process.env.SLACK_TEAM_ID!
    },
  },
})
