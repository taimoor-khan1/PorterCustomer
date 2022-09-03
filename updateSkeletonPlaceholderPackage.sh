# node_modules/react-native-skeleton-placeholder/lib/SkeletonPlaceholder.js


#!/bin/bash

# Assign the filename
filename="node_modules/react-native-skeleton-placeholder/lib/SkeletonPlaceholder.js"

search="@react-native-masked-view/masked-view"
replace="@react-native-community/masked-view"

# node_modules/react-native-permissions/ios/RNPermissions.m

# # Take the search string
# read -p "Enter the search string: " search

# # Take the replace string
# read -p "Enter the replace string: " replace

if [[ $search != "" && $replace != "" ]]; then
sed -i '' 's/react-native-masked-view/react-native-community/' $filename
fi