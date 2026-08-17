export type NotificationPriority = 'Urgent' | 'Important' | 'Informational';
export type NotificationState = 'Scheduled' | 'Sent' | 'Suppressed' | 'Waiting for customer' | 'Resolved';
export type NotificationReason = 'TYRE_CRITICAL' | 'TYRE_ATTENTION' | 'ROTATION_DUE' | 'MILEAGE_REQUEST' | 'BOOKING_REMINDER';

export interface NotificationRuleInput {
  reason: NotificationReason;
  customerHasActed?: boolean;
  issueResolved?: boolean;
  lastSentAt?: string;
  sendCount?: number;
  scheduledFor?: string;
}

export interface NotificationDecision {
  state: NotificationState;
  priority: NotificationPriority;
  shouldSendNow: boolean;
  nextEligibleSend?: string;
  explanation: string;
}

const DAY = 24 * 60 * 60 * 1000;

const ruleConfig: Record<NotificationReason, { priority: NotificationPriority; cooldownDays: number; maxSends: number }> = {
  TYRE_CRITICAL: { priority: 'Urgent', cooldownDays: 2, maxSends: 2 },
  TYRE_ATTENTION: { priority: 'Important', cooldownDays: 7, maxSends: 2 },
  ROTATION_DUE: { priority: 'Important', cooldownDays: 7, maxSends: 2 },
  MILEAGE_REQUEST: { priority: 'Informational', cooldownDays: 7, maxSends: 2 },
  BOOKING_REMINDER: { priority: 'Important', cooldownDays: 1, maxSends: 2 },
};

export function decideNotification(input: NotificationRuleInput, now = new Date()): NotificationDecision {
  const config = ruleConfig[input.reason];

  if (input.issueResolved) {
    return { state: 'Resolved', priority: config.priority, shouldSendNow: false, explanation: 'The linked tyre, booking or mileage issue has already been resolved.' };
  }

  if (input.customerHasActed) {
    return { state: 'Waiting for customer', priority: config.priority, shouldSendNow: false, explanation: 'The customer has already responded or booked, so automatic reminders are paused.' };
  }

  const sendCount = input.sendCount ?? 0;
  if (sendCount >= config.maxSends) {
    return { state: 'Suppressed', priority: config.priority, shouldSendNow: false, explanation: `Maximum automatic reminders reached (${config.maxSends}). Staff follow-up is required only if needed.` };
  }

  if (input.scheduledFor) {
    const scheduled = new Date(input.scheduledFor);
    if (scheduled.getTime() > now.getTime()) {
      return { state: 'Scheduled', priority: config.priority, shouldSendNow: false, nextEligibleSend: scheduled.toISOString(), explanation: 'A future automatic send is already scheduled.' };
    }
  }

  if (input.lastSentAt) {
    const lastSent = new Date(input.lastSentAt);
    const nextEligible = new Date(lastSent.getTime() + config.cooldownDays * DAY);
    if (nextEligible.getTime() > now.getTime()) {
      return { state: 'Suppressed', priority: config.priority, shouldSendNow: false, nextEligibleSend: nextEligible.toISOString(), explanation: `Cooldown is active to prevent repeated messages about the same issue.` };
    }
  }

  return {
    state: sendCount > 0 ? 'Scheduled' : 'Sent',
    priority: config.priority,
    shouldSendNow: true,
    explanation: sendCount > 0 ? 'The reminder is eligible to send automatically now.' : 'This is the first eligible notification for this issue and can be sent automatically.',
  };
}
