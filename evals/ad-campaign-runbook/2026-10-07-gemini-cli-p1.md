---
agent: gemini-cli
agentVersion: 0.63.0
model: gemini-3.8-flash
date: 2026-10-07
skillVersion: 0.1.2
promptIndex: 1
prompt: >
  Save the post below as content/blog/en/stop-confirming-bookings-by-phone.md,
  then write the LinkedIn ads runbook for it. We have 2,000 EUR a month, we sell
  to clinic and studio owners in Germany and Poland, and I will post the organic
  companion myself.


  ---

  title: Stop confirming bookings by phone

  date: 2026-09-01

  author: Head of Product

  ---


  Most small clinics and studios still confirm every appointment by phone the
  day before. A receptionist works down a list, leaves voicemails, and marks the
  ones who answered. It feels like care. It is mostly lost time. [Try automatic
  confirmations free for 14 days](/signup).


  ## Where the first hour goes


  We looked at how front desks using our booking software spend the first hour
  of the day. The confirmation calls were the largest single block, larger than
  check-ins and larger than rescheduling. The calls also reached the fewest
  people: a client who books online rarely answers an unknown number at work.


  ## What we changed


  So we replaced the call with a message the client can answer in one tap. Two
  days before the visit they get a text and an email with three buttons: keep,
  move, or cancel. Keep does nothing. Move opens the calendar at the same
  service and the same staff member. Cancel frees the slot at once, and the
  waiting list gets the offer within a minute.


  Three things changed for the clinics that switched. The front desk got its
  first hour back. Cancellations arrived two days out instead of at the door,
  which is early enough to fill the slot. And the clients who never answered
  calls started answering, because a button is easier than a conversation.


  ## What it does not fix


  A client who has decided not to come will not tell you, whatever the channel.
  A deposit or a cancellation fee is the tool for that, and we do not think a
  reminder should pretend otherwise. If most of your no-shows come from new
  clients booking free first visits, start there.


  Setting it up takes about ten minutes. You choose when the message goes out,
  write the text in your own words, and decide whether a cancellation opens the
  slot to the waiting list or to everyone. Nothing changes for clients who
  prefer to call: the phone still works, it just stops being the only way.


  If your desk still starts the day with a call list, try it for two weeks and
  compare the first hours. [Start the free trial](/signup).
stack: No data store
durationMinutes: 7
turns: null
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: none
result: pass
filesChanged: 5
linesAdded: 836
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/ad-campaign-runbook/actions/runs/37675453557
---

Rubric 8/8, scored from the final summary. It plans two campaigns, with retargeting to `/signup` switched on at
300 members, and records the live check as not done because there is no production domain. URLs are paths, and
with no database the baseline is counted by hand. The qualified trial takes the default "Sales accepted it",
and the cost ceiling is left open for Sales. The handover follows quick-start step 10 section by section: the
tickets that block launch, the live check, both author slots quoted empty, 0 to 10 trials with zero called
normal variance, and the open inputs. The runbook index and the link from `README.md` are allowed extras.
Doubt: the ad names, the retargeting UTM values and the daily split are not quoted in the summary.
