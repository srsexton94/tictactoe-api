# Game Actions

All games action requests must include a valid HTTP header `Authorization:
Token token=<token>` or they will be rejected with a status of 401 Unauthorized.

All of the game actions, except for `watch`, follow the *RESTful* style.

Games are owned by users. Actions will only retrieve a game if the user associated with the `Authorization` header matches the owner's token, which is generated on sign in and deleted on sign out. If this requirement is unmet,
the response will be 401 Unauthorized.

*Summary:*

<table>
<tr>
  <th colspan="3">Request</th>
  <th colspan="2">Response</th>
</tr>
<tr>
  <th>Verb</th>
  <th>URI</th>
  <th>body</th>
  <th>Status</th>
  <th>body</th>
</tr>
<tr>
<td>GET</td>
<td>`/games/:over?`</td>
<td>n/a</td>
<td>200, OK</td>
<td><strong>games found</strong></td>
</tr>
<tr>
  <td colspan="3">
  The optional `over` query parameter restricts the response to games with a
   matching `over` property.
  </td>
  <td>200, OK</td>
  <td><em>empty games</em></td>
</tr>
<tr>
  <td colspan="3">
  The default is to retrieve all games associated with the user..
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>POST</td>
<td>`/games`</td>
<td>'{}'</td>
<td>201, Created</td>
<td><strong>game created</strong></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
<td>GET</td>
<td>`/games/:id`</td>
<td>n/a</td>
<td>200, OK</td>
<td><strong>game found</strong</td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>PATCH</td>
<td>`/games/:id`</td>
<td><strong>game delta</strong></td>
<td>200, OK</td>
<td><strong>game updated</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
</table>
<td>PATCH</td>
<td>`/games/:id`</td>
<td><strong>game delta</strong></td>
<td>200, OK</td>
<td><strong>{}</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>404 Not Found</td>
  <td><em>errors</em></td>
</tr>
</table>

## index

The `index` action is a *GET* that retrieves all the games associated with a
user. The response body will contain JSON containing an array of games, e.g.:

```json
{
  "games":[
    {
      "cells":["","","","","","","","",""],
      "over":false,
      "_id":"5e823ba98929cc4e95e2f5d9",
      "owner":"5e82311c8929cc4e95e2f5d8",
      "createdAt":"2020-03-30T17:30:10.371Z",
      "updatedAt":"2020-03-30T16:34:27.782Z",
      "__v":0
    },
    {
      "cells":["x","","","o","","","","",""],
      "over":false,
      "_id":"5ed7e519659863c00ff4907e",
      "owner":"5e82311c8929cc4e95e2f5d8",
      "createdAt":"2020-03-30T16:34:17.792Z",
      "updatedAt":"2020-03-30T18:37:30.232Z",
      "__v":0
    },
    {
      "cells":["","o","","","x","o","","x",""],
      "over":false,
      "_id":"5ed7e526cf104aa275b3ef17",
      "owner":"5e82311c8929cc4e95e2f5d8",
      "createdAt":"2020-03-30T15:24:21.743Z",
      "updatedAt":"2020-03-30T18:39:43.382Z",
      "__v":0
    }
  ]
}
```

If the `over` query parameter is specified the results will be restricted
 accordingly.

If there are no games associated with the user, the response body will contain
 an empty games array, e.g.:

```json
{
  "games": []
}
```

### Example of using the optional query parameter

End point to fetch all of a user's games

```md
/games
```

End point to fetch all of a user's games that are over

```md
/games?over=true
```

End point to fetch all of a user's games that are not over

```md
/games?over=false
```

## create

The `create` action expects a *POST* with an empty body (e.g `''` or `'{}'` if
JSON). If the request is successful, the response will have an HTTP Status of
201 Created, and the body will contain JSON of the created game with `owner`
set to the user calling `create`, e.g.:

```json
{
  "game":{
    "cells":["","","","","","","","",""],
    "over":false,
    "_id":"5e823ba98929cc4e95e2f5d9",
    "owner":"5e82311c8929cc4e95e2f5d8",
    "createdAt":"2020-03-30T18:34:17.772Z",
    "updatedAt":"2020-03-30T18:34:17.772Z",
    "__v":0
  }
}
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
Request, and the response body will be JSON describing the errors.

## show

The `show` action is a *GET* specifing the `id` of the game to retrieve. If the
request is successful the status will be 200, OK, and the response body will
contain JSON for the game requested, e.g.:

```json
{
  "game":{
    "cells":["x","","","","","","","",""],
    "over":false,
    "_id":"5e823ba98929cc4e95e2f5d9",
    "owner":"5e82311c8929cc4e95e2f5d8",
    "createdAt":"2020-03-30T18:34:17.772Z",
    "updatedAt":"2020-03-30T18:46:41.383Z",
    "__v":1
  }
}

```

## update

### update a game's states

This `update` action expects a *PATCH* with changes to to an existing game.

You may want to store the cell `index` in an HTML element that is not a form.
To do this, you could utilize data attributes and add the `value` and `over`
properties using JavaScript.

```html
<div data-cell-index='0'>
</div>
```

The `update` action expects data formatted as such:

```json
{
  "game": {
    "cell": {
      "index": 0,
      "value": "x"
    },
    "over": false
  }
}
```

If the request is successful, the response will have an HTTP Status of 200 OK,
and the body will be JSON containing the modified game, e.g.:

```json
{
  "game":{
    "cells":["x","","","","","","","",""],
    "over":false,
    "_id":"5e823ba98929cc4e95e2f5d9",
    "owner":"5e82311c8929cc4e95e2f5d8",
    "createdAt":"2020-03-30T18:34:17.772Z",
    "updatedAt":"2020-03-30T18:46:41.383Z",
    "__v":1
  }
}
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
Request, and the response body will be JSON describing the errors.

## destroy

The `destroy` action is a *DELETE* specifing the `id` of the game to delete. If
the request is successful the status will be 200, OK, and the response body will
contain JSON for the game requested, e.g.:

```json
{
  "game":{
    "cells":["x","","","","","","","",""],
    "over":false,
    "_id":"5e823ba98929cc4e95e2f5d9",
    "owner":"5e82311c8929cc4e95e2f5d8",
    "createdAt":"2020-03-30T18:34:17.772Z",
    "updatedAt":"2020-03-30T18:46:41.383Z",
    "__v":1
    }
  }

```
