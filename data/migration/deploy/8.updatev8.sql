-- Deploy cinoref:8.updatev8 to pg

BEGIN;

ALTER TABLE IF EXISTS public."user"
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE IF EXISTS public."show"
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE IF EXISTS public."reference"
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone ;

COMMIT;
