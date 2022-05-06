-- Deploy cinoref:2.uptadev2 to pg

BEGIN;

ALTER TABLE IF EXISTS public.artist
    ADD COLUMN category text DEFAULT 'artist';

ALTER TABLE IF EXISTS public.character
    ADD COLUMN category text DEFAULT 'character';

ALTER TABLE IF EXISTS "show"
RENAME COLUMN title TO name;

COMMIT;
