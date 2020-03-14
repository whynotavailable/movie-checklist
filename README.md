# Movie Checklist

This is an extremely simple site to help keep track of movie lists and what you've seen.
All the data lives in `data.js` and can be changed easily. I put together a couple of lists so far.

Do note that movies are checked off globally by name, so as long as it's the same name across lists it'll be checked
off of all lists.

## Backup your list

In order to create a backup of your list you can run this command in your browser's dev tools.

```js
copy(JSON.stringify(localStorage.getItem('movies-watched')))
```

To import the backup you run it the other way.
```js
localStorage.setItem('movies-watched', "<your backup here>")
```

You must be on the site for these commands to work.
