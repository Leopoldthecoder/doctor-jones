set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  npm test

  # build
  VERSION=$VERSION npm run build

  # version
  npm --no-git-tag-version version $VERSION --message "[release] $VERSION"

  # changelog
  npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0

  git add .
  git commit -m "chore: update changelog for $VERSION"

  # publish
  git tag v$VERSION
  git push origin refs/tags/v$VERSION
  git push
  npm publish
fi
