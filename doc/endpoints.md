# SONGS

## songsRouter

### GET

- `/songs` retrieves all songs. Returns an array of objects.
- `/songs/:id` retrieves song of given `id`. Returns object with `id`, `title` and `artist`.

### POST

- `/songs` posts one song. Returns object with `id`, `title` and `artist`. Expects json object in `req.body` with song `title`, `alternateTitle` and `artist`. For example:

```json
{
  "title": "Nocturne in Eb",
  "alternateTitle": "Op. 9, No. 2",
  "artist": "Chopin"
}
```

### PATCH

- `/songs/:id` updates one song of given `id`. Returns object with `id`, `title` and `artist`. Expects `updatedSong` object in `req.body` to contain `title`, `alternateTitle` and `artist`. For example:

```json
{
  "title": "Nocturne in Eb Major",
  "alternateTitle": "Op. 9, No. 2",
  "artist": "Frédéric Chopin"
}
```

### DELETE

- `/songs/:id` deletes one song of given `id`. Returns object with deleted song's `title`.

## songsFilesRouter

- GET /songs/:id/files -> `getSongsFiles` read ALL FILES of ONE SONG
- POST /songs/:id/files -> `postSongsFiles` create ONE FILE of ONE SONG

## songsFileCollectionsRouter

- POST /songs/:id/file-collections -> `postSongsFileCollections` create ONE FILE-COLLECTION of ONE SONG

## songsFileCollectionRouter

- PATCH /songs/:id/file-collection -> `patchSongsFileCollection` update ONE FILE-COLLECTION of ONE SONG
- DELETE /songs/:id/file-collection -> `deleteSongsFileCollection` delete ONE FILE-COLLECTION of ONE SONG

# FILES

## filesRouter

- GET /files/:id -> `getFile` read ONE FILE
- PUT /files/:id -> `putFile` replace ONE FILE
- DELETE /files/:id -> `deleteFile` delete ONE FILE

# COMMUNITIES

## communitiesRouter

- GET /communities -> `getCommunities` read ALL COMMUNITIES
- GET /communities/:id -> `getCommunity` read ONE COMMUNITY
- POST /communities -> `postCommunity` create ONE COMMUNITY
- PATCH /communities/:id -> `patchCommunity` update ONE COMMUNITY
- DELETE /communities/:id -> `deleteCommunity` delete ONE COMMUNITY

## communitiesSongsRouter

- GET /communities/:id/songs -> `getCommunitySongs` read ALL SONGS of ONE COMMUNITY

## communitiesUsersRouter

- GET /communities/:id/users -> `getCommunityUsers` read ALL USERS of ONE COMMUNITY

# USERS

## usersRouter

- GET /users/:id -> `getUser`
- GET /users/login/local -> `getLocalLogin`
- GET /users/login/google -> `getGoogleLogin`
- GET /users/login/facebook -> `getFacebookLogin`
- PATCH /users/:id -> `patchUser`
- DELETE /users/:id -> `deleteUser`

## usersProfileRouter

- GET /users/:id/verify -> `getUserVerification`
- GET /users/:id/logout -> `getUserLogout`
- GET /users/:id/settings -> `getUserSettings`
- PATCH /users/:id/settings -> `patchUserSettings`
- GET /users/:id/songs -> `getUserSongs`
- GET /users/:id/communities -> `getUserCommunities`
