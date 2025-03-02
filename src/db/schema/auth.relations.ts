import { relations } from "drizzle-orm";
import { accounts, sessions, users } from "./auth.schema";

export const usersRelations = relations(users, ({ one, many }) => ({
  sessions: many(sessions),
  accounts: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
