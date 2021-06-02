# 3. combine-api-and-app-into-monorepo

Date: 2021-06-02

## Status

Accepted

## Context

GitHub action end-to-end testing of the React app requires spinning up the backend server and making requests to it. This proves difficult without having access to the backend's source code within the same environment.

## Decision

We created one new repo in which both the backend and frontend code sits.

## Consequences

This provides a more simple testing environment for the frontend code. Publishing this new repo to production is the next challenge as backend and frontend were previously run on two separate Heroku app instances.
