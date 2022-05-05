-- Deploy cinoref:1.init to pg

BEGIN;


CREATE TABLE IF NOT EXISTS public."user"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username text NOT NULL,
    email text NOT NULL,
    birthday date NOT NULL,
    password text NOT NULL,
    role_id int NOT NULL DEFAULT 1,
    grade_id int NOT NULL DEFAULT 1,
    profile_picture text DEFAULT 'https://cdn.discordapp.com/attachments/269211667626196992/971396538528051210/unknown.png',
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);



CREATE TABLE IF NOT EXISTS public."show"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL,
    category text NOT NULL,
    picture text DEFAULT 'https://cdn.discordapp.com/attachments/269211667626196992/971401469557354576/unknown.png',
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);



CREATE TABLE IF NOT EXISTS public."reference"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ref text NOT NULL,
    user_id int NOT NULL,
    show_id int NOT NULL,
    mature BOOLEAN NOT NULL,
    status BOOLEAN NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS public."tag"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS public."artist"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS public."character"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS public."bookmarks"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL,
    user_id int NOT NULL
);


CREATE TABLE IF NOT EXISTS public."note"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    note INT NOT NULL,
    user_id int NOT NULL,
    reference_id int NOT NULL
);

CREATE TABLE IF NOT EXISTS public."grade"
(
    id int NOT NULL PRIMARY KEY,
    name text NOT NULL
);


CREATE TABLE IF NOT EXISTS public."role"
(
    id int NOT NULL PRIMARY KEY,
    name text NOT NULL
);



-- laison TABLEs

CREATE TABLE IF NOT EXISTS public."character_list"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    show_id int NOT NULL,
    character_id int NOT NULL
);

CREATE TABLE IF NOT EXISTS public."artist_list"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    show_id int NOT NULL,
    artist_id int NOT NULL
);

CREATE TABLE IF NOT EXISTS public."tag_list"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tag_id int NOT NULL,
    reference_id int NOT NULL
);

CREATE TABLE IF NOT EXISTS public."bookmarks_list"
(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    bookmarks_id int NOT NULL,
    reference_id int NOT NULL
);

-- Foreign KEYs



ALTER TABLE IF EXISTS public.artist_list
    ADD CONSTRAINT fki_2 FOREIGN KEY (artist_id)
    REFERENCES public.artist (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS fki_fki_2
    ON public.artist_list(artist_id);

ALTER TABLE IF EXISTS public.artist_list
    ADD CONSTRAINT fki_3 FOREIGN KEY (show_id)
    REFERENCES public.show (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_3
    ON public.artist_list(show_id);

ALTER TABLE IF EXISTS public.bookmarks
    ADD CONSTRAINT fki_4 FOREIGN KEY (user_id)
    REFERENCES public.user (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_4
    ON public.bookmarks(user_id);

ALTER TABLE IF EXISTS public.bookmarks_list
    ADD CONSTRAINT fki_5 FOREIGN KEY (bookmarks_id)
    REFERENCES public.bookmarks (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_5
    ON public.bookmarks_list(bookmarks_id);


ALTER TABLE IF EXISTS public.bookmarks_list
    ADD CONSTRAINT fki_6 FOREIGN KEY (reference_id)
    REFERENCES public.reference (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_6
    ON public.bookmarks_list(reference_id);



ALTER TABLE IF EXISTS public.character_list
    ADD CONSTRAINT fki_8 FOREIGN KEY (character_id)
    REFERENCES public."character" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_8
    ON public.character_list(character_id);

ALTER TABLE IF EXISTS public.character_list
    ADD CONSTRAINT fki_9 FOREIGN KEY (show_id)
    REFERENCES public.show (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_9
    ON public.character_list(show_id);

ALTER TABLE IF EXISTS public.note
    ADD CONSTRAINT fki_10 FOREIGN KEY (user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_10
    ON public.note(user_id);


ALTER TABLE IF EXISTS public.note
    ADD CONSTRAINT fki_11 FOREIGN KEY (reference_id)
    REFERENCES public.reference (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_11
    ON public.note(reference_id);

 ALTER TABLE IF EXISTS public.reference
    ADD CONSTRAINT fki_12 FOREIGN KEY (user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_12
    ON public.reference(user_id);

ALTER TABLE IF EXISTS public.reference
    ADD CONSTRAINT fki_14 FOREIGN KEY (show_id)
    REFERENCES public.show (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_14
    ON public.reference(show_id);


ALTER TABLE IF EXISTS public.tag_list
    ADD CONSTRAINT fki_18 FOREIGN KEY (tag_id)
    REFERENCES public.tag (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_18
    ON public.tag_list(tag_id);

ALTER TABLE IF EXISTS public.tag_list
    ADD CONSTRAINT fki_19 FOREIGN KEY (reference_id)
    REFERENCES public.reference (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_19
    ON public.tag_list(reference_id);

ALTER TABLE IF EXISTS public."user"
    ADD CONSTRAINT fki_20 FOREIGN KEY (role_id)
    REFERENCES public.role (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_20
    ON public."user"(role_id);

ALTER TABLE IF EXISTS public."user"
    ADD CONSTRAINT fki_21 FOREIGN KEY (grade_id)
    REFERENCES public.grade (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS fki_fki_21
    ON public."user"(grade_id);

COMMIT;
