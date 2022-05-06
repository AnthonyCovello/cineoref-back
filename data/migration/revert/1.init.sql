-- Revert cinoref:1.init from pg

BEGIN;



-- DROP TABLE IF EXISTS public.user, public.show, public.reference, public.artist, public.artist_list,public.bookmarks,public.bookmarks_list,public.character,public.character_list,public.grade,public.note,public.role,public.tag,public.tag_list CASCADE;

COMMIT;
