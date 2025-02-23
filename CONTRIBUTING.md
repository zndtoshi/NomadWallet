## Commits

All commits should have one of the following prefixes: REL, FIX, ADD, REF, TST, OPS, DOC. For example `"ADD: new feature"`.
Adding new feature is ADD, fixing a bug is FIX, something related to infrastructure is OPS etc. REL is for releases,  REF is for 
refactoring, DOC is for changing documentation (like this file).

Commits should be atomic: one commit - one feature, one commit - one bugfix etc.

## Releases

When you tag a new release, use the following example:
`git tag -m "REL v1.4.0: 157c9c2" v1.4.0 -s`
You may get the commit hash from git log. Don't forget to push tags `git push origin --tags`

Alternative way to tag: `git tag -a v6.0.0 2e1a00609d5a0dbc91bcda2421df0f61bdfc6b10 -m "v6.0.0" -s`

When tagging a new release, make sure to increment version in package.json and other files (we have a script for that: `./scripts/edit-version-number.sh`)  
In the commit where you up version you can have the commit message as
`"REL vX.X.X: Summary message"`.

## Guidelines

Do *not* add new dependencies. Bonus points if you manage to actually remove a dependency.

All new files must be in typescript. Bonus points if you convert some of the existing files to typescript.

New components must go in `components/`. Bonus points if you refactor some of old components in `NomadComponents.js` to separate files.
