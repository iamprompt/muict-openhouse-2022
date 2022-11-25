# MUICT Open House 2022 Activity LINE LIFF Application

This project is a web application created for activities in MUICT Open House 2022. This web application is mainly implemented using [LINE Front-end Framework (LIFF)](https://developers.line.biz/en/docs/liff/overview/).

[![UI Automated Testing](https://github.com/iamprompt/muict-openhouse-2022/actions/workflows/web_automated_test.yml/badge.svg?branch=main)](https://github.com/iamprompt/muict-openhouse-2022/actions/workflows/web_automated_test.yml)
[![API Coverage Testing](https://github.com/iamprompt/muict-openhouse-2022/actions/workflows/api_coverage_test.yml/badge.svg?branch=main)](https://github.com/iamprompt/muict-openhouse-2022/actions/workflows/api_coverage_test.yml)

![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

[![Web Docker Image Build](https://github.com/iamprompt/muict-openhouse-2022/actions/workflows/build_web_images.yml/badge.svg?branch=main)](https://github.com/iamprompt/muict-openhouse-2022/actions/workflows/build_web_images.yml)
[![API Docker Image Build](https://github.com/iamprompt/muict-openhouse-2022/actions/workflows/build_api_images.yml/badge.svg?branch=main)](https://github.com/iamprompt/muict-openhouse-2022/actions/workflows/build_api_images.yml)

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## Project Structures

- [`api`](./apps/api/): An [Express.js](https://expressjs.com/) application that serves as the backend API for the web application.
- [`web`](./apps/web/): A [Next.js](https://nextjs.org/) application that serves as the frontend for the web application.

## Testing

This project also includes automated testing for the web application and the API. The web application is tested using [Cypress](https://www.cypress.io/) and the API is tested using [Jest](https://jestjs.io/).

- [`web`](./apps/web/cypress/e2e/): Automated testing for the web application, located in the `apps/web/cypress/e2e` directory.
- [`api`](./apps/api/src/__tests__/): Automated testing for the API, located in the `apps/api/src/__tests__` directory.