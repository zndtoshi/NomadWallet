#!/bin/bash

# assumes 2 env variables: KEYSTORE_FILE_HEX & KEYSTORE_PASSWORD

# PS. to turn file to hex and back:
#     $ xxd -plain test.txt > test.hex
#     $ xxd -plain -revert test.hex test2.txt

echo $KEYSTORE_FILE_HEX > nomadwallet-release-key.keystore.hex
xxd -plain -revert nomadwallet-release-key.keystore.hex > ./android/nomadwallet-release-key.keystore
rm nomadwallet-release-key.keystore.hex

cd android
# Use the BUILD_NUMBER environment variable set in the GitHub Actions workflow
sed -i'.original' "s/versionCode 1/versionCode $BUILD_NUMBER/g" app/build.gradle

# Extract versionName from build.gradle
VERSION_NAME=$(grep versionName app/build.gradle | awk '{print $2}' | tr -d '"')

./gradlew assembleRelease

# Rename the APK file to include the dynamic version and build number with parentheses
mv ./app/build/outputs/apk/release/app-release-unsigned.apk "./app/build/outputs/apk/release/NomadWallet-${VERSION_NAME}($BUILD_NUMBER).apk"

echo wheres waldo?
find $ANDROID_HOME | grep apksigner | grep -v jar

$ANDROID_HOME/build-tools/34.0.0/apksigner sign --ks ./nomadwallet-release-key.keystore --ks-pass=pass:$KEYSTORE_PASSWORD "./app/build/outputs/apk/release/NomadWallet-${VERSION_NAME}($BUILD_NUMBER).apk"
