#!/usr/bin/env bash

# Cleans all unnecessary files after the clone repository to start creating a new website based on this project
# You can run this script only one time, because it is self-destroying after project cleanup

# Remove TravisCI configuration file, CNAME and .git directory
rm -rf .travis.yml CNAME .git/

# Self destroy
rm -- "$0"