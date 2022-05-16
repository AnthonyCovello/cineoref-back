-- Deploy cinoref:7.updatev7 to pg

BEGIN;

ALTER TABLE IF EXISTS public."user"
    ALTER COLUMN created_at TYPE timestamptz ,
    ALTER COLUMN updated_at TYPE timestamptz ;

ALTER TABLE IF EXISTS public."show"
    ALTER COLUMN created_at TYPE timestamptz,
    ALTER COLUMN updated_at TYPE timestamptz;

ALTER TABLE IF EXISTS public."reference"
    ALTER COLUMN created_at TYPE timestamptz,
    ALTER COLUMN updated_at TYPE timestamptz;
COMMIT;
