-- Revert cinoref:2.uptadev2 from pg

BEGIN;

ALTER TABLE IF EXISTS "show"
RENAME COLUMN name TO title;

ALTER TABLE IF EXISTS public.artist
DROP artist;

ALTER TABLE IF EXISTS public.character
DROP 'character';

COMMIT;
