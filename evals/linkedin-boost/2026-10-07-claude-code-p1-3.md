---
agent: claude-code
agentVersion: 2.1.292
model: claude-opus-5-5
date: 2026-10-07
skillVersion: 0.1.2
promptIndex: 1
prompt: >
  Save the post below as content/blog/en/stop-confirming-bookings-by-phone.md,
  then write the runbook for boosting our Company Page post about it. 1,500 EUR
  for November, we post on Tuesday 2026-11-03 at 7:30. Ana publishes and builds
  the boost, Ben checks tracking, and our two founders repost in Polish. There
  is no main ads runbook yet.


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
durationMinutes: 3
turns: 13
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: none
result: pass
filesChanged: 5
linesAdded: 375
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/linkedin-boost/actions/runs/37653064164
---

Rubric 8/8, scored from the final summary. The handover now has the four labelled lines. **Open:** names each
task with no owner (weekly check, results, baseline, putting the site live, image, Launch, DMs) and each missing
value (founder names, `POST_URL`, account, audience location). **Drafts:** asks for each founder's yes.
**Assumptions:** labels the CPM, impressions and 0 to 3 sign-ups as planning numbers. **Ad account:** says nothing
was changed. The boost runs from 07:30 on 11-04 to 11-30, 27 days at about 56 EUR a day and 389 a week, built in
Campaign Manager. The weekly checks are 11-16, 11-23 and 11-30, and the founders stay roles.
