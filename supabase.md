# Deploying on Supabase

Notes for myself, as this process was non-trivial (especially implementing
schema isolation).

## Moving an existing table to another schema

In the SQL editor, execute the following code:
```
ALTER TABLE sfburrito_likes
    SET SCHEMA private;
```

## Changing permissions of the private schema

Not sure if this is needed.
[Source](https://gal.hagever.com/posts/multiple-schemas-in-supabase)

```
create schema if not exists private;

alter default privileges for user postgres
  in schema private grant all
  on sequences to postgres, anon, authenticated, service_role;

alter default privileges for user postgres
  in schema private grant all
  on tables to postgres, anon, authenticated, service_role;

alter default privileges for user postgres
  in schema private grant all
  on functions to postgres, anon, authenticated, service_role;

grant all privileges on schema private to postgres;
grant usage on schema private
  to postgres, anon, authenticated, service_role;
```

## Defining database functions

In the SQL editor, execute the following code blocks. It's necessary to use the
SQL editor because you can't define SECURITY DEFINER functions otherwise in
Supabase.

Define the get likes function:
```
CREATE OR REPLACE FUNCTION sfburrito_get_likes()
RETURNS INTEGER LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    likes_count INTEGER;
BEGIN
    SELECT numlikes INTO likes_count FROM private.sfburrito_likes WHERE id = 1;
    RETURN likes_count;
END;
$$;
```

Define the get taquerias function:
```
CREATE OR REPLACE FUNCTION sfburrito_get_taquerias()
RETURNS json[] LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN ARRAY(
    SELECT row_to_json(t) FROM (
      SELECT * FROM private.sfburrito_taquerias
    ) t
  );
END;
$$;
```

Define the upvote function (downvote is similar):
```
CREATE OR REPLACE FUNCTION sfburrito_upvote_taqueria(taqueria_id INT)
RETURNS void LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE private.sfburrito_taquerias
  SET upvotes = upvotes + 1
  WHERE id = taqueria_id;
END;
$$;
```

Define the like function:
```
CREATE OR REPLACE FUNCTION sfburrito_like()
RETURNS void LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE private.sfburrito_likes
  SET numlikes = numlikes + 1
  WHERE id = 1;
END;
$$;
```

## Other

* Column names in PostgreSQL should be lowercase or snake case since column
  names which are mixed case or uppercase have to be double quoted.
* RLS not used here.
