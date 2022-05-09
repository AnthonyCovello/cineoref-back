-- Deploy cinoref:5.updatev5 to pg

BEGIN;

ALTER TABLE public.user 
ADD CONSTRAINT username_unique UNIQUE ("username");

COMMIT;
