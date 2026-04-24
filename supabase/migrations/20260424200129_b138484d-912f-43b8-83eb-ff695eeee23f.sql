
alter table public.waitlist_signups
  add constraint waitlist_email_format
  check (char_length(email) between 5 and 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
