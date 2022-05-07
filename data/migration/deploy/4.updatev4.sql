-- Deploy cinoref:4.updatev4 to pg

BEGIN;

ALTER TABLE IF EXISTS public.reference
    ALTER COLUMN mature SET DEFAULT false;

COMMIT;
