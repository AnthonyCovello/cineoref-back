-- Deploy cinoref:3.updatev3 to pg

BEGIN;

ALTER TABLE IF EXISTS public.reference
    ADD COLUMN artist_id int NOT NULL;

ALTER TABLE IF EXISTS public.reference
    ADD COLUMN character_id int NOT NULL;

ALTER TABLE IF EXISTS public.reference
    ADD CONSTRAINT fki_22 FOREIGN KEY (artist_id)
    REFERENCES public.artist (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.reference
    ADD CONSTRAINT fki_23 FOREIGN KEY (character_id)
    REFERENCES public.character (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


COMMIT;
